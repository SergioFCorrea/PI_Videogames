const {getAll} = require('./controllers/controller')

const getGames = async (req, res) => {
    const games = await getAll()
    try {
        res.status(200).send(games)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = getGames