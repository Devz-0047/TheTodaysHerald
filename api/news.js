import axios from 'axios';

export default async function handler(req, res) {
    const { method } = req;

    if (method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const { endpoint, ...queryParams } = req.query;
    const apiKey = process.env.VITE_GNEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    // Choose the GNews endpoint based on the 'endpoint' query param
    // Default to 'top-headlines' if not provided
    const gnewsEndpoint = endpoint === 'search' ? 'search' : 'top-headlines';
    const url = `https://gnews.io/api/v4/${gnewsEndpoint}`;

    try {
        const response = await axios.get(url, {
            params: {
                ...queryParams,
                token: apiKey, // Inject the key securely here
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('GNews API Error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch news',
            details: error.response?.data || error.message
        });
    }
}
