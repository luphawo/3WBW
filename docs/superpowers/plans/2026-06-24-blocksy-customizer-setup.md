# Blocksy Customizer Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Configure Blocksy theme's color palette, typography, header, and footer to match the 3 Ways Enclosure brand identity.

**Architecture:** All settings are stored as WordPress `theme_mods` for the active child theme (`threeways-enclosure`). A single PHP script sets all theme_mods. The navigation menu is created via `wp_create_nav_menu()`. Header/footer layouts use Blocksy's `header_placements`/`footer_placements` data structures.

**Tech Stack:** WordPress 7.0, Blocksy 2.1.46, Pods 3.3.9, PHP 8.x

## Global Constraints

- All colors use the approved palette: Forest `#2D5A3F`, Forest Light `#3D7A55`, Graphite `#1C1C1E`, Black `#000000`, Ivory `#F5F0E8`, Ivory Dark `#EDE8DD`, Border `#E5DDD0`, White `#FFFFFF`
- Typography: Poppins via Google Fonts (weights 400-800)
- Navigation structure: Home, About, News, Safety, Directory, Marketplace, Gallery, Contact
- Script runs from `D:\Documents\3wbw\app\public\` (WordPress root)
- Settings persist after script deletion

---

### Task 1: Set Color Palette and Global Colors

**Files:**
- Create: `D:\Documents\3wbw\app\public\apply-blocksy.php`
- Uses: WordPress `set_theme_mod()` API

- [ ] **Step 1: Write the PHP script to set color palette**

```php
<?php
require_once 'wp-load.php';

// Set Blocksy color palette (8 colors)
set_theme_mod('colorPalette', [
    'color1' => ['color' => '#2D5A3F'],  // Forest (primary)
    'color2' => ['color' => '#3D7A55'],  // Forest Light (primary hover)
    'color3' => ['color' => '#1C1C1E'],  // Graphite (text)
    'color4' => ['color' => '#000000'],  // Black (headings)
    'color5' => ['color' => '#F5F0E8'],  // Ivory (background)
    'color6' => ['color' => '#EDE8DD'],  // Ivory Dark (alt background)
    'color7' => ['color' => '#E5DDD0'],  // Warm border
    'color8' => ['color' => '#FFFFFF'],  // White
]);

// Set global color theme mods
set_theme_mod('fontColor', ['default' => ['color' => '#1C1C1E']]);
set_theme_mod('headingColor', ['default' => ['color' => '#000000']]);
set_theme_mod('linkColor', [
    'default' => ['color' => '#2D5A3F'],
    'hover' => ['color' => '#3D7A55'],
]);
set_theme_mod('selectionColor', [
    'default' => ['color' => '#FFFFFF'],
    'hover' => ['color' => '#2D5A3F'],
]);
set_theme_mod('border_color', ['default' => ['color' => '#E5DDD0']]);
set_theme_mod('site_background', [
    'background_type' => 'color',
    'background_color' => '#F5F0E8',
    'background_pattern' => 'none',
    'background_repeat' => 'repeat',
    'background_size' => 'auto',
    'background_attachment' => 'scroll',
    'background_position' => 'center center',
]);

echo "Color palette applied.\n";
```

- [ ] **Step 2: Run the script**

```bash
curl -s http://localhost:10014/apply-blocksy.php
```

Expected output: `Color palette applied.`

- [ ] **Step 3: Verify the settings**

Add this to the script and re-run, OR run separately:

```php
$palette = get_theme_mod('colorPalette');
foreach ($palette as $key => $val) {
    echo "$key: {$val['color']}\n";
}
```

Expected: All 8 colors printed with correct hex values.

---

### Task 2: Configure Typography to Poppins

**Files:**
- Modify: `D:\Documents\3wbw\app\public\apply-blocksy.php` (append to existing script)

**Interface:** Depends on Task 1 (runs in same script, after color setup)

- [ ] **Step 1: Add typography settings to the script**

```php
// Typography helper
function blocksy_typography($family, $variation, $size = 'CT_CSS_SKIP_RULE', $lineHeight = 'CT_CSS_SKIP_RULE', $letterSpacing = 'CT_CSS_SKIP_RULE', $transform = 'CT_CSS_SKIP_RULE') {
    return [
        'family' => $family,
        'variation' => $variation,
        'size' => $size,
        'line-height' => $lineHeight,
        'letter-spacing' => $letterSpacing,
        'text-transform' => $transform,
        'text-decoration' => 'CT_CSS_SKIP_RULE',
    ];
}

