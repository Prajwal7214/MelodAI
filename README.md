# 🎵 MelodAI
### AI-Based Music Composition + Recommendation System

<div align="center">

![MelodAI Banner](https://img.shields.io/badge/MelodAI-AI%20Music%20Platform-8B5CF6?style=for-the-badge&logo=music&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel)](https://melod-ai.vercel.app)
[![Backend API](https://img.shields.io/badge/🔌%20Backend%20API-Render-46E3B7?style=for-the-badge&logo=render)](https://melodai-lvjv.onrender.com/api/test-api/)
[![MongoDB](https://img.shields.io/badge/🗄️%20Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=flat&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-6.0-092E20?style=flat&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

</div>

---

## 📌 About The Project

**MelodAI** is a full-stack AI-powered music composition and recommendation system built as a Final Year Project. It understands your emotional state and generates personalized music experiences — combining AI music generation with real song recommendations from iTunes.

> *"Feel the Music Your Mood Deserves"*

### What Makes MelodAI Special:
- 🤖 **AI Music Generation** — Generates unique track descriptions based on mood + context using MelodAI Engine v1.0
- 🎧 **Real Song Recommendations** — Fetches 10 real songs from iTunes API matched to your emotion
- 🎵 **Built-in Music Player** — Full-featured player with play, pause, skip, volume, seek
- 💾 **Cloud History** — All sessions auto-saved to MongoDB Atlas
- ❤️ **Favourites System** — Heart songs and access them anytime
- 🔐 **Authentication** — Login/Signup with protected routes
- 📱 **Mobile Responsive** — Works perfectly on all devices

---

## 🌐 Live Links

| Service | URL | Platform |
|---|---|---|
| 🌐 Frontend | https://melod-ai.vercel.app | Vercel |
| 🔌 Backend API | https://melodai-lvjv.onrender.com | Render |
| 🗄️ Database | MongoDB Atlas Cloud | Atlas |

> ⚠️ Backend is on Render free tier — first request after 15 min inactivity takes ~30 seconds to wake up.

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.13 | Programming Language |
| Django | 6.0 | Web Framework |
| Django REST Framework | Latest | REST API |
| PyMongo | Latest | MongoDB Connection |
| Django CORS Headers | Latest | Cross-Origin Requests |
| Gunicorn | Latest | Production Server |
| Whitenoise | Latest | Static Files |
| Requests | Latest | HTTP calls to iTunes |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI Framework |
| Vite | Latest | Build Tool |
| Tailwind CSS | Latest | Styling |
| Framer Motion | Latest | Animations |
| Axios | Latest | HTTP Client |
| React Router DOM | v6 | Routing |
| Lucide React | Latest | Icons |

### Database & Cloud
| Service | Purpose |
|---|---|
| MongoDB Atlas | Cloud Database |
| iTunes Search API | Real Song Data |
| Render | Backend Hosting |
| Vercel | Frontend Hosting |

---

## 📁 Project Structure

```
melodai/
│
├── 📁 backend/                        ← Django REST API
│   ├── melodai_project/
│   │   ├── __init__.py
│   │   ├── settings.py                ← Django config + CORS
│   │   ├── urls.py                    ← Main URL router
│   │   ├── wsgi.py                    ← WSGI server entry
│   │   ├── mongo.py                   ← MongoDB Atlas connection
│   │   ├── spotify.py                 ← iTunes API integration
│   │   └── music_generator.py         ← AI music engine
│   ├── music/
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── views.py                   ← All API logic
│   │   └── urls.py                    ← API endpoints
│   ├── venv/                          ← Virtual environment
│   ├── build.sh                       ← Render build script
│   ├── manage.py
│   └── requirements.txt
│
├── 📁 frontend/                       ← React Application
│   ├── public/
│   │   └── frames/                    ← Headphone animation frames
│   ├── src/
│   │   ├── api/
│   │   │   └── melodai.js             ← All API calls
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── music/
│   │   │   │   ├── MusicPlayer.jsx    ← Persistent bottom player
│   │   │   │   ├── SongCard.jsx
│   │   │   │   ├── SongGrid.jsx
│   │   │   │   ├── MoodPicker.jsx
│   │   │   │   ├── WaveformVisualizer.jsx
│   │   │   │   └── AITrackCard.jsx
│   │   │   ├── sections/              ← Homepage sections
│   │   │   ├── history/
│   │   │   ├── auth/
│   │   │   └── common/
│   │   ├── context/
│   │   │   ├── PlayerContext.jsx      ← Global music state
│   │   │   └── AuthContext.jsx        ← Global auth state
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── GenerateMusic.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Favourites.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Settings.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.production
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── 📁 docs/                           ← Documentation
│   ├── README.md
│   └── MelodAI.final.pptx
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB Atlas account (free)
- Git

---

### 🔧 Backend Setup

**Step 1 — Clone the repository:**
```bash
git clone https://github.com/Prajwal7214/MelodAI.git
cd MelodAI
```

**Step 2 — Navigate to backend:**
```bash
cd backend
```

**Step 3 — Create and activate virtual environment:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

**Step 4 — Install dependencies:**
```bash
pip install -r requirements.txt
```

**Step 5 — Run the server:**
```bash
python manage.py runserver
```

Backend running at → `http://127.0.0.1:8000`

Verify:
```
http://127.0.0.1:8000/api/test-api/
→ {"message": "Backend working successfully"}
```

---

### 🎨 Frontend Setup

**Step 1 — Navigate to frontend:**
```bash
cd frontend
```

**Step 2 — Install dependencies:**
```bash
npm install
```

**Step 3 — Create `.env.development`:**
```
VITE_API_URL=http://127.0.0.1:8000
```

**Step 4 — Start dev server:**
```bash
npm run dev
```

Frontend running at → `http://localhost:5173`

---

### ▶️ Running Both Together

```bash
# Terminal 1 — Backend
cd backend
venv\Scripts\activate
python manage.py runserver

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open: **http://localhost:5173** 🎵

---

## 📡 API Documentation

**Production:** `https://melodai-lvjv.onrender.com`
**Development:** `http://127.0.0.1:8000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/test-api/` | Health check |
| POST | `/api/generate-music/` | Generate AI music + recommendations |
| POST | `/api/spotify-recommend/` | Get songs by mood |
| POST | `/api/search/` | Search by text |
| POST | `/api/save-history/` | Save session |
| GET | `/api/get-history/` | Get all history |
| POST | `/api/get-playlist/` | Get playlist |
| GET | `/api/favourites/` | Get favourites |
| POST | `/api/favourites/add/` | Add favourite |
| POST | `/api/favourites/remove/` | Remove favourite |
| POST | `/api/favourites/check/` | Check favourite status |

### Example — Generate Music:
```http
POST /api/generate-music/
{
    "mood": "happy",
    "context": "study"
}
```
```json
{
    "message": "Music generated successfully",
    "mood": "happy",
    "context": "study",
    "ai_music": {
        "track_id": "MELODAI_HAPPY_20260417",
        "description": "Upbeat pop track at 128 BPM",
        "ai_model": "MelodAI Generator v1.0"
    },
    "recommendations": [...10 songs...],
    "saved_to_history": true
}
```

---

## 🎭 Supported Moods

| Mood | Emoji | BPM | Best For |
|---|---|---|---|
| Happy | 😊 | 120-132 | Morning, celebration |
| Sad | 😢 | 55-65 | Emotional moments |
| Motivated | 💪 | 140-150 | Gym, hustle |
| Lonely | 🌙 | 60-70 | Late nights |
| Normal | 😐 | 100-110 | Everyday |
| Energetic | ⚡ | 140-155 | Workout |
| Romantic | 💕 | 72-82 | Date night |
| Calm | 😌 | 65-75 | Sleep, meditation |
| Focus | 🎯 | 85-95 | Study, work |
| Party | 🎉 | 128-140 | Weekends |
| Nostalgic | 🕰️ | 90-110 | Memories |
| Angry | 😤 | 140-160 | Dark, intense |

---

## 🔐 Authentication

localStorage-based auth (no backend required).

| Page | Guest | Logged In |
|---|---|---|
| Homepage | ✅ | ✅ |
| Studio | ✅ Preview | ✅ Full |
| Discover | 🔒 | ✅ |
| History | 🔒 | ✅ |
| Favourites | 🔒 | ✅ |
| Settings | 🔒 | ✅ |

---

## 🗄️ Database Schema

**Database:** `melodai_db`

### `music_history`:
```json
{
    "mood": "happy",
    "context": "study",
    "songs": [...],
    "ai_music": { "track_id": "...", "description": "..." },
    "created_at": "2026-04-17 10:30:00"
}
```

### `favourites`:
```json
{
    "title": "Song Name",
    "artist": "Artist",
    "preview_url": "https://...",
    "artwork": "https://...",
    "mood": "happy",
    "added_at": "2026-04-17 10:30:00"
}
```

---

## 🚀 Deployment

### Backend — Render:
```
Root Dir:      backend
Build Command: pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
Start Command: gunicorn melodai_project.wsgi:application
Env Vars:      SECRET_KEY, DEBUG=False, PYTHON_VERSION=3.11.0
```

### Frontend — Vercel:
```
Root Directory: frontend
Build Command:  npm run build
Output Dir:     dist
Env Vars:       VITE_API_URL=https://melodai-lvjv.onrender.com
```

---

## ⚠️ Known Limitations

- iTunes API gives **30-second previews** only
- Render free tier **sleeps after 15 min** — first request ~30s wake up
- AI music returns **descriptions** not actual audio
- Auth is **localStorage-based** (no backend JWT)

---

## 🔮 Future Enhancements

- [ ] Backend JWT authentication
- [ ] Real AI audio generation (Suno/Mubert)
- [ ] Full Spotify API (when paid plan available)
- [ ] Social sharing features
- [ ] Mobile app (React Native)
- [ ] Music analytics dashboard

---

## 📄 License

Built for educational purposes as a Final Year Project.

---

## Acknowledgements

- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/) — Free music data
- [MongoDB Atlas](https://www.mongodb.com/atlas) — Free cloud database
- [Render](https://render.com) — Free backend hosting
- [Vercel](https://vercel.com) — Free frontend hosting
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Lucide React](https://lucide.dev) — Icons

---

<div align="center">

**🎵 MelodAI — Feel the Music Your Mood Deserves 🎵**



[![Live Demo](https://img.shields.io/badge/🌐%20Try%20MelodAI%20Live-Click%20Here-8B5CF6?style=for-the-badge)](https://melodai.vercel.app)

© 2026 MelodAI.

</div>