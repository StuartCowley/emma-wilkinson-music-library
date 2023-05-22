const express = require('express');
const artistController = require('../controllers/album');
const router = express.Router();

router.get('/', artistController.getAllAlbums);

router.get('/:id', artistController.getAlbumsById);

module.exports = router;