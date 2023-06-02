const {getAll, getGameDetail, getAllDetails} = require('./controllers/controller')

const getGames = async (req, res) => {
    const games = await getAll()
    try {
        res.status(200).send(games)
    } catch (error) {
        res.status(404).send(error.message)
    }
}


const getDetail = async (req, res) => {
    const { id } = req.params
    const gameDetail = await getAllDetails(id)
    try {
        res.status(200).send(gameDetail)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {
    getGames,
    getDetail
}