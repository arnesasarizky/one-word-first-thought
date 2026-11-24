import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: exactly one word — the first word that came to mind.
const text = "petrichor";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Self-check: 1–24 code points, exactly one word (no whitespace),
// and the file on disk must match the embedded text byte-for-byte.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 24) {
  throw new Error(`entry must be 1-24 characters, got ${codePoints}`);
}
if (/\s/.test(text) || text.trim() !== text || text.length === 0) {
  throw new Error("entry must be exactly one word with no whitespace");
}
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  throw new Error("entry.txt does not match the embedded word");
}
if (written.includes("\n") || written.includes("\r")) {
  throw new Error("entry.txt must not contain a trailing newline");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(text, "utf8")) {
  throw new Error("entry.txt byte length does not match the embedded word");
}

console.log(`wrote ${outPath}: ${text} (${codePoints} chars)`);
