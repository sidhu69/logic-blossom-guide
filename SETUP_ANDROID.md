# Android Platform Setup Guide

This guide will help you set up the Android platform for your Couples Connect app.

## Prerequisites

Before starting, ensure you have:
- ✅ Installed all npm dependencies (`npm install`)
- ✅ Built the web app at least once (`npx vite build`)

## Step-by-Step Setup

### 1. Add Build Scripts to package.json

Since package.json cannot be edited automatically in this environment, manually add these scripts:

```json
{
  "scripts": {
    "build:mobile": "vite build",
    "cap:sync": "npm run build:mobile && npx cap sync",
    "cap:android": "npm run build:mobile && npx cap sync android && npx cap open android"
  }
}
```

### 2. Build the Web App

```bash
npm run build:mobile
```

This creates the `dist/public` folder that Capacitor needs.

### 3. Add Android Platform

```bash
npx cap add android
```

This generates the `android/` directory with all necessary Android project files.

### 4. Commit the Android Platform

**IMPORTANT:** You must commit the `android/` folder to your repository for GitHub Actions to work:

```bash
git add android/
git commit -m "Add Android platform for Capacitor"
git push origin main
```

### 5. Verify Setup

Check that these files exist:
- ✅ `android/` directory
- ✅ `android/gradlew` file
- ✅ `android/app/` directory
- ✅ `dist/public/` directory (from build)

### 6. Test Local Build (Optional)

Open the project in Android Studio:

```bash
npx cap open android
```

Then build the APK:
- In Android Studio: `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
- The APK will be in `android/app/build/outputs/apk/debug/app-debug.apk`

## GitHub Actions Setup

Once you've committed the `android/` folder:

1. Push to GitHub
2. Go to the "Actions" tab in your repository
3. The "Build Android APK" workflow will run automatically
4. Download the built APK from "Artifacts" when complete

### Manual Workflow Trigger

You can also trigger builds manually:
1. Go to "Actions" tab
2. Select "Build Android APK" workflow
3. Click "Run workflow"
4. Choose the branch and click "Run workflow"

## Troubleshooting

### Issue: "android/ directory not found"
**Solution:** Run `npx cap add android` and commit the folder

### Issue: "Gradle build fails"
**Solution:** 
- Ensure Java JDK 17 is installed
- Run `cd android && ./gradlew clean`
- Re-run `npx cap sync android`

### Issue: "Web assets not found"
**Solution:**
- Ensure `dist/public/` exists
- Run `npm run build:mobile` first
- Verify `capacitor.config.ts` has `webDir: 'dist/public'`

### Issue: GitHub Actions fails
**Solution:**
- Verify `android/` folder is committed
- Check workflow logs in GitHub Actions tab
- Ensure all dependencies are in package.json

## Next Steps

After successful setup:

1. **For Development:**
   - Use `npm run cap:android` to build and open Android Studio
   - Make changes and sync with `npx cap sync android`

2. **For Production:**
   - Set up signing keys (see BUILD.md)
   - Build release APK with `cd android && ./gradlew assembleRelease`
   - Upload to Google Play Store

3. **For Continuous Integration:**
   - Every push to `main` triggers an automated build
   - Download APKs from GitHub Actions artifacts
   - Tag releases to trigger signed builds

## Quick Reference Commands

```bash
# Build web app
npm run build:mobile

# Add Android platform (first time only)
npx cap add android

# Sync changes to Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Clean Gradle cache
cd android && ./gradlew clean

# Build debug APK via Gradle
cd android && ./gradlew assembleDebug

# Build release APK via Gradle
cd android && ./gradlew assembleRelease
```

## Support

If you encounter issues:
1. Check the [BUILD.md](./BUILD.md) file
2. Review Capacitor docs: https://capacitorjs.com/docs/android
3. Check GitHub Actions logs for CI issues
