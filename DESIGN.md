# Design System Specification: Technical Precision

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Terminal"**

This design system is a departure from the "soft-and-friendly" consumer fintech aesthetic. We are building a high-performance instrument. The identity is rooted in **Technical Brutalism**: a philosophy that celebrates raw functionality, mathematical precision, and high-contrast clarity. 

To break the "template" look, we avoid the crutch of rounded corners and soft shadows. Instead, we lean into **unapologetic sharpness (0px radii)** and intentional asymmetry. The UI should feel like a high-end trading terminal or a piece of aerospace software—urgent, authoritative, and sophisticated. We use deep, "ink-pool" backgrounds to make the vibrant teal and cyan accents feel like glowing phosphor on a CRT display.

---

## 2. Colors & Surface Architecture

### The Palette
- **Primary (The Pulse):** `#44e5c2` (Primary) / `#00c9a7` (Container). This is our signal color. Use it for active states and critical data points.
- **Secondary (The Logic):** `#4cd6fb` (Secondary). Used for secondary data streams and supplementary navigation.
- **Background:** `#0a0e17` (Surface Container Lowest). A deep, void-like navy that provides the canvas for our high-contrast elements.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. They clutter the technical interface. Instead, boundaries are defined by:
1.  **Tonal Shifts:** Placing a `surface-container` (#1c1f29) element against the `surface` (#0f131c) background.
2.  **Negative Space:** Using aggressive white space to separate functional blocks.

### Surface Hierarchy & Nesting
Treat the UI as a series of recessed or extruded plates. 
- **Base Layer:** `surface` (#0f131c).
- **Embedded Components:** `surface-container-low` (#181b25).
- **Active Overlays:** `surface-container-highest` (#31353f).
This creates a "machined" look where elements feel nested within one another rather than floating aimlessly.

### The "Glass & Gradient" Rule
To add "soul" to the brutalist structure, use subtle gradients. Main CTAs should not be flat; use a linear gradient from `primary` (#44e5c2) to `primary_container` (#00c9a7) at a 135° angle. This mimics the slight glow of a high-end LED screen.

---

## 3. Typography: The Editorial Edge

The type system is a dialogue between human expression and machine logic.

*   **Space Grotesk (Brand & UI):** Used for all headings, labels, and body copy. Its wide apertures and quirky geometric details provide an editorial, avant-garde feel.
*   **JetBrains Mono (Data & Numbers):** **Non-negotiable for all currency values.** Monospaced numbers ensure that as exchange rates fluctuate, the UI remains stable and tabular data aligns perfectly.

### Hierarchy
- **Display-LG (3.5rem):** Reserved for hero exchange rates. Tracking: -0.02em.
- **Headline-MD (1.75rem):** Section titles. Uppercase for a more "architectural" feel.
- **Label-SM (0.6875rem):** Micro-data and metadata. Always use `on_surface_variant` (#bacac3) to keep the hierarchy clear.

---

## 4. Elevation & Depth

In a world of 0px corners, depth is our only way to communicate "touchability."

### The Layering Principle
Do not use shadows to lift cards. Instead, use "Step-Up" illumination. If the background is `surface`, the card is `surface-container`. If the card is clicked, it "sinks" into `surface-container-lowest`.

### Glassmorphism & Ghost Borders
For floating modals or dropdowns, use the **Glassmorphism** effect:
- **Background:** `surface-container-highest` at 70% opacity.
- **Backdrop-blur:** 12px to 20px.
- **The Ghost Border:** A 1px border using `outline_variant` (#3c4a45) at **20% opacity**. This creates a sharp "razor edge" that catches light without creating a heavy box.

---

## 5. Components

### Buttons (The Command Units)
- **Primary:** Rectangle (0px radius). Gradient fill (Primary to Primary Container). Text is `on_primary` (#00382d), bold.
- **Secondary:** Ghost variant. No fill. 1px `primary` border (100% opacity for high contrast). 
- **States:** On hover, the button should shift to `secondary` (#4cd6fb). The color swap should be instant (0ms transition) to mimic terminal responsiveness.

### Input Fields (The Data Ports)
- **Structure:** A bottom-border only (`outline`, #85948e). 
- **Focus State:** The bottom border transforms into a 2px `primary` line. The label moves upward and shifts to `primary` color.
- **Typography:** Use JetBrains Mono for the input text to emphasize the "data entry" nature of currency conversion.

### Cards & Lists (The Ledger)
- **Rule:** No dividers. 
- **Spacing:** Use 24px or 32px of vertical padding to separate list items. 
- **Selection:** When a currency is selected in a list, the entire background of that row shifts to `surface-bright` (#353943).

### Signature Component: The "Ticker Tape"
A horizontal scrolling element at the very top or bottom of the screen, using `surface-container-lowest` background and `label-sm` typography in `secondary` color, displaying live rate fluctuations.

---

## 6. Do’s and Don’ts

### Do
- **DO** use absolute 0px corners for everything. No exceptions.
- **DO** use JetBrains Mono for any character that is a digit.
- **DO** use high-contrast color pairings (e.g., `primary` on `surface-container-lowest`).
- **DO** embrace "Uncomfortable" White Space. Let the data breathe.

### Don’t
- **DON'T** use soft drop shadows. They muddy the technical precision.
- **DON'T** use 1px solid borders at 100% opacity unless it's a primary action button.
- **DON'T** use standard "Fintech Blue." If it looks like a traditional bank, it's wrong. Stick to the Deep Navy/Teal/Cyan triad.
- **DON'T** use transitions longer than 150ms. High-performance tools feel "snappy," not "soupy."