// Set root/base typography to Poppins
set_theme_mod('rootTypography', blocksy_typography('Poppins', 'n4', '16px', '1.65'));
set_theme_mod('h1Typography', blocksy_typography('Poppins', 'n7', '40px', '1.5'));
set_theme_mod('h2Typography', blocksy_typography('Poppins', 'n7', '35px', '1.5'));
set_theme_mod('h3Typography', blocksy_typography('Poppins', 'n7', '30px', '1.5'));
set_theme_mod('h4Typography', blocksy_typography('Poppins', 'n7', '25px', '1.5'));
set_theme_mod('h5Typography', blocksy_typography('Poppins', 'n7', '20px', '1.5'));
set_theme_mod('h6Typography', blocksy_typography('Poppins', 'n7', '16px', '1.5'));
set_theme_mod('buttons', blocksy_typography('Poppins', 'n5', '15px'));
set_theme_mod('font_family_fallback', 'Sans-Serif');

echo "Typography applied.\n";
```

- [ ] **Step 2: Run the updated script**

```bash
curl -s http://localhost:10014/apply-blocksy.php
```

Expected output: `Color palette applied. Typography applied.`

- [ ] **Step 3: Verify typography settings**

```php
$root = get_theme_mod('rootTypography');
echo "Root font: {$root['family']} / {$root['variation']}\n";
```

Expected: `Root font: Poppins / n4`

---

### Task 3: Create Navigation Menu and Set Up Header Builder

**Files:**
- Modify: `D:\Documents\3wbw\app\public\apply-blocksy.php`

**Interfaces:** Depends on Tasks 1-2

- [ ] **Step 1: Add navigation menu creation to the script**

```php
// Create primary navigation menu
$menu_name = 'Primary Navigation';
$locations = get_theme_mod('nav_menu_locations', []);
$menu_exists = wp_get_nav_menu_object($menu_name);

