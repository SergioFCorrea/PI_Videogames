// DEPENDENCIES
require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { postVideogame } = require("./controllers/controller.js");
const getGames = require('./handlers.js')
const { API_KEY } = process.env;
const {Videogames} = require('./db.js')

require("./db.js");

const server = express();

server.name = "API";

// MIDDLEWARES

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, DELETE"
	);
	next();
});

server.use("/", routes);

// PAGE INDEX

let pageIndex = 2;

// ROUTES

// GET ALL GAMES
server.get("/videogames", getGames);

// async (req, res) => {
// 	try {
// 		const response = await axios(
// 			`https://api.rawg.io/api/games?key=${API_KEY}`
// 		);
// 		pageIndex = 1;
// 		res.status(200).json(response.data);
// 	} catch (error) {
// 		res.status(500).send(error.message);
// 	}
// }



// NEXT PAGE ROUTE
server.get("/videogames/nextpage", async (req, res) => {
	try {
		const response = await axios(
			`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageIndex}`
		);
		++pageIndex;
		console.log(pageIndex);
		// const results = response.data.results;
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// PREVIOUS PAGE ROUTE
server.get("/videogames/previouspage", async (req, res) => {
	try {
		if (pageIndex > 1) {
			const response = await axios(
				`https://api.rawg.io/api/games?key=${API_KEY}&page=${pageIndex}`
			);
			--pageIndex;
			console.log(pageIndex);
			res.status(200).json(response.data);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// DETAIL ROUTE
server.get("/videogames/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const response = await axios(
			`https://api.rawg.io/api/games/${id}?key=${API_KEY}`
		);
		const data = response.data;
		console.log(id);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).send('non-existent id');
	}
});

// SEARCH BY NAME
server.get(`/gamebyname`, async (req, res) => {
	try {
		const { name } = req.query;
		const encodedName = encodeURIComponent(name);
		const query = encodedName.toLowerCase();

		if (name) {
			const response = await axios(
				`https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`
			);
			const gameByName = response.data.results;

			res.status(200).json(gameByName);
		}

		// const games = await getVideoGame();
		// return res.status(200).json(games);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// GET GENRES
server.get("/genres", async (req, res) => {
	try {
		const response = await axios(
			`https://api.rawg.io/api/genres?key=${API_KEY}`
		);
		const results = response.data.results;
		res.status(200).json(results);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// CREATE GAME
server.post("/videogames", async (req, res) => {
	try {
		const {
			name,
			launch_date,
			description,
			background_image,
			rating,
			platforms,
			genres,
		} = req.body;

		const newGame = await postVideogame(
			name,
			launch_date,
			description,
			background_image,
			rating,
			platforms,
			genres
		);

		res.status(200).json(newGame);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
