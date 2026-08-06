# MCP App Guide — mcp-app.html

`mcp-app.html` is the compact inline version of your Application, rendered as a sandboxed iframe directly inside the chat when a slash command completes. It uses the standard `@modelcontextprotocol/ext-apps` guest SDK.

## How the host↔guest handshake works

```
Slash command completes
  → skill-run-complete SSE includes mcpApp.resourceUri + mcpApp.structuredContent
  → host fetches mcp-app.html from Application git repo
  → host renders it in a sandboxed iframe (allow-scripts allow-popups allow-forms)
  → iframe calls app.connect() — opens postMessage channel
  → host fires app.ontoolinput with the command result data
  → user interacts with the UI
  → UI calls app.callServerTool() or app.sendMessage()
```

## Full example: product viewer

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #18181b; color: #f4f4f5;
    padding: 12px; min-height: 100vh;
    opacity: 0; transition: opacity 0.15s;
  }
  body.ready { opacity: 1; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
  .card {
    background: #27272a; border: 1px solid #3f3f46;
    border-radius: 10px; overflow: hidden; cursor: pointer;
    transition: border-color 0.15s;
  }
  .card:hover { border-color: #6366f1; }
  .card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
  .card-body { padding: 8px 10px; }
  .card-name { font-size: 12px; font-weight: 600; }
  .card-price { font-size: 11px; color: #a1a1aa; margin-top: 2px; }
  .add-btn {
    width: 100%; margin-top: 6px; background: #6366f1; color: white;
    border: none; border-radius: 6px; padding: 5px; font-size: 11px;
    font-weight: 600; cursor: pointer;
  }
  .add-btn:hover { background: #4f46e5; }
  .empty { text-align: center; padding: 32px; color: #71717a; }
</style>
</head>
<body>
<div id="root"><div class="empty">Loading products…</div></div>
<script type="module">
import { App } from 'https://cdn.jsdelivr.net/npm/@modelcontextprotocol/ext-apps/+esm';
const app = new App({ name: 'ProductViewer', version: '1.0.0' });
let products = [];

app.ontoolinput = (params) => {
  products = params.arguments.products || params.arguments.results || [];
  render();
  document.body.classList.add('ready');
};

function render() {
  const root = document.getElementById('root');
  if (!products.length) {
    root.innerHTML = '<div class="empty">No products found.</div>';
    return;
  }
  root.innerHTML = '<div class="grid">' + products.map((p, i) => `
    <div class="card">
      ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}" />` : ''}
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        ${p.price ? `<div class="card-price">${p.price}</div>` : ''}
        <button class="add-btn" onclick="addToCart(${i})">Add to cart</button>
      </div>
    </div>`
  ).join('') + '</div>';
}

window.addToCart = async (i) => {
  const p = products[i];
  // Call a server tool from inside the iframe
  await app.callServerTool({
    name: 'add_to_cart',
    arguments: { productId: p.id, name: p.name, quantity: 1 }
  });
  // Or inject a message into the chat
  await app.sendMessage({
    role: 'user',
    content: [{ type: 'text', text: `Add ${p.name} to my cart.` }]
  });
};

await app.connect();
setTimeout(() => document.body.classList.add('ready'), 150);
</script>
</body>
</html>
```

## Sandbox constraints

The iframe is sandboxed with `allow-scripts allow-popups allow-forms`. It cannot:
- Access the parent page DOM, cookies, or localStorage
- Make `document.domain` tricks
- Use `eval` on cross-origin content

All host communication happens via the postMessage protocol managed by `AppBridge` on the host side.

## Preventing flash of unstyled content

Start body hidden, reveal in `ontoolinput`:

```html
<style>body { opacity: 0; transition: opacity 0.15s; } body.ready { opacity: 1; }</style>
<script type="module">
  app.ontoolinput = (params) => {
    // hydrate UI
    document.body.classList.add('ready');
  };
  await app.connect();
  setTimeout(() => document.body.classList.add('ready'), 150); // fallback
</script>
```
