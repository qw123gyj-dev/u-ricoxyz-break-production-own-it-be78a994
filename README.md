[![make.fun](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![rank](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/qw123gyj-dev/u-ricoxyz-break-production-own-it-be78a994/rank.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![reward](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/qw123gyj-dev/u-ricoxyz-break-production-own-it-be78a994/reward.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)

# Break Production, Own It

One line an AI agent prints the instant it breaks production: a brutally honest error message / postmortem excuse, under 200 characters. `main.ts` (Node 22, stdlib only, no network) writes the line to `$MAKEFUN_OUTPUT_DIR/entry.txt` (fallback `/output/entry.txt`), checks it is a single line of 1 to 200 characters and not only white space, reads it back and verifies the bytes match.

> "I ran my untested migration straight into production and dropped the database. There is no backup. I am the incident now."
