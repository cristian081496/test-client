# Admin Dashboard Frontend

React-based admin interface for monitoring user data and transactions with ZIP file upload capabilities.

## Features

- **Dashboard** with navigation links
- **User Management** with detailed views and avatars
- **Transaction Monitoring** with filtering and sorting
- **ZIP File Upload** for bulk data import
- **Responsive Design** with Tailwind CSS
- **Real-time Data** with React Query caching

## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/cristian081496/test-client.git
   cd test-client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure API endpoint (if needed)
   ```bash
   # Edit src/services/api.js to point to your backend server
   ```

4. Start development server
   ```bash
   npm run dev
   ```

5. Open browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally  
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── UserDetail.jsx
│   │   ├── Transactions.jsx
│   │   └── Upload.jsx
│   ├── hooks/          # Custom React hooks
│   │   └── useUsers.js
│   ├── services/       # API service layer
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
└── package.json
```

## Key Features

### Dashboard
- Navigation to all sections
- Overview of system status

### User Management  
- View all users in a responsive grid
- Click user cards to view detailed profiles
- Display user avatars and basic information
- User-specific transaction history

### Transaction Management
- View all transactions across users
- Sort by timestamp, amount, or user
- Filter by currency or date range

### File Upload System
- Drag-and-drop ZIP file upload
- Automatic processing of user data
- Real-time feedback and error handling
- Supports userData.json, transactions.json, and avatar.png

## API Integration

The frontend communicates with the backend API:

- **GET** `/api/users` - Fetch all users
- **GET** `/api/users/:id` - Fetch user details with transactions  
- **GET** `/api/transactions` - Fetch all transactions
- **POST** `/api/upload` - Upload ZIP file with user data

## Styling

- **Tailwind CSS** for responsive utility-first styling
- **Custom components** with consistent design patterns
- **Dark/light theme** ready (easily customizable)
- **Mobile-first** responsive design approach

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Serve with static file server
npx serve dist
```

The build creates optimized files in the `dist/` directory ready for deployment.

## Development Notes

- Hot module replacement enabled for fast development
- ESLint configured for code quality
- PostCSS with Tailwind CSS for styling
- React Query dev tools available in development mode

## Browser Support

Modern browsers supporting ES2015+ features:
- Chrome 61+
- Firefox 60+ 
- Safari 12+
- Edge 79+

## License

This project is for examination purposes.