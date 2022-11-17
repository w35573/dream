const axios = require('axios');
const API_KEY = '869b42f491d0a6bb59d90248e5b7bba8'

async function pagination(genre) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${genre}?page=1&api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        return error;
    }
}

exports.pagination = pagination;