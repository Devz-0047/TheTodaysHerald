const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;

export const getNewsUrl = (params: Record<string, string>) => {
    // In Development: Use direct API call with Key (bypasses missing proxy)
    if (import.meta.env.DEV) {
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
