const express = require('express');
var cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const ioUtils = require('./utils/io');
const fetchUrl = require('./utils/fetchUrl');

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
})

ioUtils.setupIO(io);

server.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
