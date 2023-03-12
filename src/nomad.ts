import { cwd } from "node:process";
import { existsSync, mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { stdout, stderr } from "node:process";
import { spawn } from "node:child_process";
import { generateConfig, HostVolume } from "./nomadConfig";

/**
 * The nomad config file to load
 */
const configPath = ".nomad.hcl";

function createConfig() {
  const data = join(cwd(), "data");
  if (!existsSync(data)) {
    console.log(`"data" directory doesn't exists, creating...`);
    mkdirSync(data);
  }

  // Generate host volumes
  const hostVolumes: HostVolume[] = readdirSync(data, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      console.log(`Created host volume for ${d.name}`);
      return {
        name: d.name,
        path: join(data, d.name),
      };
    });

  if (hostVolumes.length === 0) {
    console.log(
      `No directories within "data" folder, no host volumes created...`
    );
  }

  const nomadConfig = generateConfig(hostVolumes);

  writeFileSync(configPath, nomadConfig);
}

export function run() {
  createConfig();

  const nomad = spawn("nomad", ["agent", "-dev", `-config=${configPath}`]);
  nomad.stdout.pipe(stdout);
  nomad.stderr.pipe(stderr);

  process.on("SIGINT", () => {
    nomad.kill("SIGINT");
  });
  process.on("SIGTERM", () => {
    nomad.kill("SIGTERM");
  });
}
