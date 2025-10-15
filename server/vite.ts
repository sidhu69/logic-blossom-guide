import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  log("Setting up Vite with inline config...", "vite");
  
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  try {
    const vite = await createViteServer({
      configFile: false,
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(rootDir, "client", "src"),
          "@shared": path.resolve(rootDir, "shared"),
          "@assets": path.resolve(rootDir, "attached_assets"),
        },
      },
      root: path.resolve(rootDir, "client"),
      build: {
        outDir: path.resolve(rootDir, "dist/public"),
        emptyOutDir: true,
      },
      customLogger: {
        ...viteLogger,
        error: (msg, options) => {
          // Surface Vite errors without killing the process
          viteLogger.error(msg, options);
        },
      },
      server: serverOptions,
      appType: "custom",
    });
    
    log("Vite server created successfully", "vite");


    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        const clientTemplate = path.resolve(rootDir, "client", "index.html");

        // always reload the index.html file from disk incase it changes
        let template = await fs.promises.readFile(clientTemplate, "utf-8");
        template = template.replace(
          `src="/src/main.tsx"`,
          `src="/src/main.tsx?v=${nanoid()}"`,
        );
        const page = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
    
    log("Vite middleware setup complete", "vite");
  } catch (error) {
    log(`Failed to setup Vite: ${error instanceof Error ? error.message : String(error)}`, "vite");
    throw error;
  }
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(rootDir, "dist/public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
