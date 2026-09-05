# Figma Desktop App MCP Server Setup (No Browser Auth Required)

Since the browser authentication isn't working due to URL scheme handler issues, use the Desktop App MCP Server instead.

## Steps:

1. **Install Figma Desktop App** (if not already installed)
   - Download from: https://www.figma.com/downloads/
   - Install and launch it

2. **Open your design file in Figma Desktop**
   - Launch the Figma desktop app
   - Open your design file

3. **Enable Dev Mode**
   - Press `Shift + D` or click "Dev Mode" in the toolbar

4. **Enable Desktop MCP Server**
   - In the right panel (with nothing selected), find the "MCP server" section
   - Click **"Enable desktop MCP server"**
   - You should see a message with the server URL: `http://127.0.0.1:3845/mcp`

5. **Update Cursor MCP Configuration**
   - Open `~/.cursor/mcp.json`
   - Update the Figma server configuration:
   ```json
   {
     "mcpServers": {
       "convex": {
         "command": "/home/amrayman/projects/kamal-bake/node_modules/.bin/convex",
         "args": ["mcp", "start"],
         "cwd": "/home/amrayman/projects/kamal-bake"
       },
       "Figma": {
         "url": "http://127.0.0.1:3845/mcp"
       }
     }
   }
   ```

6. **Restart Cursor**
   - Close Cursor completely
   - Reopen Cursor
   - The MCP server should connect automatically

## Advantages:
- ✅ No browser authentication required
- ✅ No URL scheme handler issues
- ✅ Works directly with the desktop app
- ✅ More reliable connection

## Note:
- The Figma Desktop App must be running for the MCP server to work
- Keep the design file open in Dev Mode
- The server runs on `http://127.0.0.1:3845/mcp` (localhost only)


