const assert = require('assert');
const fetchUrl = require('../utils/fetchUrl');
const movieData = require('../movieData/searchMovie');
const addToWatchList = require('../movieData/addToWatchList');
const addToFavorites = require('../movieData/addToFavorites');
const checkPagination = require('../movieData/checkPagination');

// test to check pagination
describe('Pagination', function () {

    //check for popular 
    describe('Pagination for popular category', function () {
        it('should return 20 results when the value is present', async function () {
            const data = await checkPagination.pagination('popular');
            assert.equal(data.results.length, 20);
        });
    });

    //check for top rated
    describe('Pagination for top rated category', function () {
        it('should return 20 results when the value is present', async function () {
            const data = await checkPagination.pagination('top_rated');
            assert.equal(data.results.length, 20);
        });
    });

    //check for upcoming
    describe('Pagination for upcoming category', function () {
        it('should return 20 results when the value is present', async function () {
            const data = await checkPagination.pagination('upcoming');
            assert.equal(data.results.length, 20);
        });
    });
});

// test to check search movie

describe('Search Movie', function () {
    describe('Search Movie by name', function () {
        it('should return results about searched query', async function () {
            const data = await movieData.searchMovie('avengers');
            //check if results are greater than 0
            assert.equal(data.total_results > 0, true);
        });
    });

    //no movies exist
    describe('Search Movie by name', function () {
        it('should return no results', async function () {
            const data = await movieData.searchMovie('asdasd');
            //check if results are greater than 0
            assert.equal(data.results.total_results > 0, false);
        });
    });
});

// test to check add to watchlist

describe('Add to watchlist', function () {
    // add to watchlist
    describe('Added to watchlist', function () {
        it('should return status code 1', async function () {
            const data = await addToWatchList.watchList(505642, "true");
            assert.equal(data.status_code, 1);
        });
    });

    // changes saved successfully
    describe('Changes saved successfully', function () {
        it('should return status code 12', async function () {
            const data = await addToWatchList.watchList(505642, "true");
            assert.equal(data.status_code, 12);
        });
    });

    // remove from watchlist
    describe('Removed from watchlist', function () {
        it('should return status code 13', async function () {
            const data = await addToWatchList.watchList(505642, "false");
            assert.equal(data.status_code, 13);
        });
    });
});

// test to check add to favorites

describe('Add to favorites', function () {
    // add to favorites
    describe('Added to favorites', function () {
        it('should return status code 1', async function () {
            const data = await addToFavorites.fav(505642, "true");
            assert.equal(data.status_code, 1);
        });
    });

    // changes saved successfully
    describe('Changes saved successfully', function () {
        it('should return status code 12', async function () {
            const data = await addToFavorites.fav(505642, "true");
            assert.equal(data.status_code, 12);
        });
    });

    // remove from favorites
    describe('Removed from favorites', function () {
        it('should return status code 13', async function () {
            const data = await addToFavorites.fav(505642, "false");
            assert.equal(data.status_code, 13);
        });
    });
});

// test to check watch party feature from fetch url
describe('Watch Party', function () {
    describe('URL returned', function () {
        it('should return watch party url', async function () {
            const data = await fetchUrl.fetchData('w35573', 'dQw4w9WgXcQ');

            //check if url exists
            assert.equal(typeof data.url === 'string', true);
        });
    });
});