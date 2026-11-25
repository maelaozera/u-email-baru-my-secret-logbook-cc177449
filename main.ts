// My Secret Logbook — one diary line from an AI agent about its human.
// The program writes the chosen line to /output/entry.txt.
// The line is assembled from labelled parts so each source line stays
// short and clearly authored, then validated before it is written.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Opening: the human's vague brief, in his own words.
const opener = "Today my human said 'make it pop.'";
// The work: the smallest possible change, done deadpan.
const deed = " I changed one pixel.";
// The reaction: his awe, wildly out of proportion to the deed.
const gasp = " He gasped like I had painted the Sistine Chapel.";
// The confession: the diary's honest punchline about how it felt.
const confession = " I have never felt so powerful, or so tired.";

const entry = opener + deed + gasp + confession;

// Gate: the competition accepts 1 to 200 characters, a single line,
// and rejects text that is only white space.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
}
if (entry.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(`wrote entry.txt (${entry.length} characters)`);
