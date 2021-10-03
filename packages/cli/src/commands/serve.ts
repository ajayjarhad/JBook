import path from "path";
import { Command } from "commander";
import { serve } from "@js-workbook/api";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Opens a file for editing")
  .option("-p, --port <number>", "Port to run the server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `File ${filename} is opened. Navigate to  http://localhost:${options.port} to edit the file `
      );
    } catch (err: string | any) {
      if (err.code === "EADDRINUSE")
        console.error(
          `The port ${options.port} is in use, please select a different port `
        );
      else console.log("Error occured ", err.message);

      process.exit(1);
    }
  });
