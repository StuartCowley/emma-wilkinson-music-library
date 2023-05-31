const express = require('express');
const artistRouter = require('./routes/artists');
const albumsRouter = require('./routes/albums');
const app = express();

app.use(express.json());

app.use('/artists', artistRouter);
app.use('/albums', albumsRouter);

module.exports = app;