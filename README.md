# XFUSE - Strategic Brand Intelligence Platform

A production-ready, single-page React website featuring an interactive 3D experience, persistent AI avatar guide, and comprehensive brand services showcase.

## Features

### Core Experience
- **Single Page Scroll Design**: Smooth scrolling sections with elegant transitions
- **Persistent Avatar Guide**: AI-powered onboarding assistant with smart question flow
- **Interactive 3D Hero**: React Three Fiber-powered plug interaction with light spread animation
- **Global 3D Background**: Performance-optimized animated geometric shapes
- **Smart Conversation Engine**: No-typing philosophy with button-based questions and intelligent department routing

### UI/UX Features
- **Dark/Light Mode**: Full theme system with localStorage persistence
- **RTL Support**: Complete Arabic language support with proper RTL layout
- **Custom Cursor** (Desktop): Interactive cursor with hover effects
- **Special Offer Banner**: Timed appearance (30s) with 24h dismissal memory
- **Quick Action Buttons**: Floating contact, offer, and scroll-to-top buttons
- **Smooth Animations**: Framer Motion powered transitions

### Sections
1. Hero - Interactive 3D plug connection
2. About - Company introduction
3. Vision & Mission - Strategic positioning
4. Services - 6 department services
5. Process - 5-step methodology
6. Team - 5 AI avatars
7. Case Studies - Success stories with metrics
8. Special Offer - Time-limited offer
9. FAQ - Categorized accordion
10. Contact - Consultation booking

## Tech Stack

- **React 18.3** + **Vite 5.4** + **TypeScript 5.6**
- **TailwindCSS 3.4** - Styling
- **React Three Fiber 8.15** - 3D rendering
- **Framer Motion 12.23** - Animations
- **react-i18next 16.5** - Internationalization
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
xfuse-frontend/
├── public/assets/          # Logo and team images
├── src/
│   ├── components/
│   │   ├── 3d/            # Three.js components
│   │   ├── avatar/        # Avatar guide system
│   │   ├── layout/        # Header, footer
│   │   ├── sections/      # Page sections
│   │   └── ui/            # Reusable UI components
│   ├── data/
│   │   ├── types.ts       # TypeScript interfaces
│   │   ├── mock.ts        # Mock data
│   │   └── repository.ts  # Data access layer
│   ├── hooks/             # Custom React hooks
│   ├── locales/           # i18n translations
│   │   ├── en.json
│   │   └── ar.json
│   ├── styles/            # Global styles
│   ├── App.tsx
│   ├── main.tsx
│   └── i18n.ts
```

## Avatar Guide System

The avatar provides a conversational onboarding experience with 5 stages:

**Stage 0: Welcome** - Avatar greets user
**Stage 1: Plug Interaction** - User activates 3D hero
**Stage 2: Connection** - Light spread animation
**Stage 3: Smart Questions** - 3 button-based questions (no typing)
**Stage 4: Insight** - Avatar provides recommendation and CTA
**Stage 5: Free Chat** - Input unlocked with intent routing

### Department Routing

The avatar intelligently routes based on keywords:

- **PR**: reputation, awareness, branding (سمعة, وعي)
- **Media Buyer**: ads, campaign, ROAS (إعلان, حملة)
- **Content**: video, post, tiktok (فيديو, محتوى)
- **Research**: data, market, competitor (بيانات, سوق)
- **Moderator**: community, training (مجتمع, تدريب)

## Backend Integration

Currently uses mock data. Ready for Firestore + Supabase integration:

### Step 1: Install Dependencies

```bash
npm install firebase @supabase/supabase-js
```

### Step 2: Create Config Files

**src/lib/firebase.ts**:
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

**src/lib/supabase.ts**:
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);
```

### Step 3: Update Repository

Replace mock functions in `src/data/repository.ts`:

```typescript
// Before (mock):
export const getTeam = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(team), 500));
};

// After (Firestore):
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getTeam = async (): Promise<TeamMember[]> => {
  const snapshot = await getDocs(collection(db, 'team'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as TeamMember));
};
```

### Firestore Collections

**team**: Team member data
**services**: Service offerings
**caseStudies**: Success stories
**faq**: FAQ items
**specialOffer**: Current offer
**leads**: Consultation bookings

See `src/data/types.ts` for complete schema definitions.

### Supabase Storage

Upload assets to Supabase Storage and update URLs:

```typescript
// Replace local paths:
avatarUrl: '/assets/team/member1.svg'

// With Supabase CDN URLs:
avatarUrl: 'https://[project].supabase.co/storage/v1/object/public/avatars/member1.svg'
```

## Customization

### Brand Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: "#0F94B9",     // Cyan
  secondary: "#114E81",   // Blue
  purple: "#3B096E",      // Deep Purple
  magenta: "#A20870",     // Magenta
  orange: "#F0580E",      // Orange
  dark: "#232D36",
  darker: "#0b0f14"
}
```

### Translations

Edit `src/locales/en.json` and `src/locales/ar.json`.

### Content

Edit `src/data/mock.ts` to update team, services, case studies, FAQ, and special offer.

## Performance

### 3D Optimization
- Instanced meshes (40 particles)
- Adaptive DPR
- Low poly geometry
- Fog for depth
- WebGL fallback to gradient

### Accessibility
- `prefers-reduced-motion` support
- ARIA labels
- Keyboard navigation
- Screen reader friendly

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
npm run build
# Deploy ./dist folder
```

### Environment Variables

Create `.env`:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_project
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_key
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile: iOS Safari 14+, Chrome Android 90+
- WebGL required for 3D (graceful fallback provided)

## License

Proprietary - All rights reserved by XFUSE

---

Built with React + Vite + Three.js
