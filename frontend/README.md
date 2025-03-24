# FoodCare Frontend

A modern web application for connecting food donors with receivers, built with React, TypeScript, and Vite.

## Features

- 🍽️ Food listing creation and management
- 👥 User authentication (Donor/Receiver)
- 📱 Responsive design
- 🗺️ Location-based food listings
- 🔄 Real-time status updates
- 📊 Dashboard with statistics
- ⚡ Fast and modern UI with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Axios
- React Router
- Zod (Form validation)

## Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/foodcare.git
   cd foodcare/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── lib/           # Utility functions and API actions
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React context providers
│   └── assets/        # Static assets
├── public/            # Public assets
└── index.html         # Entry HTML file
```

## Key Components

- `Dashboard.tsx` - Main dashboard with statistics and listings
- `CreateListing.tsx` - Form for creating new food listings
- `FoodDetail.tsx` - Detailed view of a food listing
- `Signup.tsx` - User registration
- `Login.tsx` - User authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@foodcare.com or open an issue in the repository.
