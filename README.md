# ⚡ Esports Tracker

A clean, dark-themed esports dashboard built with **Next.js 16** and **Tailwind CSS v4**.
Track live matches, follow players, browse leaderboards, and manage your account.

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 20.x |
| npm / yarn / pnpm | Latest |
| MongoDB | >= 6.x (local or Atlas) |

### 1. Clone the repo

```bash
git clone https://github.com/your-org/esports-tracker.git
cd esports-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/esports-tracker

# JWT secret (generate a strong random string)
JWT_SECRET=your_super_secret_key_here

# App base URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> Tip: Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free hosted database.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
esports-tracker/
│
├── app/                        
│   ├── layout.tsx              
│   ├── globals.css             
│   ├── page.tsx                
│   ├── login/
│   │   └── page.tsx           
│   └── signup/
│       └── page.tsx            
│
├── components/                 
    ├── Navbar.tsx              
    ├── HeroStats.tsx           
    ├── PlayerSearch.tsx       
    ├── GameFilter.tsx         
    ├── LiveMatches.tsx         
    ├── Leaderboard.tsx         
    └── RecentResults.tsx       

               

```

---

## 🗂️ Key Pages

| Route | Description |
|-------|-------------|
| `/` | Main dashboard — stats, player search, live matches, leaderboard |
| `/login` | Email + password sign in |
| `/signup` | Register with username, email, password |

---

## 🧩 Components Overview

**PlayerSearch** — Full-text search across players, teams, and games. Keyboard shortcut `⌘K` / `Ctrl+K`. Track/untrack with cyan pill tags.

**LiveMatches** — Filterable by game. Shows team tags, scores, map, tournament with a pulsing LIVE badge.

**Leaderboard** — Top 8 teams globally with W–L, points, and trend indicators. Gold/silver/bronze for top 3.

**HeroStats** — Live match count, active players, tournaments, prize pool — animated on entry.

---

## 👤 User Model

```typescript
// types/user.ts
export interface IUser {
  username: string;       // Unique, 3–24 chars
  email: string;          // Unique, lowercase, validated
  password: string;       // Min 8 chars — select: false (never returned by default)
  favorites: ObjectId[];  // Tracked player references
}
```

Schema extras: `timestamps: true` (auto `createdAt`/`updatedAt`), password excluded from queries via `select: false`.

---

## 🔐 Auth Flow

The signup/login pages call these API routes (you wire them up):

```
POST /api/auth/signup  →  Validate → Hash password (bcrypt) → Save User → Return JWT
POST /api/auth/login   →  Find user → Compare hash → Return JWT
```

Recommended packages:

```bash
npm install bcryptjs jsonwebtoken mongoose
npm install -D @types/bcryptjs @types/jsonwebtoken
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#080A0F` |
| Surface | `#0D1017` |
| Accent Cyan | `#00E5FF` |
| Success | `#00E676` |
| Danger | `#FF3B5C` |
| Warning | `#FFB300` |
| Text muted | `#5A6478` |
| Border | `#1A2030` |

**Fonts:** Barlow + Barlow Condensed (Google Fonts CDN)
**Icons:** lucide-static + simple-icons (jsDelivr CDN — no SVG files)

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| Icons | lucide-static + simple-icons (CDN) |
| Fonts | Barlow / Barlow Condensed |

---

## 🛠️ Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Run production build
npm run lint     # ESLint check
```

---

## 📝 License

MIT