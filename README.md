# Fastays App

A modern React Native Expo app for flight booking with phone number authentication and OTP verification.

## Features

- Phone number login with OTP verification
- Modern UI with consistent theming
- Redux state management
- Flight listings dashboard
- Properly structured components and utilities

## Project Structure

```
fastays_app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with Redux Provider
│   ├── index.tsx          # Entry point (redirects based on auth)
│   ├── login.tsx          # Login screen
│   ├── otp.tsx            # OTP verification screen
│   └── dashboard.tsx      # Dashboard with flights
├── components/            # Reusable components
│   ├── common/           # Common components (Button, Input, Card)
│   ├── forms/            # Form components (OtpInput)
│   └── flights/          # Flight-related components (FlightCard)
├── store/                # Redux store
│   ├── store.ts          # Store configuration
│   ├── slices/           # Redux slices (authSlice)
│   ├── actions/          # Redux actions (authActions)
│   └── hooks.ts          # Typed Redux hooks
├── themes/               # Theme configuration
│   ├── colors.ts        # Color palette
│   ├── fonts.ts         # Font configuration
│   ├── spacing.ts       # Spacing, borders, shadows
│   └── index.ts         # Theme exports
├── constants/            # App constants
│   └── index.ts         # Constants (OTP config, API endpoints, etc.)
├── types/                # TypeScript types
│   └── index.ts         # Type definitions
├── utils/                # Utility functions
│   └── helpers.ts       # Helper functions
├── data/                 # Static data
│   └── data.json        # Flights data
└── assets/              # Assets
    └── AppIcons/        # App icons
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## Demo Credentials

For testing purposes, use the following credentials:

- **Phone Number**: `9898989898`
- **OTP**: `1234`

## Environment Variables

Create a `.env` file in the root directory (already included):

```env
API_BASE_URL=https://api.example.com
API_VERSION=v1
APP_NAME=Fastays
APP_VERSION=1.0.0
OTP_PHONE=9898989898
OTP_CODE=1234
```

## Features Breakdown

### Authentication Flow

1. **Login Screen**: Enter phone number (9898989898)
2. **OTP Screen**: Enter OTP code (1234)
3. **Dashboard**: View flights from data.json

### Redux State Management

- **Auth Slice**: Manages authentication state (user, phone, OTP, loading, errors)
- **Actions**: Async thunks for login and OTP verification
- **Typed Hooks**: `useAppDispatch` and `useAppSelector` for type-safe Redux usage

### Theming

- Centralized color palette
- Consistent font sizes and weights
- Spacing system
- Shadow definitions
- Border radius values

### Components

- **Button**: Customizable button with variants (primary, secondary, outline)
- **Input**: Text input with label, error, and icon support
- **Card**: Container component with shadow support
- **OtpInput**: 4-digit OTP input with auto-focus
- **FlightCard**: Flight information display card

## Technologies Used

- **Expo**: React Native framework
- **Expo Router**: File-based routing
- **Redux Toolkit**: State management
- **TypeScript**: Type safety
- **React Native**: Mobile app framework

## Development

### Adding New Screens

1. Create a new file in `app/` directory
2. Export a default component
3. Use Expo Router for navigation

### Adding New Redux Slices

1. Create a slice in `store/slices/`
2. Add reducer to `store/store.ts`
3. Create actions in `store/actions/` if needed

### Styling

Use the theme system from `themes/` for consistent styling:

```typescript
import { theme } from '../themes';

// Use theme colors
backgroundColor: theme.colors.primary

// Use theme spacing
padding: theme.spacing.md

// Use theme fonts
fontSize: theme.fontSizes.lg
```