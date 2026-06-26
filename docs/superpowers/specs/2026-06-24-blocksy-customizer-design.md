# Blocksy Customizer Configuration

## Overview
Configure the Blocksy parent theme via WordPress Customizer to match the 3 Ways Enclosure brand identity. Header, footer, color palette, and typography.

## Color Palette (Blocksy 8-color system)
- **Palette 1** (Primary): `#2D5A3F` — Forest
- **Palette 2** (Primary hover): `#3D7A55` — Forest Light
- **Palette 3** (Text): `#1C1C1E` — Graphite
- **Palette 4** (Headings): `#000000` — Black
- **Palette 5** (Background): `#F5F0E8` — Ivory
- **Palette 6** (Alt background): `#EDE8DD` — Ivory darker
- **Palette 7** (Borders): `#E5DDD0` — Warm border
- **Palette 8** (White): `#FFFFFF`

## Header
- **Layout:** Logo left, navigation center-right, search icon
- **Navigation items:** Home, About, News, Safety, Directory, Marketplace, Gallery, Contact
- **Style:** Glass effect on scroll (via blocksy-sticky)
- **Background:** Ivory (`#F5F0E8`), transparent on hero

## Footer
- **Background:** Graphite (`#1C1C1E`)
- **Layout:** 3-column link groups + copyright bar
- **Links:** Community (News, Safety, Directory, Marketplace, Gallery), Resources (About, Contact), Administration (Admin Portal)
- **Accents:** Gold (`#C9A84C`) on links/hover

## Typography
- **Font:** Poppins (weights 400, 500, 600, 700)
- **Hero headings:** Bold, tight tracking
- **Section headings:** Bold
- **Body:** Regular weight, relaxed leading
- **Eyebrows/labels:** Uppercase, gold, wide tracking

## Implementation
Set via WordPress Customizer API (theme_mods + blocksy-specific options stored as `blocksy_*` in wp_options). Applied programmatically via PHP using `set_theme_mod()` for the active child theme.
