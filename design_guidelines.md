# Design Guidelines: Couples Connection App

## Design Approach
**Reference-Based Approach**: Drawing inspiration from successful social and couples apps including Instagram (visual polish), WhatsApp (chat simplicity), Between (couple-focused design), and Discord (rich media chat). The design prioritizes emotional connection, playfulness, and intimate user experience.

## Core Design Principles
1. **Intimate & Playful**: Warm, inviting design that celebrates relationships
2. **Clean Chat Focus**: Messaging is the heart - keep it distraction-free
3. **Gamified Engagement**: Visual rewards for couple activities and ranking achievements
4. **Mobile-First**: Optimized for Android thumb zones and one-handed use

---

## Color Palette

### Light Mode
- **Primary Brand**: 340 82% 58% (Romantic Pink-Red)
- **Secondary**: 280 65% 60% (Soft Purple - for accents)
- **Background**: 0 0% 98% (Soft White)
- **Surface**: 0 0% 100% (Pure White)
- **Text Primary**: 220 20% 15% (Dark Charcoal)
- **Text Secondary**: 220 15% 45% (Medium Gray)
- **Success/Active**: 150 70% 45% (Vibrant Green for online status)
- **Border**: 220 15% 90% (Light Gray)

### Dark Mode
- **Primary Brand**: 340 75% 65% (Lighter Pink-Red)
- **Secondary**: 280 60% 70% (Lighter Purple)
- **Background**: 220 20% 12% (Deep Dark Blue-Gray)
- **Surface**: 220 18% 16% (Slightly Lighter Dark)
- **Text Primary**: 0 0% 95% (Off White)
- **Text Secondary**: 220 10% 65% (Light Gray)
- **Success/Active**: 150 65% 55% (Brighter Green)
- **Border**: 220 15% 25% (Dark Gray)

### Ranking/Achievement Colors
- **Gold (1st)**: 45 100% 55%
- **Silver (2nd)**: 0 0% 70%
- **Bronze (3rd)**: 30 75% 50%

---

## Typography

### Font Families
- **Primary (UI/Body)**: Inter, system-ui, -apple-system, sans-serif
- **Display/Headers**: Poppins, Inter, sans-serif (slightly more playful)

### Scale & Weights
- **Hero/Large Display**: text-4xl md:text-5xl, font-bold (700)
- **Page Titles**: text-2xl md:text-3xl, font-semibold (600)
- **Section Headers**: text-xl, font-semibold (600)
- **Chat Messages**: text-base, font-normal (400)
- **Small Labels**: text-sm, font-medium (500)
- **Micro Text**: text-xs, font-normal (400)

---

## Layout System

### Spacing Primitives
Core spacing units: **2, 3, 4, 6, 8, 12, 16** (Tailwind units)
- Tight spacing: p-2, gap-2 (components, icons)
- Standard spacing: p-4, gap-4 (cards, list items)
- Comfortable spacing: p-6, gap-6 (sections)
- Generous spacing: p-8 to p-16 (page-level spacing)

### Grid & Container
- **Mobile**: Single column, full-width with px-4 padding
- **Chat View**: Full-screen experience, max-h-screen layout
- **Ranking List**: Grid-cols-1, cards with gap-3

---

## Component Library

### Authentication & Onboarding
- **Login/Signup Cards**: Centered card (max-w-md), rounded-2xl, soft shadow, p-8
- **Profile Upload**: Large circular avatar preview (w-32 h-32), dashed border upload zone
- **Input Fields**: rounded-lg, border-2, focus ring with primary color, h-12 minimum
- **Primary Buttons**: rounded-full, h-12, px-8, bold text, primary gradient background
- **Social Buttons**: rounded-lg, border variant with icon + text

### Space Creation/Joining
- **Code Display Card**: Large monospace code, rounded-xl background surface, copy button with haptic feedback
- **Code Input**: Segmented input style (6 characters), large touch targets
- **Options Cards**: Two equal-width cards, icon at top, descriptive text, hover lift effect

### Chat Interface
- **Message Bubbles**: 
  - Sent: Primary color, rounded-3xl (rounded-br-md for tail effect), max-w-[75%], ml-auto
  - Received: Surface color, rounded-3xl (rounded-bl-md for tail), max-w-[75%], mr-auto
  - Photo messages: Rounded-2xl, aspect-ratio preservation
