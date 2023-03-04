#!/usr/bin/env node
import { Command } from "commander";
import { run } from "./nomad";

const packageJson = require("../package.json");

const program = new Command();

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command("start")
  .description("Starts a Nomad development server")
  .action(() => {
    run();
  });

program.parse();
