# Active Sites Data File

## Quick Start - Editing Active Sites

**To update project information, simply edit the `projects.json` file in this folder.**

This file controls all the projects shown in the "Active Sites" section on the homepage. Changes will appear immediately after saving and refreshing the browser.

### Project Structure

Each project requires the following fields:

```json
{
  "id": "unique-project-id",           // Unique identifier (lowercase, no spaces)
  "name": "Project Name",              // Display name
  "projectId": "#PROJECT-2024-01",     // Project ID/Reference
  "status": "Active",                  // Status: "Active", "In Progress", "Final Phase", "Completed", "Scheduled"
  "address": "123 Main St, City, CA 12345",  // Full street address (REQUIRED)
  "coordinates": {
    "lat": 38.2975,                    // Latitude (for map marker placement)
    "lng": -122.2869,                  // Longitude (for map marker placement)
    "display": "38.2975° N, 122.2869° W"  // Display format (optional)
  },
  "jobSize": "Large Scale",            // Project scale: "Small Scale", "Medium Scale", "Large Scale"
  "workType": "Estate Development",    // Type of work being performed (e.g., "Estate Development", "Land Development", "Residential Construction")
  "type": "Structural",                // Project type (e.g., "Structural", "Agricultural", "Residential")
  "category": "Commercial",            // Project category (e.g., "Commercial", "Residential", "Infrastructure")
  "features": [                        // Array of key features (shown in pop-up)
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  "description": "Project description...",
  "startDate": "2024-03-15",           // Start date (YYYY-MM-DD)
  "estimatedCompletion": "2024-11-30"   // Estimated completion (YYYY-MM-DD)
}
```

### Adding a New Project

**Easiest Method: Copy & Paste**

1. Open `projects.json`
2. **Copy an existing project** (the entire object from `{` to `},`)
3. **Paste it** after the last project (before the closing `]`)
4. **Update these key fields:**
   - `id` - Make it unique (lowercase, no spaces, e.g., "new-project")
   - `name` - Project display name
   - `projectId` - Your project reference number (e.g., "#PROJ-2024-01")
   - `address` - Full street address
   - `coordinates.lat` and `coordinates.lng` - Get from Google Maps (right-click location)
   - `status` - "Active", "In Progress", "Final Phase", "Completed", or "Scheduled"
   - `features` - Array of project highlights
5. **Add a comma** after the previous project if needed
6. Save the file
7. Refresh the browser

**Quick Tip:** The easiest way is to copy the entire project object (including the comma), paste it, then just change the values you need!

### Editing an Existing Project

1. Open `projects.json`
2. Find the project in the `projects` array
3. Update any fields you want to change
4. Save the file
5. Refresh the browser

### Removing a Project

1. Open `projects.json`
2. Remove the project object from the `projects` array
3. Save the file
4. Refresh the browser

### Map Positioning

Markers are automatically placed on the map based on the `coordinates.lat` and `coordinates.lng` values. The map uses real geographic coordinates, so markers will appear at their actual locations in California.

To find coordinates for an address:
1. Use Google Maps to find your address
2. Right-click on the location
3. The first number is latitude, the second is longitude
4. Or use an online geocoding service

### Status Colors

- **Active**: Yellow (#FFC107) - Pulsing marker
- **In Progress**: Blue (#3B82F6)
- **Final Phase**: Green (#10B981)
- **Completed**: Gray (#6B7280)
- **Scheduled**: Purple (#A855F7) - For projects that are contracted but not yet started

### Get Directions Feature

Each project automatically includes a "Get Directions" button that:
- Opens Google Maps on desktop/Android devices
- Opens Apple Maps on iOS devices
- Uses the project's coordinates for accurate navigation
- Works from both the map popup and the project list sidebar

**Note**: Make sure each project has both an `address` and `coordinates` (lat/lng) for the directions feature to work properly.

### Quick Tips

- **Save frequently** - Changes take effect immediately after saving
- **Check your JSON syntax** - Make sure all commas and quotes are correct
- **Test after changes** - Refresh your browser to see updates
- **Backup before major changes** - Copy the file before making big edits
- **One project per object** - Each project is a separate object in the array
- **Keep the structure** - Always maintain the `projects` array format
- **Include addresses** - Always include both `address` and `coordinates` for directions to work

### Common Issues

- **Map not showing projects?** - Check that your JSON is valid (no missing commas, quotes, or brackets)
- **Wrong location on map?** - Verify your coordinates are correct (lat should be ~32-42 for California, lng should be ~-115 to -125)
- **Project not appearing?** - Make sure the project object is inside the `projects` array and has all required fields

### Need Help?

If you're having trouble editing the JSON file:
1. Use a JSON validator (like jsonlint.com) to check your syntax
2. Compare your structure to the examples above
3. Make sure you're editing `data/projects.json` (not a different file)

