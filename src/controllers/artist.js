const db = require('../db/index');

const createArtist = async (req, res) => {

  const { name, genre } = req.body;

  try {
    const {
      rows: [artist]
    } = await db.query(`insert into artists(name, genre) values('${name}', '${genre}') returning *`)
    res.status(201).json(artist);
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = { createArtist }; 