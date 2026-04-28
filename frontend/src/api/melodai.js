import axios from 'axios'

// ✅ Uses Render URL in production, localhost in development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

// Test API
export const testApi = () =>
    axios.get(`${BASE_URL}/api/test-api/`)

// Generate Music
export const generateMusic = (mood, context) =>
    axios.post(`${BASE_URL}/api/generate-music/`, { mood, context })

// Get Recommendations
export const getRecommendations = (mood) =>
    axios.post(`${BASE_URL}/api/spotify-recommend/`, { mood })

// Search by text
export const searchByText = (text, mood) =>
    axios.post(`${BASE_URL}/api/search/`, { text, mood })

// Save History
export const saveHistory = (mood, context) =>
    axios.post(`${BASE_URL}/api/save-history/`, { mood, context })

// Get History
export const getHistory = () =>
    axios.get(`${BASE_URL}/api/get-history/`)

// Get Playlist
export const getPlaylist = (mood, limit = 10) =>
    axios.post(`${BASE_URL}/api/get-playlist/`, { mood, limit })

// Get Favourites
export const getFavourites = () =>
    axios.get(`${BASE_URL}/api/favourites/`)

// Add Favourite
export const addFavourite = (song) =>
    axios.post(`${BASE_URL}/api/favourites/add/`, { song })

// Remove Favourite
export const removeFavourite = (title, artist) =>
    axios.post(`${BASE_URL}/api/favourites/remove/`, { title, artist })

// Check Favourite
export const checkFavourite = (title, artist) =>
    axios.post(`${BASE_URL}/api/favourites/check/`, { title, artist })