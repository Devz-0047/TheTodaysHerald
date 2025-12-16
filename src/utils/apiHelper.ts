const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;

export const getNewsUrl = (params: Record<string, string>) => {
    const isDev = import.meta.env.DEV;
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // Debug log to help diagnose Vercel issue
    console.log(`[NewsAPI] Env: ${isDev ? 'DEV' : 'PROD'}, Host: ${window.location.hostname}`);

    // Force PROD mode if not localhost (failsafe for Vercel)
    if (isDev && isLocalhost) {
        if (!API_KEY) {
            console.error("VITE_GNEWS_API_KEY is missing in .env!");
        }
        const { endpoint, ...rest } = params;
        const gnewsEndpoint = endpoint === 'search' ? 'search' : 'top-headlines';

        // Construct query string for GNews
        const query = new URLSearchParams(rest);
        query.append('token', API_KEY);
        return `https://gnews.io/api/v4/${gnewsEndpoint}?${query.toString()}`;
    }

    // In Production: Use Vercel Proxy (hides Key, solves CORS)
    else {
        const query = new URLSearchParams(params);
        return `/api/news?${query.toString()}`;
    }
};
