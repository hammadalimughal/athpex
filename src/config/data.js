// Use Vite env var if provided (VITE_API_BASE). Fallback to relative `/api` so
// the frontend calls the same origin in production (works on Vercel routing).
export const API_BASE = import.meta.env.VITE_API_BASE || '/api'
// export const API_BASE = '/api'

export const formatImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    if (url.startsWith('uploads/')) {
        return '/' + url;
    }
    if (url.startsWith('/uploads/')) {
        return url;
    }
    return url;
};