# Gallery Portfolio Data

## Quick Start - Editing the Word Grid Gallery

**To update the gallery on the home page, simply edit the `gallery.json` file in this folder.**

This file controls all the project words shown in the "Project Portfolio" word grid gallery. Changes will appear immediately after saving and refreshing the browser.

### Project Structure

Each gallery item requires the following fields:

```json
{
  "id": "unique-item-id",              // Unique identifier (lowercase, no spaces)
  "displayName": "REF-01",             // Reference code that shows in the grid (e.g., "DEV-01", "GRE-02")
  "image": "images/your-image.jpg",    // Path to the image file
  "category": "Development",           // Work type category (used to determine reference code prefix)
  "description": "Project description" // Optional: Description for reference
}
```

### Reference Code System

Use professional reference codes instead of personal/client names. Format: **WORKTYPE-NUMBER**

**Reference Code Prefixes:**
- **DEV** = Development (general site development)
- **RES** = Residential
- **COM** = Commercial
- **FOU** = Foundation
- **GRE** = Grading
- **EXC** = Excavation
- **CON** = Concrete
- **INF** = Infrastructure

**Examples:**
- `DEV-01`, `DEV-02` = Development projects
- `RES-01`, `RES-02` = Residential projects
- `FOU-01`, `FOU-02` = Foundation projects
- `GRE-01`, `GRE-02` = Grading projects
- `CON-01`, `CON-02` = Concrete projects
- `EXC-01`, `EXC-02` = Excavation projects
- `INF-01`, `INF-02` = Infrastructure projects

**Numbering:** Start at `01` for each work type and increment sequentially (01, 02, 03, etc.)

### Adding a New Gallery Item

1. Open `gallery.json`
2. Add a new object to the `items` array
3. Use a unique `id` (lowercase, no spaces)
4. Set a professional `displayName`
5. Point `image` to your image file
6. Save the file
7. Refresh the browser

### Editing an Existing Item

1. Open `gallery.json`
2. Find the item in the `items` array
3. Update the `displayName` to something more professional
4. Update any other fields as needed
5. Save the file
6. Refresh the browser

### Removing an Item

1. Open `gallery.json`
2. Remove the item object from the `items` array
3. Save the file
4. Refresh the browser

### Organization Tips

- **Group by category**: Use the `category` field to organize items (currently for reference, can be used for filtering later)
- **Professional names**: Replace client names with professional project names or service categories
- **Consistent naming**: Keep naming consistent (e.g., all estates end with "Estate", all commercial projects end with "Commercial")
- **Order matters**: Items appear in the order they're listed in the JSON file

### Example Transformations

**Before (Personal/Client Name):**
```json
{
  "id": "barry",
  "displayName": "BARRY",
  "image": "images/good-forms-barry.jpg"
}
```

**After (Reference Code):**
```json
{
  "id": "barry",
  "displayName": "RES-01",
  "image": "images/good-forms-barry.jpg",
  "category": "Residential",
  "description": "Residential foundation construction"
}
```

**Before (Personal/Client Name):**
```json
{
  "id": "utility",
  "displayName": "UTILITY",
  "image": "images/utility-sac.jpg"
}
```

**After (Reference Code):**
```json
{
  "id": "utility",
  "displayName": "INF-01",
  "image": "images/utility-sac.jpg",
  "category": "Infrastructure",
  "description": "Professional utility infrastructure work"
}
```

**Before (Personal/Client Name):**
```json
{
  "id": "grading",
  "displayName": "GRADING",
  "image": "images/grading-img.jpg"
}
```

**After (Reference Code):**
```json
{
  "id": "grading",
  "displayName": "GRE-01",
  "image": "images/grading-img.jpg",
  "category": "Grading",
  "description": "Professional site grading"
}
```

### Quick Tips

- **Save frequently** - Changes take effect immediately after saving
- **Check your JSON syntax** - Make sure all commas and quotes are correct
- **Test after changes** - Refresh your browser to see updates
- **Backup before major changes** - Copy the file before making big edits
- **Use reference codes** - Format: WORKTYPE-NUMBER (e.g., "DEV-01", "GRE-02")
- **Keep numbering consistent** - Number sequentially within each work type (01, 02, 03...)
- **One item per object** - Each gallery item is a separate object in the array
- **No personal names** - Use reference codes to maintain professionalism and privacy

### Common Issues

- **Gallery not showing?** - Check that your JSON is valid (no missing commas, quotes, or brackets)
- **Item not appearing?** - Make sure the item object is inside the `items` array and has all required fields
- **Image not loading?** - Verify the image path is correct and the file exists

### Need Help?

If you're having trouble editing the JSON file:
1. Use a JSON validator (like jsonlint.com) to check your syntax
2. Compare your structure to the examples above
3. Make sure you're editing `data/gallery.json` (not a different file)

