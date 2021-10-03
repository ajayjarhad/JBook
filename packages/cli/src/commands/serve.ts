import path from "path";
import { Command } from "commander";
import { on } from "events";
import { serve } from "local-api";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Opens a file for editing")
  .option("-p, --port <number>", "Port to run the server on", "4005")
  .action((filename = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));

    serve(parseInt(options.port), path.basename(filename), dir);
  });
