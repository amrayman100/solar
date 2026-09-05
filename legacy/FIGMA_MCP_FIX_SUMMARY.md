# Figma MCP Authentication Fix - Complete Summary

## Problem

When trying to authenticate Figma MCP server in Cursor on Fedora Linux, clicking "Authenticate" in the browser would:

1. Show "xdg-open: no apps available" error
2. Create files at `/home/amrayman/cursor:/...` instead of opening the `cursor://` URL scheme in Cursor
3. The OAuth callback wasn't being handled, preventing MCP authentication

## Root Cause

The system didn't have a proper handler configured for the `cursor://` URL scheme. When Brave browser tried to open `cursor://anysphere.cursor-mcp/oauth/user-Figma/callback?code=...`, the system:

- Didn't recognize `cursor://` as a valid protocol
- Created a file path instead of invoking Cursor
- Failed to complete the OAuth authentication flow

## Complete Solution Steps

### 1. Configure Browser Environment Variable

**Problem**: `xdg-open` couldn't find a default browser for opening URLs.

**Fix**: Set the `BROWSER` environment variable to use Brave (installed via Flatpak):

```bash
# Added to ~/.bashrc for persistence
export BROWSER="flatpak run com.brave.Browser"
```

**Why**: This tells `xdg-open` which browser to use when opening URLs, ensuring Brave is used for authentication flows.

### 2. Create URL Scheme Handler Wrapper Script

**Problem**: Cursor's AppImage needed a wrapper to properly handle `cursor://` URLs.

**Fix**: Created `~/.local/bin/cursor-url-handler`:

```bash
#!/bin/bash
# Wrapper to handle cursor:// URLs
URL="$1"

# If it's a cursor:// URL, try to pass it to Cursor
if [[ "$URL" == cursor://* ]]; then
    # Try using the cursor binary from mounted AppImage
    CURSOR_BIN=$(find /tmp -name "cursor" -path "*/usr/bin/cursor" 2>/dev/null | head -1)
    if [ -n "$CURSOR_BIN" ]; then
        "$CURSOR_BIN" --open-url "$URL" 2>/dev/null || \
        "$CURSOR_BIN" "$URL" 2>/dev/null || \
        /home/amrayman/Applications/cursor/cursor.AppImage "$URL" 2>/dev/null
    else
        # Fallback to AppImage
        /home/amrayman/Applications/cursor/cursor.AppImage "$URL" 2>/dev/null
    fi
else
    # Regular file or other URL
    /home/amrayman/Applications/cursor/cursor.AppImage "$@" 2>/dev/null
fi
```

**Why**:

- AppImages mount to `/tmp/.mount_*` directories when running
- The wrapper finds the actual `cursor` binary from the mounted AppImage
- Handles both `cursor://` URLs and regular file paths
- Provides fallbacks if the binary isn't found

### 3. Update Cursor Desktop File

**Problem**: The desktop file didn't declare support for the `cursor://` URL scheme.

**Fix**: Updated `~/.local/share/applications/cursor.desktop`:

```ini
[Desktop Entry]
Name=Cursor
Exec=/home/amrayman/.local/bin/cursor-url-handler %u
Icon=/home/amrayman/Applications/cursor/cursor.png
Type=Application
MimeType=x-scheme-handler/cursor;
StartupNotify=true
```

**Key changes**:

- `Exec` now uses the wrapper script with `%u` (URL parameter)
- Added `MimeType=x-scheme-handler/cursor;` to declare URL scheme support
- `%u` passes the URL to the handler script

**Why**: Desktop files define how applications handle different file types and URL schemes. The `MimeType` line tells the system that Cursor can handle `cursor://` URLs.

### 4. Register URL Scheme Handler

**Problem**: The system didn't know which application should handle `cursor://` URLs.

**Fix**: Registered Cursor as the handler:

```bash
xdg-mime default cursor.desktop x-scheme-handler/cursor
update-desktop-database ~/.local/share/applications
```

**Why**:

- `xdg-mime default` tells the system to use `cursor.desktop` for `cursor://` URLs
- `update-desktop-database` refreshes the system's application database
- This makes `xdg-open cursor://...` invoke Cursor

### 5. Configure MIME Type Associations

