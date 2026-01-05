# Gallery Data File

## Quick Start - Adding Images to Gallery

**To add or edit gallery items, simply edit the `gallery-full.json` file in this folder.**

This file controls all the images shown in the Gallery page. Changes will appear immediately after saving and refreshing the browser.

### Gallery Item Structure

Each gallery item requires the following fields:

```json
{
  "id": "unique-id",                    // Unique identifier (lowercase, no spaces, use hyphens)
  "title": "Project Title",            // Display title for the image
  "image": "images/filename.jpg",      // Path to image file (relative to root)
  "category": "concrete",              // Category for filtering (see below)
  "description": "Optional description", // Optional: Description shown on hover/lightbox
  "tags": ["tag1", "tag2"]             // Optional: Array of tags for future use
}
```

### Available Categories

Use these exact category names for filtering:

- `grading` - Site grading and land development
- `concrete` - Concrete work, pours, forms
- `foundation` - Foundation work
- `utility` - Utility installation
- `site-work` - General site work and development

### Adding a New Gallery Item

**Easiest Method: Copy & Paste**

1. Open `gallery-full.json`
2. **Copy an existing item** (the entire object from `{` to `},`)
3. **Paste it** in the `items` array (before the closing `]`)
4. **Update these fields:**
   - `id` - Make it unique (e.g., "new-project-1")
   - `title` - Display title
   - `image` - Path to your image file (e.g., "images/my-image.jpg")
   - `category` - One of the categories listed above
   - `description` - Optional description
5. **Add a comma** after the previous item if needed
6. Save the file
7. Refresh the browser

### Image Requirements

- **Format**: JPG, PNG, or WebP
- **Location**: Place images in the `images/` folder
- **Naming**: Use lowercase with hyphens (e.g., `my-project-image.jpg`)
- **Size**: Recommended max 2000px width for web performance

### Example

```json
{
  "id": "new-foundation-work",
  "title": "New Foundation Project",
  "image": "images/new-foundation.jpg",
  "category": "foundation",
  "description": "Foundation work for residential project",
  "tags": ["foundation", "residential"]
}
```

### Filtering

The gallery automatically filters by category when users click the filter buttons:
- **All Projects** - Shows everything
- **Grading** - Shows only grading category
- **Concrete** - Shows only concrete category
- **Foundation** - Shows only foundation category
- **Utility** - Shows only utility category
- **Site Work** - Shows only site-work category

### Lightbox Feature

Clicking any gallery image opens a full-screen lightbox view with:
- Large image display
- Title and description
- Close button (X) or click outside to close
- Escape key to close

### Tips

- Keep image file sizes reasonable (under 500KB when possible)
- Use descriptive titles that help users understand the project
- Add descriptions for better context
- Organize images by category for easy filtering
