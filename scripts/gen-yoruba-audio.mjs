// Renders every fixed Yoruba string in messages/yo.json to public/audio/yo/<message id>.mp3 with YarnGPT.
//
//   YARNGPT_API_KEY=... node scripts/gen-yoruba-audio.mjs [--dry-run] [--force] [--only prefix,prefix]
//                                                         [--limit N] [--voice idera]
//
// The key is read from the environment or .env.local and is only ever sent to api.yarngpt.ai.
// A manifest (public/audio/yo/manifest.json) records the text and voice behind each file, so a
// re-run only renders strings that are new or changed. Strings with {placeholders} (names, amounts,
// digits) cannot be one clip; they are listed as skipped and need composed clips instead.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "audio", "yo");
const manifestPath = join(outDir, "manifest.json");

const BASE_URL = "https://api.yarngpt.ai";
const DEFAULT_VOICE = "idera"; // YarnGPT's own default; nobody has judged a better Yoruba voice yet
const POLL_INTERVAL_MS = 300;
const JOB_TIMEOUT_MS = 60_000;
const CONCURRENCY = 2;
const MIN_CHARS = 20; // YarnGPT refuses shorter text (INPUT_TOO_SHORT), counting letters and digits only

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};

const dryRun = flag("dry-run");
const force = flag("force");
const tryShort = flag("try-short"); // attempt strings under the minimum; the API has the final say
const only = option("only")?.split(",");
const limit = Number(option("limit") ?? Infinity);
const voice = option("voice") ?? DEFAULT_VOICE;

const envFile = join(root, ".env.local");
if (!process.env.YARNGPT_API_KEY && existsSync(envFile)) process.loadEnvFile(envFile);

const flatten = (node, prefix = "") =>
  Object.entries(node).flatMap(([key, value]) => {
    const id = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? [[id, value]] : flatten(value, id);
  });

const messages = flatten(JSON.parse(readFileSync(join(root, "messages", "yo.json"), "utf8")));
const hashOf = (text) => createHash("sha256").update(`${voice}|${text}`).digest("hex").slice(0, 16);
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};

const chargeable = (text) => text.replace(/[\s.,:!?]/g, "").length;
const skipped = messages.filter(([, text]) => /\{\w+\}/.test(text)).map(([id]) => id);
const tooShort = messages
  .filter(([id, text]) => !skipped.includes(id) && chargeable(text) < MIN_CHARS)
  .map(([id]) => id);
let todo = messages.filter(([id, text]) => {
  if (skipped.includes(id) || (tooShort.includes(id) && !tryShort)) return false;
  if (only && !only.some((p) => id === p || id.startsWith(`${p}.`))) return false;
  const entry = manifest[id];
  return force || !entry || entry.hash !== hashOf(text) || !existsSync(join(outDir, `${id}.mp3`));
});
todo = todo.slice(0, limit);

console.log(
  `${messages.length} strings: ${skipped.length} with placeholders and ${tooShort.length} under ${MIN_CHARS} characters (both skipped), ${todo.length} to render, voice "${voice}".`,
);
if (dryRun) {
  for (const [id, text] of todo) console.log(`  ${id}: ${text}`);
  process.exit(0);
}
if (todo.length === 0) process.exit(0);

const key = process.env.YARNGPT_API_KEY;
if (!key) {
  console.error("Set YARNGPT_API_KEY (environment or .env.local) to render audio.");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const auth = { Authorization: `Bearer ${key}` };

async function render(text) {
  // Same text and voice always maps to the same job, so a retry never double-bills.
  const idem = createHash("sha256").update(`yo|${voice}|${text}`).digest("hex").slice(0, 48);
  let post;
  for (let attempt = 0; attempt < 6; attempt++) {
    post = await fetch(`${BASE_URL}/api/v1/tts`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json", "Idempotency-Key": idem },
      body: JSON.stringify({ text, voice, output_format: "mp3", target_language: "yo" }),
    });
    if (post.status !== 429) break;
    await sleep((Number(post.headers.get("retry-after")) || 5) * 1000); // rate limited: wait, then retry
  }
  if (post.status === 422 && (await post.text()).includes("INPUT_TOO_SHORT")) {
    throw new Error("too short for YarnGPT", { cause: "short" });
  }
  if (post.status !== 202) throw new Error(`tts request failed (HTTP ${post.status})`);
  const { job_id: jobId } = await post.json();

  const deadline = Date.now() + JOB_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const status = await fetch(`${BASE_URL}/api/v1/status/${jobId}`, { headers: auth });
    if (status.status !== 200) throw new Error(`status check failed (HTTP ${status.status})`);
    const body = await status.json();
    if (body.status === "failed") throw new Error("tts job failed");
    if (body.audio_url) {
      // Signed link on another host: never send our API key to it.
      const audio = await fetch(body.audio_url);
      if (!audio.ok) throw new Error(`download failed (HTTP ${audio.status})`);
      return Buffer.from(await audio.arrayBuffer());
    }
    await sleep(POLL_INTERVAL_MS);
  }
  throw new Error("tts job timed out");
}

mkdirSync(outDir, { recursive: true });
let done = 0;
const failed = [];
const stillShort = [];

async function worker(queue) {
  for (let item = queue.shift(); item; item = queue.shift()) {
    const [id, text] = item;
    try {
      writeFileSync(join(outDir, `${id}.mp3`), await render(text));
      manifest[id] = { text, voice, hash: hashOf(text) };
      writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
      console.log(`[${++done}/${todo.length}] ${id}`);
    } catch (error) {
      if (error.cause === "short") {
        stillShort.push(id);
        continue;
      }
      failed.push(id);
      console.error(`FAILED ${id}: ${error.message}`);
    }
  }
}

const queue = [...todo];
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker(queue)));

console.log(`Rendered ${done}, failed ${failed.length}, still too short ${stillShort.length}.`);
if (stillShort.length) console.log(`Too short: ${stillShort.join(", ")}`);
if (failed.length) {
  console.error(`Re-run to retry: ${failed.join(", ")}`);
  process.exit(1);
}