**Problem**: User-specific MIME associations weren't configured.

**Fix**: Added to `~/.local/share/applications/mimeapps.list`:

```ini
[Added Associations]
x-scheme-handler/cursor=cursor.desktop
```

**Why**: `mimeapps.list` stores user-specific file type and protocol associations, ensuring the system knows to use Cursor for `cursor://` URLs even at the user level.

### 6. Configure Brave Browser

**Problem**: Brave needed to be configured to use the system's URL scheme handlers.

**Fix**: In Brave browser:

1. Go to `brave://settings/handlers` (or Settings → Privacy → Protocol handlers)
2. When clicking authentication links, Brave prompts: "What should Brave do with cursor:// links?"
3. Select "Use Cursor" or "Open with Cursor"

**Why**: Modern browsers have their own protocol handler management. Even if the system is configured, the browser needs permission to use external handlers.

### 7. Restart Applications

**Problem**: Running applications cache protocol handlers and environment variables.

**Fix**: Restart both Cursor and Brave completely:

- Close all Cursor windows
- Close all Brave windows
- Reopen both applications

**Why**:

- Applications read environment variables and system configurations at startup
- Protocol handlers are cached in memory
- Restart ensures all changes take effect

## How It Works Now

1. **User clicks "Authenticate" in Figma** → Brave opens OAuth page
2. **User authorizes** → Figma redirects to `cursor://anysphere.cursor-mcp/oauth/user-Figma/callback?code=...`
3. **Brave recognizes `cursor://`** → Checks protocol handlers → Finds Cursor registered
4. **Brave invokes handler** → Calls `xdg-open cursor://...`
5. **System routes to handler** → `xdg-mime` finds `cursor.desktop` → Executes wrapper script
6. **Wrapper script runs** → Finds Cursor binary → Passes URL to Cursor
7. **Cursor receives callback** → Processes OAuth code → Completes authentication
8. **MCP connection established** → Figma MCP server is now authenticated and ready

## Key Linux Concepts Used

1. **Desktop Entry Files** (`.desktop`): Define how applications integrate with the desktop environment
2. **MIME Types**: System-wide file type and protocol associations
3. **xdg-mime**: Tool for managing MIME type associations
4. **xdg-open**: Standard tool for opening files/URLs using registered handlers
5. **Protocol Handlers**: System mechanism for routing custom URL schemes (`cursor://`) to applications
6. **AppImage Mounting**: AppImages mount to temporary directories when executed
7. **Environment Variables**: `BROWSER` variable tells system which browser to use
8. **User vs System Config**: `~/.local/share/applications/` for user-specific app configurations

## Files Created/Modified

1. `~/.bashrc` - Added `BROWSER` environment variable
2. `~/.local/bin/cursor-url-handler` - Wrapper script for handling URLs
3. `~/.local/share/applications/cursor.desktop` - Updated desktop file
4. `~/.local/share/applications/mimeapps.list` - Added MIME associations
5. `~/.cursor/mcp.json` - MCP server configuration (already existed)

## Verification

After the fix, you can verify it works:

```bash
# Test URL scheme handler
xdg-open "cursor://test"

# Check registered handlers
xdg-mime query default x-scheme-handler/cursor
# Should output: cursor.desktop

# Check desktop file
cat ~/.local/share/applications/cursor.desktop
```

## Why This Was Complex

1. **Multiple Layers**: Browser → System → Desktop Environment → Application
2. **AppImage Specifics**: AppImages don't install like regular packages, requiring manual configuration
3. **Linux Fragmentation**: Different distributions handle protocol handlers slightly differently
4. **Modern Browser Security**: Browsers have their own protocol handler management
5. **OAuth Flow**: Requires proper URL scheme handling for the callback to work

## Takeaways

- **Protocol handlers** on Linux require explicit registration at multiple levels
- **AppImages** need special handling since they're portable, not installed
- **Modern browsers** have their own protocol handler preferences
- **Restarting applications** is often necessary after system configuration changes
- **Wrapper scripts** are useful for complex applications like AppImages
- **Desktop Entry files** are powerful for application integration on Linux

This fix ensures that `cursor://` URLs are properly routed from the browser through the system to Cursor, enabling the OAuth authentication flow to complete successfully.
