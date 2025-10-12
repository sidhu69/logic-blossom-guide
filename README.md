# Couples Connect 💕

A mobile app for couples to stay connected through chat, games, and shared activities. Compete with other couples on the leaderboard and win prizes!

## Features

### 🔐 Authentication & Onboarding
- User signup and login
- Profile setup with photo upload
- Space creation with unique codes
- Partner connection system

### 💬 Real-time Chat
- Text messaging between couples
- Photo sharing
- Camera integration
- Message history

### 🎮 Interactive Games
- **Tic-Tac-Toe**: Classic X and O game
- **Bingo**: 5x5 number grid game
- **Truth or Dare**: Relationship challenges

### 🎵 Media Features
- Music search and playback (planned)
- Watch videos together from local gallery (planned)
- Synchronized media controls (planned)

### 🏆 Ranking System
- **Daily Rankings**: Reset at 12:00 AM
- **Weekly Rankings**: Track weekly performance
- **Monthly Rankings**: Monthly leaderboards
- **Annual Rankings**: Yearly champions

**Points System:**
- 100 minutes = 100 points
- Real-time point tracking
- Top 50 couples displayed
- Prize winners announced

### 💰 Prize System
- Cash prizes for top couples
- Instagram-based prize claiming
- Admin-configurable prize amounts
- Daily, weekly, monthly, and annual prizes

### 👨‍💼 Admin Dashboard
- Secure admin login (Anshhadmin@gmail.com / anshadmin)
- Configure prize amounts
- View app statistics
- Manage couple rankings

## Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Wouter** for routing
- **TanStack Query** for data fetching
- **Capacitor** for mobile builds

### Backend
- **Express.js** server
- **Supabase** for database and real-time features (planned)
- **WebSocket** for live updates (planned)

### Mobile
- **Capacitor** for Android builds
- **GitHub Actions** for automated APK building

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Android Studio (for local APK builds)
- Java JDK 17

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd couples-connect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_supabase_database_url
   SESSION_SECRET=your_session_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the app:**
   Open http://localhost:5000 in your browser

## Building for Android

See [BUILD.md](./BUILD.md) for detailed build instructions.

### Quick Build

1. **Add build scripts to package.json:**
   ```json
   {
     "scripts": {
       "build:mobile": "vite build",
       "cap:sync": "npm run build:mobile && npx cap sync",
       "cap:android": "npm run build:mobile && npx cap sync android && npx cap open android"
     }
   }
   ```

2. **Build and sync:**
   ```bash
   npm run build:mobile
   npx cap add android  # First time only - commit the android/ folder!
   npx cap sync android
   npx cap open android # Opens Android Studio
   ```
   
   **Important:** After `npx cap add android`, commit the generated `android/` directory to your repository. This is required for GitHub Actions to work.

3. **Build APK in Android Studio:**
   - Go to `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`

### Automated Builds with GitHub Actions

The repository includes a GitHub Actions workflow that automatically builds the Android APK:

1. Push your code to GitHub
2. Go to the "Actions" tab
3. The workflow runs automatically on push to `main`
4. Download the APK from "Artifacts"

## Project Structure

```
couples-connect/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities and configs
│   └── index.html
├── server/                # Backend Express server
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data storage interface
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts
├── .github/
│   └── workflows/
│       └── android-build.yml  # APK build automation
├── capacitor.config.ts   # Capacitor configuration
├── BUILD.md             # Build instructions
└── README.md
```

## Environment Setup

### Required Secrets

For local development:
- `DATABASE_URL`: Supabase database connection string
- `SESSION_SECRET`: Secret for session encryption

For GitHub Actions (to be added as repository secrets):
- `DATABASE_URL`: Production database URL
- Any other production secrets

## Deployment

### Web Deployment
The app can be deployed to any Node.js hosting platform:
- Replit
- Vercel
- Railway
- Render
- Heroku

### Mobile Deployment
1. Build the release APK (see BUILD.md)
2. Sign the APK with your keystore
3. Upload to Google Play Store

## Admin Access

**Admin Login:**
- Email: `Anshhadmin@gmail.com`
- Password: `anshadmin`

**Admin Features:**
- Configure daily prize amount
- Configure weekly prize amount
- Configure monthly prize amount
- Configure annual prize amount
- View app statistics

## Features Roadmap

- [ ] Real-time chat with Supabase
- [ ] Video/Voice calling
- [ ] Music streaming integration
- [ ] YouTube watch party
- [ ] Ad network integration
- [ ] Push notifications
- [ ] Couple profiles and themes
- [ ] More mini-games
- [ ] Activity analytics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: your-email@example.com

## Acknowledgments

- Built with ❤️ for couples around the world
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

Made with 💕 by [Your Name]