if (!$menu_exists) {
    $menu_id = wp_create_nav_menu($menu_name);
    
    $menu_items = [
        'Home' => home_url('/'),
        'About' => home_url('/about'),
        'News' => home_url('/news'),
        'Safety' => home_url('/safety'),
        'Directory' => home_url('/directory'),
        'Marketplace' => home_url('/marketplace'),
        'Gallery' => home_url('/gallery'),
        'Contact' => home_url('/contact'),
    ];
    
    foreach ($menu_items as $title => $url) {
        wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => $title,
            'menu-item-url' => $url,
            'menu-item-status' => 'publish',
        ]);
    }
    
    // Assign menu to the header location
    $locations['primary'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
    
    echo "Navigation menu created.\n";
} else {
    echo "Navigation menu already exists.\n";
}
```

- [ ] **Step 2: Add header placements to the script**

```php
// Configure header placements
$header = [
    'current_section' => 'type-1',
    'sections' => [
        [
            'id' => 'type-1',
            'mode' => 'placements',
            'name' => 'Main Header',
            'items' => [
                [
                    'id' => 'logo',
                    'values' => [
                        'has_site_title' => 'yes',
                        'logoMaxHeight' => 50,
                        'siteTitle' => [
                            'family' => 'Poppins',
                            'variation' => 'n7',
                            'size' => '25px',
                            'line-height' => '1.5',
                            'letter-spacing' => 'CT_CSS_SKIP_RULE',
                            'text-transform' => 'CT_CSS_SKIP_RULE',
                            'text-decoration' => 'CT_CSS_SKIP_RULE',
                        ],
                        'site_tagline' => 'Connected living, community-first.',
                        'has_tagline' => 'yes',
                    ],
                ],
                [
                    'id' => 'menu',
                    'values' => [],
                ],
                [
                    'id' => 'search',
                    'values' => [],
                ],
                [
                    'id' => 'trigger',
                    'values' => [],
                ],
                [
                    'id' => 'mobile-menu',
                    'values' => [],
                ],
            ],
            'desktop' => [
                [
                    'id' => 'top-row',
                    'placements' => [
                        ['id' => 'start', 'items' => []],
                        ['id' => 'middle', 'items' => []],
                        ['id' => 'end', 'items' => []],
                        ['id' => 'start-middle', 'items' => []],
                        ['id' => 'end-middle', 'items' => []],
                    ],
                ],
                [
                    'id' => 'middle-row',
                    'placements' => [
                        ['id' => 'start', 'items' => ['logo']],
                        ['id' => 'middle', 'items' => []],
                        ['id' => 'end', 'items' => ['menu', 'search']],
                        ['id' => 'start-middle', 'items' => []],
                        ['id' => 'end-middle', 'items' => []],
                    ],
                ],
                [
                    'id' => 'bottom-row',
                    'placements' => [
                        ['id' => 'start', 'items' => []],
                        ['id' => 'middle', 'items' => []],
                        ['id' => 'end', 'items' => []],
                        ['id' => 'start-middle', 'items' => []],
                        ['id' => 'end-middle', 'items' => []],
                    ],
                ],
                [
                    'id' => 'offcanvas',
                    'placements' => [
                        ['id' => 'start', 'items' => []],
                    ],
                ],
            ],
            'mobile' => [
                [
                    'id' => 'top-row',
                    'placements' => [
                        ['id' => 'start', 'items' => []],
                        ['id' => 'middle', 'items' => []],
                        ['id' => 'end', 'items' => []],
                        ['id' => 'start-middle', 'items' => []],
                        ['id' => 'end-middle', 'items' => []],
                    ],
                ],
                [
                    'id' => 'middle-row',
                    'placements' => [
                        ['id' => 'start', 'items' => ['logo']],
                        ['id' => 'middle', 'items' => []],
                        ['id' => 'end', 'items' => ['trigger']],
                        ['id' => 'start-middle', 'items' => []],
                        ['id' => 'end-middle', 'items' => []],
                    ],
                ],
                [
                    'id' => 'bottom-row',
                    'placements' => [
                        ['id' => 'start', 'items' => []],
                        ['id' => 'middle', 'items' => []],
                        ['id' => 'end', 'items' => []],
                        ['id' => 'start-middle', 'items' => []],
                        ['id' => 'end-middle', 'items' => []],
                    ],
                ],
                [
                    'id' => 'offcanvas',
                    'placements' => [
                        ['id' => 'start', 'items' => ['mobile-menu']],
                    ],
                ],
            ],
            'settings' => [],
        ],
    ],
];

set_theme_mod('header_placements', $header);
echo "Header placements applied.\n";
```

- [ ] **Step 3: Run the script**

```bash
curl -s http://localhost:10014/apply-blocksy.php
```

Expected output: `Color palette applied. Typography applied. Navigation menu created. Header placements applied.`

- [ ] **Step 4: Verify header**

Check the site front-end at `http://localhost:10014`. Header should show logo text on the left, navigation menu (Home, About, News, Safety, Directory, Marketplace, Gallery, Contact) and search icon on the right.

---

### Task 4: Set Up Footer Builder

**Files:**
- Modify: `D:\Documents\3wbw\app\public\apply-blocksy.php`

**Interfaces:** Depends on Tasks 1-3

- [ ] **Step 1: Add footer placements to the script**

