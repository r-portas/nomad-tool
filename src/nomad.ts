import { cwd } from "node:process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

/**
 * The nomad config file to load
 */
const configPath = ".nomad.hcl";

function generateConfig() {
  const data = join(cwd(), "data");
  if (!existsSync(data)) {
    console.log(`"data" directory doesn't exists, creating...`);
    mkdirSync(data);
  }

  const nomadConfig = `
bind_addr = "0.0.0.0"

client {
  host_volume "data" {
    path = "${data}"
  }
}

plugin "docker" {
  config {
    volumes {
      enabled = true
    }
  }
}
`;

  writeFileSync(configPath, nomadConfig);
}

export function run() {
  generateConfig();

  const nomad = spawn("nomad", ["agent", "-dev", `-config=${configPath}`]);
  nomad.stdout.on("data", (data) => console.log(data.toString()));
  nomad.stderr.on("data", (data) => console.log(data.toString()));
}
