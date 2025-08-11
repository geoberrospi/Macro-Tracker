// Install required packages with: npm install express node-fetch cors
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Your USDA API key is stored securely here, not in the client-side code.
const USDA_API_KEY = "cTOgOMDoDoUBCQqKXJ2PC5L63EwMgzJQuNeJPvtr";
const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

// Enable CORS for all origins, allowing your client-side app to connect.
app.use(cors());

// Define the API endpoint that your React app will call.
app.get('/search', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter 'query' is required." });
    }

    try {
        // Construct the URL for the USDA API request with the key and query.
        const url = `${USDA_API_URL}?api_key=${USDA_API_KEY}&query=${encodeURIComponent(query)}`;
        
        // Make the request to the USDA API.
        const response = await fetch(url);
        const data = await response.json();

        // Send the data from the USDA API directly back to your React app.
        res.json(data);
    } catch (error) {
        console.error('Error fetching from USDA API:', error);
        res.status(500).json({ error: 'Failed to fetch data from USDA API.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

