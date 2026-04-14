# Blood Bank Management System

A comprehensive blood bank management system built with React, TypeScript, and Tailwind CSS that connects blood donors with hospitals and blood banks to save lives through efficient resource management and emergency response.

## Features

- **Donor Management**: Register and manage blood donors with comprehensive profiles
- **Blood Search**: Find available blood by type and location
- **Hospital Integration**: Connect with hospitals and blood banks
- **Emergency Requests**: 24/7 emergency blood request system
- **User Dashboard**: Personalized dashboard for donors and administrators
- **Authentication**: Secure login and registration system
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Context, React Query
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repository-url>
cd bloodbank-management
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Navbar, Footer)
│   └── ui/             # shadcn/ui components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Admin/          # Admin pages
│   └── Dashboard/      # Dashboard pages
├── services/           # API services
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support and inquiries, please contact the development team.
