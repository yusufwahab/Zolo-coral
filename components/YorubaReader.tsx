"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { LOCALE_COOKIE } from "@/lib/locales";
import { messageIdFor } from "@/lib/reader-match";
import { getSessionHint } from "@/lib/session-hint";
import yo from "@/messages/yo.json";

/**
 * A screen reader that speaks from recorded Yoruba clips (public/audio/yo/<message id>.mp3).
 * After a customer signs in, the home screen asks, in Yoruba, whether to continue in Yoruba. One tap
 * says yes: the language switches to Yoruba and swipe reading starts. Swipe left or right moves to
 * the next or previous element, a box marks it and its clip plays. A tap repeats it; a double tap
 * presses it. Elements whose words are not a fixed message (names, amounts) have no clip, so they
 * are only boxed.
 */
const AUDIO = "/audio/yo";
const READER_KEY = "zolo_yo_reader";
const DECIDED_KEY = "zolo_yo_decided";
const SWIPE_PX = 50;
const DOUBLE_TAP_MS = 350;
const PICK = "h1,h2,h3,p,button,a[href],label,input,select,[data-reader]";

const read = (key: string) => {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string | null) => {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    // private mode: the reader just will not survive a reload
  }
};

function textOf(el: HTMLElement): string {
  const label = el.getAttribute("aria-label");
  if (label) return label;
  const sr = el.querySelector<HTMLElement>(".sr-only");
  if (sr?.textContent) return sr.textContent;
  if (el instanceof HTMLInputElement && el.labels?.[0]) return el.labels[0].textContent ?? "";
  return el.textContent ?? "";
}

/** The separate lines of text inside an element, in order. */
function leafTexts(el: HTMLElement): string[] {
  return Array.from(el.querySelectorAll<HTMLElement>("*"))
    .filter((n) => n.children.length === 0 && n.textContent?.trim())
    .map((n) => n.textContent!);
}

/** What can be swiped to, in reading order: visible, not hidden, not inside another reader item. */
function collect(): HTMLElement[] {
  const all = Array.from(
    document.querySelectorAll<HTMLElement>(`.app-frame ${PICK.replaceAll(",", ", .app-frame ")}`),
  );
  return all.filter((el) => {
    if (el.closest("[data-reader-ignore], [aria-hidden='true']")) return false;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    if (!textOf(el).trim()) return false;
    const container = !/^(BUTTON|A|LABEL|INPUT|SELECT)$/.test(el.tagName);
    return !(container && el.querySelector(PICK));
  });
}

