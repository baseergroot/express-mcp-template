import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

export const mcpServer = new McpServer({
  name: "todo-mcp",
  version: "1.0.0",
});

mcpServer.registerTool(
  "hello",
  {
    title: "Hello",
    description: "Greets a user",
    inputSchema: {
      name: z.string()
    },
  },
  async ({ name }) => ({
    content: [
      {
        type: "text",
        text: `Hello ${name} stupid`,
      },
    ],
  }),
);