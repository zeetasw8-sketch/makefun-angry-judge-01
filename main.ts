import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));

function validateRant(text: string): void {
  if (text.length < 1 || text.length > 400) {
    throw new Error("line must be 1-400 characters");
  }
  if (!text.trim()) {
    throw new Error("line must not be only whitespace");
  }
}

const text = readFileSync(join(dir, "line.txt"), "utf8");
validateRant(text);
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
