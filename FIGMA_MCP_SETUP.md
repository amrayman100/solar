# Figma MCP Server Setup Guide

This guide will help you set up the Figma MCP server to access Figma designs directly in Cursor.

## Option 1: Remote MCP Server (Recommended)

### Steps:

1. **Open your Figma design file in the browser**

   - Navigate to your Figma design file in your web browser

2. **Activate Dev Mode**

   - With nothing selected on the canvas, switch to **Dev Mode** (or press `Shift + D`)

3. **Set up MCP client**

   - In the right inspect panel, click **"Set up an MCP client"**
   - Click the Figma MCP server deep link provided
   - Follow the prompts to install and connect the server

4. **Verify connection**
   - The MCP server should now be connected
   - You can verify by checking Cursor's MCP settings

## Option 2: Desktop MCP Server

### Steps:

1. **Install/Update Figma Desktop App**

   - Ensure you have the latest version of the Figma desktop application

2. **Open your design file**

   - Launch the Figma desktop app and open your design file

3. **Activate Dev Mode**

   - In the toolbar at the bottom, toggle to **Dev Mode** (or press `Shift + D`)

4. **Enable the MCP Server**

   - In the **MCP server** section of the inspect panel, click **"Enable desktop MCP server"**
   - Note the server URL (usually `http://127.0.0.1:3845/mcp`)

5. **Configure in Cursor**
   - Open Cursor Settings (`Cmd/Ctrl + ,`)
   - Navigate to the **MCP** tab
   - Click **"Add Custom MCP"**
   - Enter the following configuration:
     ```json
     {
       "mcpServers": {
         "figma-desktop": {
           "url": "http://127.0.0.1:3845/mcp"
         }
       }
     }
     ```
   - Save the configuration

## After Setup

Once the MCP server is configured, you can:

- Access Figma design files directly from Cursor
- View design specifications, colors, fonts, and spacing
- Get design context when implementing UI changes

## Troubleshooting

- **Connection issues**: Make sure the Figma desktop app is running (for desktop server)
- **Permission errors**: Check your Figma plan - Starter plan users have limited tool calls (up to 6 per month)
- **Server not found**: Verify the server URL is correct and the server is running
- **xdg-open "no apps available" error on Linux/Fedora**:
  - If you get this error during authentication, configure xdg-open to use your browser:
  - For Brave (Flatpak): Add `export BROWSER="flatpak run com.brave.Browser"` to your `~/.bashrc` or `~/.zshrc`
  - For Firefox: Add `export BROWSER="firefox"` to your shell config
  - For Chrome/Chromium: Add `export BROWSER="google-chrome"` or `export BROWSER="chromium"` to your shell config
  - Restart Cursor after making these changes
  - Alternatively, manually copy the authentication URL from the terminal and open it in your browser

## Resources

- [Figma MCP Documentation](https://developers.figma.com/docs/figma-mcp-server/)
- [Desktop Server Setup](https://developers.figma.com/docs/figma-mcp-server/local-server-installation/)
- [Remote Server Setup](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
