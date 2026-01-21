# ServiceHub - Home Services Marketplace

A modern, production-ready frontend for a home services marketplace built with Next.js 14, React, and Tailwind CSS.

![ServiceHub](https://via.placeholder.com/1200x630/1a1a1a/ed751c?text=ServiceHub)

## 🎨 Design Philosophy

ServiceHub features a **"Desert Sunset"** aesthetic with warm earthy tones, combining:
- **Primary**: Warm orange (#ed751c) for CTAs and highlights
- **Secondary**: Sage green (#539556) for success states and accents
- **Neutral**: Rich charcoal and cream for text and backgrounds

Typography uses elegant serif (`Cormorant Garamond`) for headings and clean sans-serif (`DM Sans`) for body text.

## 📁 Project Structure

```
servicehub/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/
│   │   │   ├── login/         # Login page
│   │   │   └── register/      # Registration page
│   │   ├── categories/        # Service categories listing
│   │   ├── dashboard/         # User dashboard
│   │   ├── masters/
│   │   │   └── [id]/          # Master profile page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.js          # Root layout
│   │   └── page.js            # Home page
│   │
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Empty.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── Select.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── home/              # Home page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── CategoriesSection.jsx
│   │   │   ├── HowItWorksSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── CTASection.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── masters/           # Master/Pro components
│   │   │   ├── MasterCard.jsx
│   │   │   ├── PortfolioCard.jsx
│   │   │   ├── JobRequestForm.jsx
│   │   │   ├── ImageUploader.jsx
│   │   │   └── index.js
│   │   │
│   │   └── dashboard/         # Dashboard components
│   │       ├── JobRequestCard.jsx
│   │       ├── NotificationItem.jsx
│   │       └── index.js
│   │
│   ├── context/
│   │   └── AuthContext.js     # Authentication context
│   │
│   ├── hooks/
│   │   └── index.js           # Custom React hooks
│   │
│   └── lib/
│       ├── api.js             # API client
│       ├── constants.js       # App constants
│       └── utils.js           # Utility functions
│
├── public/
│   └── images/                # Static images
│
├── tailwind.config.js         # Tailwind configuration
├── next.config.js             # Next.js configuration
└── package.json
```

## 🚀 Features

### Pages

1. **Home Page** (`/`)
   - Hero section with search
   - Category cards (asymmetric grid)
   - How it works (3-step process)
   - Testimonials carousel
   - CTA section

2. **Categories Page** (`/categories`)
   - Filter by search, category, region
   - Sort options (rating, experience, etc.)
   - Master cards grid
   - Empty/loading states

3. **Master Profile** (`/masters/[id]`)
   - Full profile with stats
   - Portfolio gallery with image preview
   - Reviews section
   - About section
   - Job request form

4. **Authentication** (`/auth/login`, `/auth/register`)
   - Role selection (User/Master)
   - Form validation
   - Social login buttons (UI only)

5. **Dashboard** (`/dashboard`)
   - Role-based content
   - Job requests management
   - Notifications
   - Profile completion

### Components

- **UI Kit**: Button, Input, Select, Card, Avatar, Badge, Rating, Modal, Loading states
- **Reusable**: All components are composable and customizable
- **Accessible**: Proper ARIA labels, keyboard navigation
- **Responsive**: Mobile-first design

## 🔌 API Integration

The app expects a REST API with the following endpoints:

```
AUTH
├── POST /api/auth/login
└── POST /api/auth/register

USERS
├── GET  /api/users
└── GET  /api/users/:id/full-info

CATEGORIES
├── GET  /api/categories
└── GET  /api/categories/active-workers

PORTFOLIOS
├── GET  /api/portfolios
└── GET  /api/portfolios/:id

PORTFOLIO IMAGES
├── GET  /api/portfolio-images?portfolio_id=:id
└── POST /api/portfolio-images/upload

COMMENTS
└── GET  /api/comments/:portfolioId

JOB REQUESTS
├── POST  /api/job-requests
├── GET   /api/job-requests/my
├── PATCH /api/job-requests/:id/accept
└── PATCH /api/job-requests/:id/reject

NOTIFICATIONS
└── GET /api/notifications
```

## 🛠 Installation

```bash
# Clone the repository
git clone <repo-url>
cd servicehub

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Key Design Decisions

### 1. App Router (Next.js 14)
Using the new App Router for better layouts, loading states, and server components support.

### 2. Client Components for Interactivity
Most pages use `'use client'` for rich interactivity while keeping layout as Server Components.

### 3. Context for Auth
Single AuthContext provides user state and authentication methods across the app.

### 4. Custom Hooks
Reusable hooks for data fetching, forms, debouncing, media queries, etc.

### 5. Tailwind + Custom Design System
Extended Tailwind with custom colors, typography, shadows, and animations.

## 🔐 Role-Based Access

| Feature | USER | MASTER | ADMIN |
|---------|------|--------|-------|
| View profiles | ✅ | ✅ | ✅ |
| Submit job requests | ✅ | ❌ | ❌ |
| Accept/Reject jobs | ❌ | ✅ | ✅ |
| Upload portfolio images | ❌ | ❌ | ✅ |
| Manage categories | ❌ | ❌ | ✅ |

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1023px
- Desktop: 1024px+

## 🎨 Color Palette

```css
/* Primary - Desert Orange */
--primary-500: #ed751c;

/* Secondary - Sage Green */
--sage-500: #539556;

/* Neutrals */
--charcoal-950: #1a1a1a;
--charcoal-500: #6d6d6d;
--cream-50: #fefdfb;
```

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ using Next.js, React, and Tailwind CSS
