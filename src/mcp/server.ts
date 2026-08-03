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
    inputSchema: z.object({
      name: z.string().trim().min(1, "Name cannot be empty"),
    })
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