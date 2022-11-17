const axios = require('axios');
const API_KEY = '869b42f491d0a6bb59d90248e5b7bba8'

async function searchMovie(movieName) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`;
        const response = await axios.get(url);
        return response.data;
    } catch {
        return null;
    }
}

exports.searchMovie = searchMovie;