const express = require('express');
var cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const ioUtils = require('./utils/io');
const fetchUrl = require('./utils/fetchUrl');
const movieData = require('./movieData/searchMovie');
const addToWatchList = require('./movieData/addToWatchList');
const addToFavorites = require('./movieData/addToFavorites');
const checkPagination = require('./movieData/checkPagination');

app.use(express.json());

app.use(cors());

const io = require('socket.io')(server, {
	path: '/socket',
	origins: ['https://redparty.netlify.app', 'http://localhost:3000'],
	serveClient: false,
});

const PORT = process.env.PORT || 5000;

app.get('/test', (req, res, next) => {
	res.send({ message: 'Hello World' });
});

app.get('/watchparty/:username/:videoUrl', async (req, res) => {
	const username = req.params.username;
	const videoUrl = req.params.videoUrl;

	try {
		const url = await fetchUrl.fetchData(username, videoUrl);
		res.json(url);
	} catch (err) {
		res.json(err);
	}
});

app.get('/movie/search/:movieName', async (req, res) => {
	const movieName = req.params.movieName;
	console.log(movieName);
	try {
		const data = await movieData.searchMovie(movieName);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: 'Movie not found' });
	}
});

app.get('/movie/pagination/:genre', async (req, res) => {
	const genre = req.params.genre;
	console.log(genre);
	try {
		const data = await checkPagination.pagination(genre);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: 'Movie not found' });
	}
});

app.get('/movie/watchlist/:media_id/:watchlist', async (req, res) => {
	const media_id = req.params.media_id;
	const watchlist = req.params.watchlist;

	try {
		const data = await addToWatchList.watchList(media_id, watchlist);

		if (data === 'unauthorized') {
			res.status(401).json({ message: 'Unauthorized' });
		} else {
			res.status(200).json(data);
		}
	} catch (error) {
		res.status(404).json({ message: 'Movie not found' });
	}
});

app.get('/movie/favorite/:media_id/:isFav', async (req, res) => {
	const media_id = req.params.media_id;
	const isFav = req.params.isFav;

	try {
		const data = await addToFavorites.fav(media_id, isFav);

		if (data === 'unauthorized') {
			res.status(401).json({ message: 'Unauthorized' });
		} else {
			res.status(200).json(data);
		}
	} catch (error) {
		res.status(404).json({ message: 'Movie not found' });
	}
});

ioUtils.setupIO(io);

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
