# The Wild Oasis 🏔️

A luxury cabin rental website built with Next.js, featuring a modern booking system for mountain retreats in the Italian Dolomites.

> **⚠️ Disclaimer**: This is a personal project for learning and portfolio purposes only. The Wild Oasis is not a real business or actual place. This project was created to demonstrate full-stack web development skills using modern technologies. Based off Udemy tutorial Ultimate React by Jonas Schmedtman.

### Key Features
- **Luxury Cabin Rentals**: Browse and book from a selection of premium mountain cabins
- **Smart Booking System**: Real-time availability checking and reservation management
- **User Accounts**: Personal profiles and reservation history


## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.0** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework with custom color scheme
- **Lucide React** - Beautiful icon library
- **Heroicons** - Additional icon components

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL database
- **Real-time subscriptions** - Live data updates
- **Authentication** - Built-in user management
- **Row Level Security** - Data protection

### Additional Libraries
- **date-fns** - Date manipulation and formatting
- **react-day-picker** - Advanced date selection components

## 📁 Project Structure

```
app/
├── _components/          # Reusable UI components
│   ├── CabinCard.tsx     # Individual cabin display
│   ├── CabinList.tsx     # Cabin grid with filtering
│   ├── ReservationForm.tsx # Booking form
│   ├── ReservationCard.tsx # Reservation display
│   └── ...
├── _context/             # React context providers
│   └── ReservationContext.tsx
├── _lib/                 # Utility functions and configurations
│   ├── data-service.ts   # Supabase API calls
│   ├── supabase.ts       # Supabase client setup
│   └── types.ts          # TypeScript type definitions
├── _styles/              # Global styles
│   └── globals.css
├── (home)/               # Home page route group
├── about/                # About page
├── account/              # User account pages
│   ├── profile/          # User profile management
│   └── reservations/     # Booking history
├── api/                  # API routes
│   └── cabins/[cabinId]/ # Cabin-specific API endpoints
├── cabins/               # Cabin listing and details
│   └── [cabinId]/        # Individual cabin pages
└── layout.tsx            # Root layout component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-wild-oasis-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Database Schema

### Tables

#### `cabins`
- `id` (number) - Primary key
- `name` (string) - Cabin name
- `max_capacity` (number) - Maximum guests
- `regular_price` (number) - Base price per night
- `discount` (number) - Discount percentage
- `image` (string) - Image URL
- `description` (string) - Cabin description

#### `guests`
- `id` (number) - Primary key
- `email` (string) - Unique email address
- `full_name` (string) - Guest's full name
- `national_id` (string) - National ID number
- `nationality` (string) - Guest's nationality
- `country_flag` (string) - Country flag emoji

#### `bookings`
- `id` (number) - Primary key
- `created_at` (timestamp) - Booking creation date
- `start_date` (date) - Check-in date
- `end_date` (date) - Check-out date
- `number_nights` (number) - Duration in nights
- `number_guests` (number) - Number of guests
- `total_price` (number) - Total booking cost
- `guest_id` (number) - Foreign key to guests
- `cabin_id` (number) - Foreign key to cabins
- `status` (string) - Booking status

#### `settings`
- `id` (number) - Primary key
- `min_booking_length` (number) - Minimum stay duration
- `max_booking_length` (number) - Maximum stay duration
- `max_guests_per_booking` (number) - Guest limit
- `breakfast_price` (number) - Breakfast add-on price

## 📄 Design System

### Color Palette
The application uses a carefully crafted color scheme inspired by mountain landscapes:

- **Primary Colors**: Cool blues and grays representing mountain skies and stone
- **Accent Colors**: Warm earth tones representing wood and natural elements

### Typography
- **Font**: Josefin Sans (Google Fonts)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold)

### Components
- **Responsive Grid System**: Tailwind CSS grid utilities
- **Interactive Elements**: Hover states and transitions
- **Image Optimization**: Next.js Image component with blur placeholders
- **Loading States**: Spinner components and skeleton screens

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Organization
- **Components**: Reusable UI elements in `_components/`
- **Pages**: Route-based pages in the app directory
- **Types**: Centralized TypeScript definitions in `_lib/types.ts`
- **API Layer**: Supabase integration in `_lib/data-service.ts`
- **Styling**: Global styles and Tailwind configuration

### Key Features Implementation
- **Server Components**: Leveraging Next.js App Router for optimal performance
- **Type Safety**: Comprehensive TypeScript coverage
- **Error Handling**: Graceful error boundaries and fallbacks
- **Performance**: Image optimization and code splitting
- **Accessibility**: Semantic HTML and keyboard navigation

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Ensure all required environment variables are set in your production environment:
- `SUPABASE_URL`
- `SUPABASE_KEY`

### Recommended Platforms
- **Vercel** - Optimized for Next.js applications
- **Netlify** - Alternative deployment platform
- **Railway** - Full-stack deployment with database

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Include proper error handling
- Add comments for complex logic

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Payment integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Mobile app
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Guest reviews and ratings






