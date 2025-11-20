# Figma MCP Capabilities - What You Can Do

Now that your Figma MCP is set up and working, here's everything you can do with it:

## 🎨 Core Design-to-Code Features

### 1. **Generate Code from Figma Designs**
**Tool**: `get_design_context`

Select any frame or layer in Figma and generate code directly in Cursor!

**What you can do:**
- **Generate React + Tailwind** (default): "Generate my Figma selection"
- **Change frameworks**: 
  - "Generate my Figma selection in Vue"
  - "Generate my Figma selection in plain HTML + CSS"
  - "Generate my Figma selection in iOS"
- **Use your existing components**:
  - "Generate my Figma selection using components from `src/components/ui`"
  - "Generate my Figma selection using components from `components/ui` and style with Tailwind"
- **Customize output**:
  - "Generate my Figma selection with TypeScript"
  - "Generate my Figma selection with accessibility attributes"

**Example workflow:**
1. Open your home page design in Figma
2. Select the hero section frame
3. In Cursor, say: "Generate this hero section using my existing Button and Input components"
4. Get production-ready code that matches your design!

### 2. **Extract Design Variables & Tokens**
**Tool**: `get_variable_defs`

Get all design system variables (colors, spacing, typography) used in your selection.

**What you can do:**
- "Get the variables used in my Figma selection"
- "What color and spacing variables are used in my Figma selection?"
- "List the variable names and their values used in my Figma selection"

**Use cases:**
- Extract color palette for your theme
- Get spacing tokens for consistent layouts
- Pull typography scales for your design system

### 3. **Get Design Screenshots**
**Tool**: `get_screenshot`

Capture screenshots of your Figma selection to preserve layout fidelity.

**Why it's useful:**
- Helps AI understand exact visual layout
- Preserves design details in generated code
- Useful for documentation and reference

## 🔗 Code Connect Integration

### 4. **Map Figma Components to Code**
**Tool**: `get_code_connect_map`

Retrieves mappings between Figma node IDs and your actual code components.

**What it does:**
- Finds which Figma components map to which React/Vue/etc. components
- Returns file paths and component names
- Ensures generated code uses your actual components, not generic ones

**Example:**
- Figma button component → `components/ui/button.tsx`
- Figma card component → `components/ui/card.tsx`

### 5. **Add Code Connect Mappings**
**Tool**: `add_code_connect_map` (local only)

Manually connect Figma components to your codebase components.

**Use case:**
- Set up mappings for better code generation
- Connect design system components to implementation
- Improve AI's understanding of your component library

## 📐 Design System & Architecture

### 6. **Create Design System Rules**
**Tool**: `create_design_system_rules`

Generate a rule file that helps AI understand your design system and tech stack.

**What it creates:**
- Design system guidelines
- Component usage patterns
- Styling conventions
- Tech stack context

**How to use:**
1. Run the tool
2. Save the output to `rules/` or `instructions/` directory
3. AI will use these rules when generating code
4. Ensures consistency with your design system

### 7. **Get Design Metadata**
**Tool**: `get_metadata`

Get a lightweight XML outline of your design structure.

**What it returns:**
- Layer IDs, names, types
- Positions and sizes
- Hierarchical structure

**Use cases:**
- Break down large designs into smaller pieces
- Get overview before diving into details
- Analyze design structure
- Works with multiple selections or entire pages

## 🎯 FigJam Support

### 8. **Convert FigJam Diagrams**
**Tool**: `get_figjam`

Convert FigJam diagrams (architecture, workflows) to XML format.

**What you can do:**
- Extract app architecture diagrams
- Convert workflow diagrams
- Get wireframe structures
- Include screenshots of nodes

**Use cases:**
- Document architecture from FigJam
- Convert diagrams to code structure
- Extract workflow information

## 👤 Authentication & Identity

### 9. **Check Your Figma Identity**
**Tool**: `whoami` (remote only)

Get information about your Figma account.

**Returns:**
- Your email address
- All plans you belong to
- Your seat type on each plan

**Use case:**
- Verify authentication
- Check plan limits
- Debug permission issues

## 🚀 Practical Workflows for Your Solar Project

### Workflow 1: Update Home Page from Figma
```
1. Open your home page design in Figma
2. Select the hero section
3. In Cursor: "Generate this hero section using my existing components"
4. Get code that matches your design exactly
```

### Workflow 2: Extract Design Tokens
```
1. Select any component in Figma
2. In Cursor: "Get all color and spacing variables from this selection"
3. Use the tokens to update your Tailwind config
```

### Workflow 3: Build New Components
```
1. Design a new component in Figma (e.g., pricing card)
2. Select the frame
3. In Cursor: "Generate this as a React component using my Card and Button components"
4. Get a fully functional component
```

### Workflow 4: Design System Consistency
```
1. Run `create_design_system_rules`
2. Save to your project
3. All future code generation will follow your design system
```

### Workflow 5: Component Mapping
```
1. Set up Code Connect mappings
2. When generating code, AI will use your actual components
3. Ensures consistency across the codebase
```

## 💡 Tips for Best Results

### Selection-Based vs. Link-Based
- **Desktop MCP**: Works with selections (just select and ask)
- **Remote MCP**: Requires Figma file links (share the frame/layer URL)

### Framework Customization
Always specify your framework and component library:
- "Generate using React + TypeScript + Tailwind"
- "Use components from `components/ui`"
- "Match the styling from `globals.css`"

### Large Designs
For very large designs:
1. Use `get_metadata` first to get an overview
2. Then use `get_design_context` on specific parts
3. Prevents token limit issues

### Code Quality
- Set up Code Connect for best results
- Use `create_design_system_rules` for consistency
- Reference your existing components in prompts

## 🎨 Example Prompts

### Basic Code Generation
```
"Generate my Figma selection"
"Convert this Figma frame to React code"
"Create a Vue component from my selection"
```

### With Components
```
"Generate my selection using Button and Card from components/ui"
"Use my existing Input component for the form fields"
"Match the styling from my design system"
```

### Design Tokens
```
"Get all color variables from this selection"
"What spacing tokens are used here?"
"Extract the typography scale"
```

### Customization
```
"Generate with TypeScript and add accessibility attributes"
"Create this with dark mode support"
"Add responsive breakpoints"
```

## 🔧 Advanced Features

### Alpha Features (Local Only)
- `get_strategy_for_mapping`: Auto-detect component mappings
- `send_get_strategy_response`: Complete mapping workflow

### Make Files Support
- Extract code resources from Figma Make files
- Get prototype context for production code
- Useful for moving from prototype to production

## 📊 What This Means for Your Project

With Figma MCP, you can:

1. **Faster Development**: Generate code directly from designs
2. **Design Consistency**: Use actual design tokens and variables
3. **Component Reuse**: Map Figma components to your code components
4. **Better Quality**: AI understands your design system
5. **Less Manual Work**: No more copying hex codes and spacing values
6. **Accurate Implementation**: Screenshots preserve layout fidelity

## 🎯 Next Steps

1. **Try it now**: Select something in Figma and ask me to generate it!
2. **Set up Code Connect**: Map your components for better results
3. **Create design system rules**: Improve consistency
4. **Extract tokens**: Get your color palette and spacing scale

Ready to try? Just select something in Figma and tell me what you want to do with it!

