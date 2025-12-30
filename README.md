# Dirt Dudes Excavating Website

A modern, responsive website for Dirt Dudes Excavating - a professional excavation and site development company with over 40 years of experience in grading, concrete, utility installation, and comprehensive site work.

## 🚀 Quick Start

### View the Website Locally

You have several options to view the website:

#### Option 1: Simple File Opening (Quickest)
1. Navigate to the project folder: `DDE_Web`
2. Double-click `index.html` to open it in your default browser
   - **Note**: Some features may be limited when opening directly (CORS restrictions)

#### Option 2: Local Development Server (Recommended)

**Using Python (if installed):**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000`

**Using Node.js (if installed):**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server -p 8000
```
Then open: `http://localhost:8000`

**Using PHP (if installed):**
```bash
php -S localhost:8000
```
Then open: `http://localhost:8000`

**Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
DDE_Web/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Main stylesheet
│   └── theme.css          # Theme configuration & design tokens
├── js/
│   ├── main.js            # Main JavaScript (animations, navigation)
│   └── form-handler.js    # Contact form handling
└── README.md              # This file
```

## 🎨 Theme & Design

The website uses a carefully crafted design system with the following key elements:

### Color Palette
- **Primary (Yellow)**: `#FFC107` - Main brand color
- **Dark**: `#1a1a1a` - Headers, buttons, dark sections
- **Cream**: `#F4F1EA` - Main light background
- **Stone Grays**: Various shades for text and borders

### Typography
- **Headings**: Oswald (300-700 weights)
- **Body**: Manrope (300-800 weights)

### Design Tokens
All design tokens (colors, spacing, typography, etc.) are documented in `styles/theme.css` for easy reference when adding new components.

## ✨ Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: GSAP-powered animations and scroll effects
- **Interactive Elements**:
  - Before/After image slider
  - Interactive project map
  - Mobile navigation menu
  - Contact form with validation
- **Performance**: Optimized with CDN resources and efficient animations
- **Accessibility**: Semantic HTML and ARIA labels

## 📝 Contact Form

The contact form includes:
- Client-side validation
- Required field checking
- Email format validation
- Phone number validation
- Success/error messaging

**Note**: The form currently logs to console. To make it functional:
1. Set up a backend API endpoint
2. Update the `submitForm()` function in `js/form-handler.js`
3. Replace the simulated API call with actual fetch request

Example backend integration:
```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **GSAP**: Animation library for smooth transitions
- **ScrollTrigger**: GSAP plugin for scroll-based animations
- **Lucide Icons**: Modern icon library
- **Google Fonts**: Oswald & Manrope

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Customization

### Adding New Sections
1. Follow the existing HTML structure
2. Use classes from `theme.css` for consistent styling
3. Add scroll animations in `js/main.js` if needed

### Modifying Colors
Update the CSS variables in `styles/theme.css`:
```css
:root {
    --color-primary: #D35F35;  /* Change this */
    /* ... other variables */
}
```

### Adding Form Fields
1. Add input/textarea in `index.html` within the form
2. Add validation in `js/form-handler.js` if needed
3. Include field in form data collection

## 📄 License

This project is proprietary and belongs to Dirt Dudes Excavating INC.

## 🤝 Support

For questions or issues, contact: info@dirtdudesexcavating.com

---

**Built with care for Dirt Dudes Excavating** 🏗️

