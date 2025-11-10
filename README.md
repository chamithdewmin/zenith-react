# Ekspress - Logistic & Transportation Landing Page

A fully functional, responsive landing page for Ekspress logistics and transportation services, built with React.js, JavaScript, and CSS.

## Features

- **Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Component-Based Architecture**: Reusable React components (Header, Hero, About, Services, Contact, Footer)
- **Modern UI/UX**: Clean design matching the Figma specifications exactly
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Production-Ready**: Clean, maintainable code following best practices

## Technology Stack

- React.js 18.2.0
- Vite 5.0.8
- JavaScript (ES6+)
- CSS3 (with CSS Variables)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with contact info
│   ├── Header.css
│   ├── Hero.js             # Hero section with tracking form
│   ├── Hero.css
│   ├── AboutUs.js          # About Us section
│   ├── AboutUs.css
│   ├── Services.js         # Services grid
│   ├── Services.css
│   ├── SocialProof.js      # Social proof section
│   ├── SocialProof.css
│   ├── HowItWorks.js       # How It Works section
│   ├── HowItWorks.css
│   ├── VideoBox.js         # Video section
│   ├── VideoBox.css
│   ├── Testimonials.js     # Testimonials section
│   ├── Testimonials.css
│   ├── Footer.js           # Footer with subscribe form
│   └── Footer.css
├── App.js                  # Main app component
├── App.css                 # Global styles and CSS variables
├── index.js                # Entry point
└── index.css               # Base styles
```

## Design Specifications

The design follows the Figma specifications with:

- **Colors**: Dark Blue (#121D50, #090E23), Blue (#0E33CB, #1F45E4), Orange (#EC4621), Grey (#EDF0F3, #5C6C7B)
- **Typography**: Space Grotesk (headings) and Roboto (body text)
- **Layout**: 1440px max-width container with responsive breakpoints
- **Components**: All sections match the Figma design exactly

## Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: 480px - 767px
- Small Mobile: Below 480px

## Features by Section

1. **Header**: Sticky navigation with mobile menu, contact information
2. **Hero**: Large hero section with tracking form, fun facts, and call-to-action
3. **About Us**: Company information with feature cards and image
4. **Services**: Grid of 6 service cards with hover effects
5. **Social Proof**: Trust indicators section
6. **How It Works**: Step-by-step process visualization
7. **Video Box**: Video section with play button
8. **Testimonials**: Customer testimonials with featured card
9. **Footer**: Company info, navigation, recent projects, and subscribe form

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Ekspress logistics and transportation services.

