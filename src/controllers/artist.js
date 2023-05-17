const db = require('../db/index');


const createArtist = async (req, res) => {

  const { name, genre } = req.body;

  try {
    const {
      rows: [artist]
    } = await db.query('insert into artists(name, genre) values($1, $2) returning *', [name, genre])
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getAllArtists = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Artists')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: [artist] } = await db.query('SELECT * FROM Artists WHERE id = $1', [id])

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` })
    }
    res.status(200).json(artist)
  } catch (error) {
    res.status(500).json(error.message);
  }
}


module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
}; 