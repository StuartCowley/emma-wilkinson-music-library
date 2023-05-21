const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *', [
      'MF DOOM',
      'Rap'
    ]);
    artist = rows[0];
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates an album released by the artist in the database', async () => {
      const { status, body } = await request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'MM..FOOD',
          year: 2004
        });

      expect(status).to.equal(201);
      expect(body.name).to.equal('MM..FOOD');
      expect(body.year).to.equal(2004);

      const { rows: [albumsData] } = await db.query('SELECT * FROM Albums WHERE id = $1', [body.id]);
      expect(albumsData.name).to.equal('MM..FOOD');
      expect(albumsData.year).to.equal(2004);
    });
  });
});