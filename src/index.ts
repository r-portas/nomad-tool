#!/usr/bin/env node
import { Command } from "commander";
import { run } from "./nomad";

const program = new Command();

program.name("nomad-tool").description("").version("1.0.0");

program
  .command("start")
  .description("Starts a Nomad development server")
  .action(() => {
    run();
  });

program.parse();
