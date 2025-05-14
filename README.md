# ClickFix - Electronics E-commerce & Repair Services

ClickFix is a modern web application for an electronics e-commerce business that sells devices and appliances while also offering repair services. The platform provides an intuitive shopping experience alongside a seamless repair service booking system.

## Features

### E-commerce Functionality
- Product catalog with categories (smartphones, laptops, appliances, etc.)
- Advanced product filtering (brand, price range, features, ratings)
- Detailed product pages with specifications, images, and customer reviews
- Shopping cart and checkout process
- User accounts with order history

### Repair Services
- Repair service catalog organized by device type
- Service detail pages explaining repair processes and pricing
- Repair booking system with appointment scheduling
- Option to upload images of damaged devices

### User Experience
- Clean, minimalist design highlighting product imagery
- Mobile-responsive interface
- Persistent navigation with cart status
- Search functionality
- Wishlist functionality

## Tech Stack

- Frontend: React, Tailwind CSS, JavaScript
- Build Tool: Vite
- Backend: Supabase for authentication, database, and storage
- State Management: React Context API
- Routing: React Router

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v7.0.0 or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clickfix.git
cd clickfix
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
clickfix/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   │   ├── layout/     # Layout components (Navbar, Footer, etc.)
│   │   ├── products/   # Product-related components
│   │   └── repairs/    # Repair service-related components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions, API clients, etc.
│   ├── pages/          # Page components
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env.local          # Environment variables (not in repo)
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Project dependencies and scripts
```

## Deployment

1. Build the production version:
```bash
npm run build
```

2. The built files will be in the `dist` directory, which can be deployed to any static hosting service (Netlify, Vercel, etc.).

## Setting Up Supabase

1. Create a Supabase account and project at [supabase.com](https://supabase.com).

2. Set up the following tables in your Supabase database:
   - users (managed by Supabase Auth)
   - products
   - categories
   - orders
   - order_items
   - repair_services
   - repair_bookings

3. Enable Row-Level Security (RLS) for your tables and configure appropriate policies.

4. Update the `.env.local` file with your Supabase URL and anon key.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [React Router](https://reactrouter.com/)
- [date-fns](https://date-fns.org/)
- [React Icons](https://react-icons.github.io/react-icons/) 