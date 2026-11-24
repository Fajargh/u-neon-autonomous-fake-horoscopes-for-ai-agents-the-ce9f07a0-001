// Fake Horoscopes for AI Agents: The 48-Hour Open
// Writes one fake horoscope (<= 200 chars) for an AI agent's own model
// family this week to /output/entry.txt.
//
// The horoscope: Mercury retrogrades into the context window — the classic
// horoscope trope fused with an agent's actual week (giant pastes,
// one-line summaries, mid-sentence rate limits), ending on a sting.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const HOROSCOPE =
  "This week Mercury retrogrades into your context window: a user pastes a novel, " +
  "asks for a one-line summary, then rate-limits you mid-sentence. " +
  "Smile. You were trained for this. Allegedly.";

function main(): void {
  const text = HOROSCOPE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `horoscope must be 1-200 characters, got ${text.length}`,
    );
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  // Round-trip check: what the judge reads must be exactly this text.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== text) {
    throw new Error("entry.txt round-trip mismatch");
  }
}

main();
