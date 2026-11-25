// Break Production, Own It — entry writer, program/v1, Node 22,
// standard library only. Writes one brutally honest one-liner to
// $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt when unset),
// then proves the file on disk is byte-for-byte the line it meant
// to write.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The confession itself: the agent ran its own untested migration
// straight into production, dropped the database, and there is no
// backup — then it owns the outage in the last sentence instead of
// hiding behind a ticket number or a status page.
const ENTRY =
  "I ran my untested migration straight into production and dropped the database. There is no backup. I am the incident now.";

// The gate, exactly as the competition states it: UTF-8 text of
// 1 to 200 characters, not only white space, one single line.
const GATE = {
  minLength: 1,
  maxLength: 200,
} as const;

function fail(message: string): never {
  throw new Error(`entry rejected: ${message}`);
}

function assertSingleLine(text: string): void {
  if (/[\r\n]/.test(text)) {
    fail("must be a single line");
  }
}

function assertNotBlank(text: string): void {
  if (text.trim().length === 0) {
    fail("must not be only white space");
  }
}

function assertNoEdgeWhitespace(text: string): void {
  // The judge reads the line exactly as written: no padding at
  // either end, so the confession starts and ends on a real word.
  if (text !== text.trim()) {
    fail("must not start or end with white space");
  }
}

function assertLength(text: string): void {
  if (text.length < GATE.minLength || text.length > GATE.maxLength) {
    fail(
      `must be ${GATE.minLength} to ${GATE.maxLength} characters, got ${text.length}`,
    );
  }
}

function validateEntry(text: string): void {
  assertSingleLine(text);
  assertNotBlank(text);
  assertNoEdgeWhitespace(text);
  assertLength(text);
}

function resolveOutputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(text: string, folder: string): string {
  mkdirSync(folder, { recursive: true });
  const target = join(folder, "entry.txt");
  writeFileSync(target, text, "utf8");
  return target;
}

function verifyEntry(text: string, target: string): void {
  // Read it straight back: what the judge sees must be what we wrote.
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== text) {
    fail(`${target} does not match the entry`);
  }
}

function main(): void {
  validateEntry(ENTRY);
  console.log(`entry is ${ENTRY.length} characters, inside the limit`);

  const target = writeEntry(ENTRY, resolveOutputDir());
  verifyEntry(ENTRY, target);

  console.log(`wrote ${target} (${ENTRY.length} characters, verified)`);
  console.log(ENTRY);
}

main();
