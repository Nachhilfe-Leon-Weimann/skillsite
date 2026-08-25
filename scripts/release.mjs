import { spawnSync } from "node:child_process";

const bump = process.argv[2];
const allowedBumps = new Set(["major", "minor", "patch"]);

if (!allowedBumps.has(bump) || process.argv.length !== 3) {
  console.error("Usage: pnpm release <major|minor|patch>");
  process.exit(1);
}

const result = spawnSync(
  "gh",
  ["workflow", "run", "release.yml", "--ref", "main", "--field", `bump=${bump}`],
  { stdio: "inherit" },
);

if (result.error) {
  console.error(`Could not start the release workflow: ${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