export function YorubaReader() {
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [gate, setGate] = useState(false);
  const [box, setBox] = useState<DOMRect | null>(null);
  const [typing, setTyping] = useState(false);
  const index = useRef(-1);
  const current = useRef<HTMLElement | null>(null);
  const clips = useRef<Set<string>>(new Set());
  const audio = useRef<HTMLAudioElement | null>(null);
  const lastTap = useRef(0);
  const start = useRef<{ x: number; y: number } | null>(null);

  /** Plays the clips one after another; a new swipe cuts the old ones short. */
  const play = useCallback((...srcs: string[]) => {
    audio.current?.pause();
    const run = (queue: string[]) => {
      const [src, ...rest] = queue;
      if (!src) return;
      const a = new Audio(src);
      audio.current = a;
      a.onended = () => {
        if (audio.current === a) run(rest);
      };
      void a.play().catch(() => undefined); // blocked until a tap: the next gesture plays it
    };
    run(srcs);
  }, []);

  const focusAt = useCallback(
    (i: number) => {
      const items = collect();
      if (items.length === 0) return;
      index.current = Math.min(Math.max(i, 0), items.length - 1);
      const el = items[index.current]!;
      current.current?.removeAttribute("data-reader-current");
      current.current = el;
      el.setAttribute("data-reader-current", "");
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      setBox(el.getBoundingClientRect());
      // The whole text first; a card made of several lines ("Pay an agent" + its hint) is read line by line.
      const whole = messageIdFor(textOf(el));
      const ids = whole ? [whole] : leafTexts(el).map(messageIdFor);
      const known = ids.filter((id): id is string => Boolean(id) && clips.current.has(id!));
      if (known.length > 0) play(...known.map((id) => `${AUDIO}/${id}.mp3`));
      else audio.current?.pause();
    },
    [play],
  );

  // Which clips exist, and whether this session already chose.
  useEffect(() => {
    fetch(`${AUDIO}/manifest.json`)
      .then((r) => (r.ok ? r.json() : {}))
      .then((m: Record<string, unknown>) => (clips.current = new Set(Object.keys(m))))
      .catch(() => undefined);
    const id = setTimeout(() => setActive(read(READER_KEY) === "1"), 0);
    return () => clearTimeout(id);
  }, []);

  // The question, once per session, on the customer's home screen.
  useEffect(() => {
    const customer = getSessionHint()?.role === "customer";
    const open = pathname === "/home" && customer && !read(DECIDED_KEY) && read(READER_KEY) !== "1";
    const id = setTimeout(() => {
      setGate(open);
      if (open) play(`${AUDIO}/voice.gatePrompt.mp3`);
    }, 300);
    return () => clearTimeout(id);
  }, [pathname, play]);

  // A new screen: start at its first element.
  useEffect(() => {
    if (!active) return;
    index.current = -1;
    const id = setTimeout(() => focusAt(0), 900);
    return () => clearTimeout(id);
  }, [active, pathname, focusAt]);

  // Keep the box on its element while the layout moves.
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      if (current.current?.isConnected) setBox(current.current.getBoundingClientRect());
    }, 250);
    return () => clearInterval(id);
  }, [active]);

  const exit = useCallback(() => {
    write(READER_KEY, null);
    audio.current?.pause();
    setActive(false);
    setBox(null);
  }, []);

  const press = useCallback(() => {
    const el = current.current;
    if (!el) return;
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
      // Typing mode: the swipe layer steps aside so the keyboard and the field get the touches.
      el.focus();
      if (el instanceof HTMLSelectElement) el.showPicker?.();
      setTyping(true);
    } else el.click();
  }, []);

  // Typing ends when the field loses focus (Enter, Escape, or a tap elsewhere).
  useEffect(() => {
    const el = current.current;
    if (!typing || !el) return;
    const done = () => setTyping(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") el.blur();
    };
    el.addEventListener("blur", done);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("blur", done);
      el.removeEventListener("keydown", onKey);
    };
  }, [typing]);

  useEffect(() => {
    if (!active || typing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") focusAt(index.current + 1);
      else if (e.key === "ArrowLeft") focusAt(index.current - 1);
      else if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, typing, focusAt, exit]);

  function accept() {
    write(DECIDED_KEY, "1");
    write(READER_KEY, "1");
    document.cookie = `${LOCALE_COOKIE}=yo; path=/; max-age=31536000; samesite=lax`;
    audio.current?.pause();
    setGate(false);
    setActive(true);
    router.refresh();
  }

  function decline() {
    write(DECIDED_KEY, "1");
    audio.current?.pause();
    setGate(false);
  }

  if (gate) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={yo.voice.gateTitle}
        className="fixed inset-0 z-50 bg-zolo-bg"
      >
        <button
          type="button"
          onClick={accept}
          className="grid h-full w-full cursor-pointer content-center gap-6 p-8 text-center"
        >
          <span lang="yo" className="type-display">
            {yo.voice.gateTitle}
          </span>
          <span lang="yo" className="type-title">
            {yo.voice.gateTap}
          </span>
          <span className="type-secondary">
            {t("voice.gateTitle")} {t("voice.gateTap")}
          </span>
        </button>
        <button
          type="button"
          lang="yo"
          onClick={decline}
          className="type-body absolute bottom-8 left-1/2 min-h-(--target-min) -translate-x-1/2 rounded-zolo-control border border-zolo-separator px-6"
        >
          {yo.voice.gateNo}
        </button>
      </div>
    );
  }

  if (!active) return null;

  return (
    <>
      <div
        data-reader-ignore
        className={`fixed inset-0 z-40 touch-none ${typing ? "pointer-events-none" : ""}`}
        onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={(e) => {
          const s = start.current;
          start.current = null;
          if (!s) return;
          const dx = e.clientX - s.x;
          const dy = e.clientY - s.y;
          if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
            focusAt(index.current + (dx < 0 ? 1 : -1));
            return;
          }
          const now = Date.now();
          if (now - lastTap.current < DOUBLE_TAP_MS) {
            lastTap.current = 0;
            press();
          } else {
            lastTap.current = now;
            focusAt(Math.max(index.current, 0)); // a single tap says it again
          }
        }}
      />
      {box ? (
        <div
          data-reader-ignore
          aria-hidden="true"
          className="pointer-events-none fixed z-50 rounded-zolo-control border-4 border-zolo-brand"
          style={{
            left: box.left - 4,
            top: box.top - 4,
            width: box.width + 8,
            height: box.height + 8,
          }}
        />
      ) : null}
      <button
        type="button"
        data-reader-ignore
        lang="yo"
        onClick={exit}
        className="type-secondary fixed top-3 right-3 z-50 min-h-(--target-min) rounded-zolo-control border border-zolo-separator bg-zolo-elevated px-3"
      >
        {yo.voice.exit}
      </button>
    </>
  );
}
