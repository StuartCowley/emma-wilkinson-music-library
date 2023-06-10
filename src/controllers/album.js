const db = require('../db/index');

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

const getAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getAlbumsById = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows: [Album] } = await db.query('SELECT * FROM Albums WHERE id = $1', [id])

    if (!Album) {
      return res.status(404).json({ message: `album ${id} does not exist` })
    }
    res.status(200).json(Album)
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const updateAlbum = async (req, res) => {
  const { id } = req.params
  const { name, year, artistid } = req.body

  let query, params

  if (name && year) {
    query = `UPDATE Albums SET name = $1, year = $2, artistId = $3 WHERE id = $4 RETURNING *`;
    params = [name, year, artistid, id];
  } else if (name) {
    query = `UPDATE Albums SET name = $1, artistId = $2 WHERE id = $3 RETURNING *`;
    params = [name, artistid, id];
  } else if (year) {
    query = `UPDATE Albums SET year = $1, artistId = $2 WHERE id = $3 RETURNING *`;
    params = [year, artistid, id];
  } else if (artistid) {
    query = `UPDATE Albums SET artistId = $1 WHERE id = $2 RETURNING *`;
    params = [artistid, id];
  }


  try {
    const { rows: [album] } = await db.query(query, params)

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` })
    }

    res.status(200).json(album)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const deleteAlbum = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows: [album] } = await db.query('DELETE FROM Albums WHERE id = $1 RETURNING *', [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  createAlbum,
  getAllAlbums,
  getAlbumsById,
  updateAlbum,
  deleteAlbum,
}