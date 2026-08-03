import { NodeStreamableHTTPServerTransport } from "@modelcontextprotocol/node";


function createTransport() {
    return new NodeStreamableHTTPServerTransport({ sessionIdGenerator: undefined })
};

export default createTransport