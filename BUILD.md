# Build Instructions

## Required Build Scripts

Since `package.json` cannot be directly modified in this environment, you'll need to manually add these scripts to your `package.json` file after cloning the repository:

```json
{
  "scripts": {
    "build:mobile": "vite build",
    "cap:sync": "npm run build:mobile && npx cap sync",
    "cap:android": "npm run build:mobile && npx cap sync android && npx cap open android"
  }
}
```

## Building the Android APK

### Prerequisites

1. **Node.js** (v20 or higher)
2. **Android Studio** (for local builds)
3. **Java JDK 17** (required by Capacitor)
4. **Git** (to clone the repository)

### Local Build Steps

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd <repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add the build scripts** mentioned above to your `package.json`

4. **Build the web app:**
   ```bash
   npm run build:mobile
   # Or manually: npx vite build
   ```

5. **Initialize Capacitor Android (first time only):**
   ```bash
   npx cap add android
   ```
   
   **Important:** After running this command, commit the `android/` directory to your repository. This is required for GitHub Actions to build the APK automatically.

6. **Sync Capacitor:**
   ```bash
   npx cap sync android
   ```

7. **Open in Android Studio:**
   ```bash
   npx cap open android
   ```

8. **Build APK in Android Studio:**
   - In Android Studio, go to `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`
   - The APK will be generated in `android/app/build/outputs/apk/debug/`

### Using GitHub Actions (Automated)

The repository includes a GitHub Actions workflow (`.github/workflows/android-build.yml`) that automatically builds the APK when you push to the main branch.

**Important Prerequisites:**
- The `android/` platform directory must exist in your repository
- Run `npx cap add android` locally and commit the generated `android/` folder
- The workflow will automatically create the platform if it doesn't exist, but it's recommended to commit it

**To use the automated build:**

1. Initialize Android platform (first time):
   ```bash
   npx cap add android
   git add android/
   git commit -m "Add Android platform"
   ```

2. Push your code to GitHub
3. Go to the "Actions" tab in your GitHub repository
4. The workflow will run automatically
5. Once complete, download the APK from the "Artifacts" section

**To trigger a manual build:**
- Go to "Actions" tab
- Click on "Build Android APK" workflow
- Click "Run workflow"

### Building a Release APK

For a production release:

1. **Create a keystore** (first time only):
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure signing** in `android/app/build.gradle`:
   ```gradle
   android {
       ...
       signingConfigs {
           release {
               storeFile file("path/to/my-release-key.keystore")
               storePassword "your-password"
               keyAlias "my-key-alias"
               keyPassword "your-password"
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               ...
           }
       }
   }
   ```

3. **Build release APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

The release APK will be in `android/app/build/outputs/apk/release/`

## Troubleshooting

### Common Issues

1. **Gradle build fails:**
   - Ensure Java JDK 17 is installed
   - Run `./gradlew clean` in the android folder

2. **Capacitor sync fails:**
   - Check that `webDir` in `capacitor.config.ts` points to the correct build output directory
   - Default is `dist/public`

3. **Android SDK not found:**
   - Install Android Studio
   - Set `ANDROID_HOME` environment variable

4. **Build artifacts not found:**
   - Ensure the web app builds successfully first: `npm run build:mobile`
   - Check the `dist/public` directory exists

## Notes

- The debug APK is suitable for testing
- For production, always use a signed release APK
- The GitHub Actions workflow builds both debug and release APKs
- Release APKs on GitHub Actions are unsigned by default (you need to add signing keys as secrets)
