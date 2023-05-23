const express = require('express');
const albumController = require('../controllers/album');
const router = express.Router();

router.get('/', albumController.getAllAlbums);

router.get('/:id', albumController.getAlbumsById);

router.patch('/:id', albumController.updateAlbum);

router.delete('/:id', albumController.deleteAlbum);

module.exports = router;