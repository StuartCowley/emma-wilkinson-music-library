const express = require('express');
const artistController = ('../controllers/artist');
const router = express.Router();

router.post('/', artistController.createArtist);

module.exports = router;