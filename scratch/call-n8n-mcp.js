const fs = require('fs');

async function main() {
  const [,, toolName, argsPath] = process.argv;
  if (!toolName || !argsPath) {
    throw new Error('Usage: node scratch/call-n8n-mcp.js <toolName> <argsJsonPath>');
  }

  const configPath = 'C:/Users/Usuario/.codex/config.toml';
  const config = fs.readFileSync(configPath, 'utf8');
  const urlMatch = config.match(/url = "([^"]+)"/);
  const tokenMatch = config.match(/authorization = "([^"]+)"/);

  if (!urlMatch || !tokenMatch) {
    throw new Error('Could not read MCP server config');
  }

  const endpoint = urlMatch[1];
  const authorization = tokenMatch[1];
  const args = JSON.parse(fs.readFileSync(argsPath, 'utf8'));

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: args,
    },
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  console.log(text);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
