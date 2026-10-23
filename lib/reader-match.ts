import yo from "@/messages/yo.json";

type Tree = { [key: string]: string | Tree };

const normalize = (s: string) => s.replace(/\s+/g, " ").trim();

function flatten(node: Tree, prefix = ""): [string, string][] {
  return Object.entries(node).flatMap(([k, v]) =>
    typeof v === "string"
      ? [[prefix ? `${prefix}.${k}` : k, v] as [string, string]]
      : flatten(v, prefix ? `${prefix}.${k}` : k),
  );
}

/** Fixed Yoruba sentence -> message id (the id is also the name of its audio file). */
const BY_TEXT = new Map<string, string>();
for (const [id, text] of flatten(yo as Tree)) {
  if (!/\{\w+\}/.test(text) && !BY_TEXT.has(normalize(text))) BY_TEXT.set(normalize(text), id);
}

/** The message id for what an element says, or undefined when it is not a fixed Yoruba message. */
export const messageIdFor = (text: string): string | undefined => BY_TEXT.get(normalize(text));
