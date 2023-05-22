const express = require('express');
const artistRouter = require('./routes/artists');
const app = express();
const albumsRouter = require('./routes/albums');

app.use(express.json());

app.use('/artists', artistRouter);
app.use('/albums', albumsRouter);

module.exports = app;