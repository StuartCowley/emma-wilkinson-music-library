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

const updateArtist = async (req, res) => {
  const { id } = req.params
  const { name, genre } = req.body

  let query, params

  if (name && genre) {
    query = `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`
    params = [name, genre, id]
  } else if (name) {
    query = `UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *`
    params = [name, id]
  } else if (genre) {
    query = `UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *`
    params = [genre, id]
  }

  try {

    const { rows: [artist] } = await db.query(query, params)

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` })
    }

    res.status(200).json(artist)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const deleteArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: [artist] } = await db.query('DELETE FROM Artists WHERE id = $1 RETURNING *', [id]);

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};


const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const { artistId } = req.params;
  try {
    const {
      rows: [album]
    } = await db.query('INSERT INTO Albums (name, year, artistId) VALUES ( $1, $2, $3) RETURNING *', [
      name,
      year,
      artistId
    ]);
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  createAlbum,
}