- **Input Bar**: Fixed bottom, Surface background, rounded-t-3xl, flex layout, h-14, multiple action buttons
- **Action Buttons (Photo/Camera/Games)**: Icon buttons, w-10 h-10, rounded-full, ripple effect
- **Feature Tiles (Games/Media)**: Grid layout, rounded-2xl cards, icon + label, colorful backgrounds

### Games & Activities
- **Tic-Tac-Toe**: 3x3 grid, large touch targets (min h-20), animated X/O symbols, primary/secondary colors
- **Bingo**: 5x5 grid, number cells with mark animation, responsive sizing
- **Truth or Dare**: Card flip animation, randomized questions, swipe gestures
- **Video Player**: Full-width synchronized player, custom controls, playback status indicators
- **Music Player**: Bottom sheet player, album art, playback controls, progress bar

### Ranking System
- **Rank Cards**: 
  - Top 3: Special styling with gold/silver/bronze gradients, larger size
  - Others: Standard surface cards, couple avatars side-by-side, points display
  - Layout: Avatar pair (overlap effect) | Names | Points | Trophy icon
- **Tabs**: Segmented control for Daily/Weekly/Monthly/Annually, sticky header
- **Trophy Button**: Floating action button (FAB) in chat when eligible, pulse animation
- **Prize Display**: Banner at top showing prize amount, countdown timer to reset

### Admin Dashboard
- **Login**: Simple centered form, professional minimal design
- **Prize Editor**: 
  - Card-based layout for each time period
  - Input fields with currency symbol prefix
  - Large save button with confirmation
  - Preview of current prize amounts
- **Stats Display**: Basic metrics cards (total couples, active today, etc.)

### Navigation
- **Bottom Tab Bar** (post-pairing): Home (Chat) | Ranking | Profile
- **Top App Bar** (in chat): Couple avatars overlap icon, couple name, video call icon
- **Profile Header**: Couple banner with both profile pictures, connection date, activity stats

---

## Visual Elements & Patterns

### Avatars & Photos
- **Single Avatar**: Circular, border-2 primary color for active users
- **Couple Avatars**: Overlapping circles (translate-x-3), ring-2 on hover
- **Photo Grid**: Masonry or equal-height grid, rounded-lg, gap-2

### Status Indicators
- **Online Status**: Small green dot (w-3 h-3) on avatar, positioned bottom-right
- **Typing Indicator**: Three bouncing dots animation in chat
- **Activity Points**: Animated counter with '+' increments

### Animations
- **Micro-interactions**: Button press scale (scale-95), subtle bounces
- **Transitions**: Smooth page transitions (150-200ms), slide-up modals
- **Loading States**: Skeleton screens for ranking lists, spinner for sync operations
- **Achievement**: Confetti or sparkle effect when winning a rank

### Empty States
- **No Messages**: Illustration + "Start your journey together" text
- **Ranking**: "Be the first couple!" encouragement with point system explanation

---

## Images

### Hero/Onboarding Screens
- **Welcome Screen**: Abstract couple illustration or heart-connected line art, gradient overlay, positioned top-center
- **Onboarding Slides**: Colorful illustrations showing app features (chat, games, ranking), playful couple characters

### In-App Imagery
- **Profile Placeholders**: Soft gradient circles with initials
- **Feature Icons**: Use Hero Icons for standard actions (photo, video, etc.), custom SVG for unique features (games icons)
- **Ranking Trophies**: Gold/Silver/Bronze trophy icons, premium feel
- **Game Assets**: Simple, clean game pieces (X/O symbols, bingo markers) with primary/secondary colors

No large hero images in main app screens - focus is on functionality and content.

---

## Interaction Patterns
- **Swipe Gestures**: Swipe between ranking tabs, swipe up for media picker
- **Long Press**: Long-press message for options (delete, copy)
- **Pull to Refresh**: Ranking list updates
- **Haptic Feedback**: Button presses, successful actions, achievement unlocks
- **Instant Feedback**: Optimistic UI updates before server confirmation