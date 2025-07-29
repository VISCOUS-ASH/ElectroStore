# ElectroStore - Premium Electronics Showcase

A modern, responsive electronics shopping showcase website built with React, Vite, and Tailwind CSS. This is a demo/showcase website with no backend functionality.

## 🚀 Features

### Core Pages
- **Home Page**: Hero section, featured products, categories, and company values
- **Products Page**: Complete product catalog with filtering, sorting, and search
- **Product Details**: Detailed product information with image gallery and related products
- **Cart**: Shopping cart functionality (demo only - no real checkout)
- **About**: Company story, team, and values
- **Contact**: Contact form and information
- **FAQ**: Expandable FAQ sections with search functionality

### Key Features
- 🌙 **Dark/Light Theme**: Toggle between themes with system preference detection
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Animations**: Framer Motion animations throughout
- 🛒 **Cart Management**: Add/remove items, quantity management (localStorage)
- 🔍 **Search & Filter**: Product search and category filtering
- ⭐ **Product Reviews**: Star ratings and review counts
- 🎨 **Modern UI**: Clean design with Tailwind CSS
- 🚀 **Fast Performance**: Vite for lightning-fast development and builds

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd electronics-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Footer.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ScrollToTop.jsx
├── context/            # React Context providers
│   ├── CartContext.jsx
│   └── ThemeContext.jsx
├── data/               # Static data and utilities
│   ├── faq.js
│   └── products.js
├── pages/              # Page components
│   ├── About.jsx
│   ├── Cart.jsx
│   ├── Contact.jsx
│   ├── FAQ.jsx
│   ├── Home.jsx
│   ├── ProductDetails.jsx
│   └── Products.jsx
├── App.jsx             # Main app component
├── index.css           # Global styles
└── main.jsx            # App entry point
```

## 🎨 Design System

### Colors
- **Primary**: Blue-gray palette (#0ea5e9)
- **Background**: White/Gray-900 (light/dark)
- **Text**: Gray-900/White (light/dark)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with smooth scrolling

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

## 🛒 Product Data

The website includes 16 sample products across 4 categories:
- **Smartphones**: iPhone 15 Pro, Samsung Galaxy S24, Google Pixel 8, OnePlus 12
- **Laptops**: MacBook Air M3, Dell XPS 13, HP Pavilion 15, Lenovo ThinkPad
- **Audio**: AirPods Pro, Sony WH-1000XM5, JBL Flip 6, Bose QuietComfort
- **Accessories**: Power banks, wireless chargers, cables, mouse

## 🎯 Demo Features

Since this is a showcase website, the following features are demo-only:
- **Cart**: Items persist in localStorage but no real checkout
- **Contact Form**: Form validation but no email sending
- **Search**: Client-side search through product data
- **Filters**: Client-side filtering and sorting
- **User Accounts**: No authentication system

## 🚀 Performance Optimizations

- **Lazy Loading**: Images load on demand
- **Code Splitting**: Route-based code splitting
- **Optimized Images**: Responsive images with proper sizing
- **Minimal Bundle**: Tree-shaking and dead code elimination
- **Fast Refresh**: Hot module replacement during development

## 🌟 Animation Details

- **Page Transitions**: Smooth fade/slide animations
- **Hover Effects**: Scale and shadow effects on interactive elements
- **Loading States**: Skeleton screens and spinners
- **Micro-interactions**: Button clicks, form interactions
- **Scroll Animations**: Elements animate in on scroll

## 🔧 Customization

### Adding New Products
Edit `src/data/products.js` to add new products or categories.

### Changing Theme Colors
Modify `tailwind.config.js` to customize the color palette.

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

## 📄 License

This project is for demonstration purposes. Feel free to use as a template for your own projects.

## 🤝 Contributing

This is a showcase project, but suggestions and improvements are welcome!

---

**Note**: This is a frontend-only showcase website. No backend, payment processing, or user authentication is implemented. All data is static and stored in JavaScript files.