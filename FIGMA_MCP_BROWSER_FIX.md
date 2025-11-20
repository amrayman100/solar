# Fixing Figma MCP Browser Authentication on Linux

## Current Issue
Brave browser is creating files instead of opening `cursor://` URLs for OAuth callbacks.

## Solution Steps

### 1. Restart Everything
```bash
# Close Cursor completely
# Close Brave completely
# Then reopen both
```

### 2. Configure Brave Browser

In Brave, you may need to allow custom protocol handlers:

1. Open Brave Settings
2. Go to `brave://settings/handlers` (or search for "Protocol handlers")
3. Make sure "Ask before accessing" is enabled
4. When you click the authentication link, Brave should ask what to do with `cursor://` URLs
5. Select "Use Cursor" or "Open with Cursor"

### 3. Alternative: Manual OAuth Completion

If the URL scheme still doesn't work, you can try:

1. When you see the callback URL in the address bar (after clicking Authenticate)
2. Copy the full URL from the address bar
3. It should look like: `https://www.figma.com/oauth/mcp?code=...&state=...`
4. The `code` parameter contains the authorization code
5. We can try to manually configure the MCP server with this code

### 4. Test the URL Handler

After restarting, test if the handler works:
```bash
xdg-open "cursor://test"
```

If this opens in Cursor (even if it shows an error), the handler is working.

### 5. Try Authentication Again

1. Go to Figma in Brave
2. Open your design file
3. Enable Dev Mode (Shift + D)
4. Click "Set up an MCP client"
5. Click the authentication link
6. This time, Brave should ask what to do with the `cursor://` URL
7. Select Cursor

## If Still Not Working

We can try to manually extract the authorization code from the callback URL and configure the MCP server directly, though this is more complex and may require additional API calls to exchange the code for a token.


