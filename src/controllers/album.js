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

module.exports = {
  getAllAlbums,
  getAlbumsById,
