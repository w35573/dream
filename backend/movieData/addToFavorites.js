const axios = require('axios');
const API_KEY = '869b42f491d0a6bb59d90248e5b7bba8';
const { LocalStorage } = require('node-localstorage');
require('../Store/Store.js');

//isFav --> boolean value
async function fav(media_id, isFav) {
    try {

        const localStorage = new LocalStorage('./scratch');

        const user = localStorage.getItem('user');

        const session_id = localStorage.getItem('session_id');

        const add = isFav == 'true' ? true : false;

        if (!user || !session_id) {
            return 'unauthorized';
        }

        const url = `https://api.themoviedb.org/3/account/${user}/favorite?api_key=${API_KEY}&session_id=${session_id}`;

        const response = await axios.post(url, {
            media_type: 'movie',
            media_id: media_id,
            favorite: add,
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

exports.fav = fav;