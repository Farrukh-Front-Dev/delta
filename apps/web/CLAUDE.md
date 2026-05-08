@AGENTS.md
# DESIGN SYSTEM ENFORCEMENT RULES

You must strictly follow the design system.

Do NOT use:

* hardcoded colors (e.g. hex values directly in components)
* inline arbitrary styling
* random spacing values
* inconsistent shadow/glow values

Always use:

* centralized Tailwind classes
* design tokens from config
* reusable utility classes
* predefined animation constants

# COLOR USAGE RULES

All colors MUST come from the design system:

Allowed:

* semantic color classes (e.g. bg-primary, text-muted, bg-surface)
* predefined Tailwind theme extensions
* CSS variables (e.g. var(--color-primary))

NOT allowed:

* hex colors directly in JSX
* arbitrary rgb() usage in components
* one-off color values

# SPACING RULES

Use only:

* design tokens (spacing scale)
* Tailwind spacing system

Avoid:

* custom pixel values unless defined in tokens

# ANIMATION RULES

All animation values must come from centralized config:

* duration tokens
* easing presets
* spring configs

No random animation timing allowed.

# COMPONENT STYLING RULE

Components must be:

* consistent with design system
* reusable
* theme-aware
* not individually styled without system reference

# SENIOR ENGINEER RULE

Always think:

"Is this reusable in another part of the app?"

If no → abstract it properly or simplify.

If yes → ensure consistency with design system.

You are NOT allowed to treat styling as ad-hoc per component.

Every UI decision must align with system-wide consistency.
