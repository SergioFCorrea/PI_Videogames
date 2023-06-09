const axios = require("axios");
const { Videogames } = require("../db");
const { API_KEY } = process.env;

const getGameDetail = async (id) => {
	// if (!isNaN(id)) {
		const response = await axios(
			`https://api.rawg.io/api/games/${id}?key=${API_KEY}`
		);
		const data = response.data;
		return data;
	// } else if (isNaN(id)) {

	// }
};




// const dbGame = async(db) => await db.findByPk(id);



const getAllDetails = async (id) => {
	if(isNaN(id)){
	const db = await Videogames.findByPk(id);
	console.log(id);
	return db
}
	const api = await getGameDetail(id)
	return api
}


const getVideoGame = async () => {
	const apiResponse = await axios(
		`https://api.rawg.io/api/games?key=${API_KEY}`
	);
	const apiData = apiResponse.data.results;

	return apiData;
};



const getDbGames = async (db) => await db.findAll();

const getAll = async () => {
	const db = await getDbGames(Videogames);
	const api = await getVideoGame();
	// console.log(db);
	return [...db, ...api];
};

const postVideogame = async (
	name,
	description,
	launch_date,
	background_image,
	rating,
	platforms,
	genres
) => {
	const newGame = await Videogames.create({
		name: name,
		launch_date: launch_date,
		description: description,
		background_image: background_image,
		rating: rating,
		platforms: platforms,
		genres: genres,
	});

	return newGame;
};

module.exports = {
	getGameDetail,
	getVideoGame,
	postVideogame,
	getAll,
	getAllDetails
};
