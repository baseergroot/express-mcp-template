import express from "express";
import { createMcpExpressApp, hostHeaderValidation } from "@modelcontextprotocol/express";
import { mcpServer } from "./mcp/server.js";
import createTransport from "./mcp/transport.js";
import cors from "cors";

const app = createMcpExpressApp();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => res.send("hello"))

app.post("/mcp", async (req, res) => {
  console.log("=================================");
  console.log("🚀 Incoming MCP Request");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const transport = createTransport();

  console.log("✅ Transport created");

  res.on("close", () => {
    console.log("🔌 Connection closed");
    transport.close();
  });

  try {
    console.log("🔗 Connecting MCP server...");
    await mcpServer.connect(transport);
    console.log("✅ MCP server connected");

    console.log("📨 Handling request...");
    await transport.handleRequest(req, res, req.body);
    console.log("✅ Request handled");
  } catch (err) {
    console.error("❌ MCP ERROR");
    console.error(err);

    if (!res.headersSent) {
      res.status(500).json({
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  console.log("=================================");
});

app.use(hostHeaderValidation(['localhost', '127.0.0.1', '[::1]']));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});