```php
// Configure footer placements
$footer = [
    'current_section' => 'type-1',
    'sections' => [
        [
            'id' => 'type-1',
            'rows' => [
                [
                    'id' => 'middle-row',
                    'columns' => [
                        ['text'],
                        ['text'],
                        ['text'],
                    ],
                ],
                [
                    'id' => 'bottom-row',
                    'columns' => [
                        ['copyright'],
                    ],
                ],
            ],
            'items' => [
                [
                    'id' => 'text~0',
                    'values' => [
                        'text' => '<h4 style="color: #C9A84C;">Community</h4>
<ul style="list-style: none; padding: 0; color: #F5F0E8;">
<li><a href="/news" style="color: #F5F0E8;">News</a></li>
<li><a href="/safety" style="color: #F5F0E8;">Safety &amp; Security</a></li>
<li><a href="/directory" style="color: #F5F0E8;">Local Directory</a></li>
<li><a href="/marketplace" style="color: #F5F0E8;">Marketplace</a></li>
<li><a href="/gallery" style="color: #F5F0E8;">Gallery</a></li>
</ul>',
                    ],
                ],
                [
                    'id' => 'text~1',
                    'values' => [
                        'text' => '<h4 style="color: #C9A84C;">Resources</h4>
<ul style="list-style: none; padding: 0; color: #F5F0E8;">
<li><a href="/about" style="color: #F5F0E8;">About Us</a></li>
<li><a href="/contact" style="color: #F5F0E8;">Contact</a></li>
<li><a href="/safety#emergency" style="color: #F5F0E8;">Emergency Contacts</a></li>
<li><a href="/safety#incidents" style="color: #F5F0E8;">Report Incident</a></li>
</ul>',
                    ],
                ],
                [
                    'id' => 'text~2',
                    'values' => [
                        'text' => '<h4 style="color: #C9A84C;">Administration</h4>
<ul style="list-style: none; padding: 0; color: #F5F0E8;">
<li><a href="/admin" style="color: #F5F0E8;">Admin Portal</a></li>
<li><a href="/about#governance" style="color: #F5F0E8;">Governance</a></li>
<li><a href="/about#documents" style="color: #F5F0E8;">Documents</a></li>
</ul>',
                    ],
                ],
                [
                    'id' => 'copyright',
                    'values' => [
                        'copyright_text' => 'Copyright &copy; 2026 - 3 Ways Enclosure. All rights reserved.',
                    ],
                ],
            ],
            'settings' => [],
        ],
    ],
];

set_theme_mod('footer_placements', $footer);
echo "Footer placements applied.\n";
```

- [ ] **Step 2: Run the script**

```bash
curl -s http://localhost:10014/apply-blocksy.php
```

Expected output: All previous messages plus `Footer placements applied.`

- [ ] **Step 3: Verify footer**

Check `http://localhost:10014`. Footer should show:
- Dark background (inherits Blocksy's default for footer)
- 3 columns: Community, Resources, Administration with gold headings and white links
- Copyright bar at bottom

---

### Task 5: Final Verification and Cleanup

**Files:**
- Delete: `D:\Documents\3wbw\app\public\apply-blocksy.php`

- [ ] **Step 1: Create verification script**

```php
<?php
require_once 'wp-load.php';

echo "=== Color Palette ===\n";
$palette = get_theme_mod('colorPalette');
foreach ($palette as $k => $v) {
    echo "  $k: {$v['color']}\n";
}

echo "\n=== Typography ===\n";
$root = get_theme_mod('rootTypography');
echo "  Root: {$root['family']} / {$root['variation']} / {$root['size']}\n";

echo "\n=== Header ===\n";
$header = get_theme_mod('header_placements');
echo "  Sections: " . count($header['sections']) . "\n";
echo "  Desktop middle-row start: " . implode(', ', $header['sections'][0]['desktop'][1]['placements'][0]['items']) . "\n";
echo "  Desktop middle-row end: " . implode(', ', $header['sections'][0]['desktop'][1]['placements'][2]['items']) . "\n";

echo "\n=== Footer ===\n";
$footer = get_theme_mod('footer_placements');
echo "  Items: " . count($footer['sections'][0]['items']) . "\n";

echo "\n=== Navigation Menu ===\n";
$menu = wp_get_nav_menu_object('Primary Navigation');
if ($menu) {
    echo "  Menu ID: {$menu->term_id}\n";
    $items = wp_get_nav_menu_items($menu->term_id);
    echo "  Items:\n";
    foreach ($items as $item) {
        echo "    - {$item->title}: {$item->url}\n";
    }
}

echo "\nAll settings verified.\n";
```

- [ ] **Step 2: Run verification**

```bash
curl -s http://localhost:10014/verify-blocksy.php
```

Expected: All settings shown with correct values.

- [ ] **Step 3: Delete temporary scripts**

```bash
Remove-Item -LiteralPath "D:\Documents\3wbw\app\public\apply-blocksy.php", "D:\Documents\3wbw\app\public\verify-blocksy.php" -ErrorAction SilentlyContinue
echo "Temporary scripts cleaned up."
```

- [ ] **Step 4: Take a screenshot or confirm front-end**

Visit `http://localhost:10014` and confirm:
- [ ] Header shows logo left, navigation center-right, search icon on right
- [ ] Colors match the brand palette
- [ ] Footer shows 3 columns with gold headings + copyright bar
- [ ] Mobile view shows hamburger menu
