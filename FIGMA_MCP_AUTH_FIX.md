# Fixing Figma MCP Authentication on Fedora Linux

## Problem
When clicking "Authenticate" in the browser, you get a "No Apps Available" dialog.

## Solution 1: URL Scheme Handler (Already Configured)
The Cursor desktop file has been updated to handle `cursor://` URLs. 

**Steps:**
1. Restart Brave browser completely
2. Try the authentication link again
3. If it still doesn't work, see Solution 2 below

## Solution 2: Manual Authentication

If the URL scheme handler still doesn't work, you can authenticate manually:

1. **Copy the authentication URL from the browser**
   - When you click "Authenticate", look at the browser's address bar
   - Copy the full URL (it might look like: `https://mcp.figma.com/auth?token=...` or similar)

2. **Get the authentication token**
   - The URL will contain a token or code
   - Copy this token/code

3. **Configure MCP manually**
   - Open `~/.cursor/mcp.json`
   - Update the Figma MCP configuration to include the token:
   ```json
   {
     "mcpServers": {
       "Figma": {
         "url": "https://mcp.figma.com/mcp",
         "headers": {
           "Authorization": "Bearer YOUR_TOKEN_HERE"
         }
       }
     }
   }
   ```

## Solution 3: Alternative - Use Desktop App MCP Server

Instead of the remote server, use the desktop app:

1. Open Figma Desktop App
2. Open your design file
3. Enable Dev Mode (Shift + D)
4. Click "Enable desktop MCP server"
5. Update `~/.cursor/mcp.json`:
   ```json
   {
     "mcpServers": {
       "Figma": {
         "url": "http://127.0.0.1:3845/mcp"
       }
     }
   }
   ```

## Verify Configuration

Check your MCP configuration:
```bash
cat ~/.cursor/mcp.json
```

## Test Connection

After configuration, restart Cursor and the MCP server should connect automatically.



