const db = require('../db/index');

const getAllAlbums = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums')
    res.status(200).json(rows)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getAlbumsById = async (req, res) => {
  try {
    const { id } = req.params;
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
  const { name, year } = req.body

  let query, params

  if (name && year) {
    query = `UPDATE Albums SET name = $1, year = $2 WHERE id = $3 RETURNING *`
    params = [name, year, id]
  } else if (name) {
    query = `UPDATE Albums SET name = $1 WHERE id = $2 RETURNING *`
    params = [name, id]
  } else if (year) {
    // eslint-disable-next-line no-unused-vars
    query = `UPDATE Albums SET year = $1 WHERE id = $2 RETURNING *`
    // eslint-disable-next-line no-unused-vars
    params = [year, id]
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
  getAllAlbums,
  getAlbumsById,
  updateAlbum,
  deleteAlbum,
}