const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('read Albums', () => {
  let album;
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query('INSERT INTO Albums (name, year) VALUES( $1, $2) RETURNING *', [
        'MM..FOOD',
        2004,
      ]),
      db.query('INSERT INTO Albums (name, year) VALUES( $1, $2) RETURNING *', [
        'Twelve Carat Toothache',
        2022,
      ]),
      db.query('INSERT INTO Albums (name, year) VALUES( $1, $2) RETURNING *', [
        'Plastic Beach',
        2010,
      ]),
    ]);
    album = responses.map(({ rows }) => rows[0]);
  });

  describe('GET /Albums', () => {
    it('returns all album records in the database', async () => {
      const { status, body } = await request(app).get('/albums').send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach((albumsRecord) => {
        const expected = album.find((a) => a.id === albumsRecord.id);

        expect(albumsRecord).to.deep.equal(expected);
      });
    });
  });

  describe('GET /albums/{id}', () => {
    it('returns the album with the correct id', async () => {
      const { status, body } = await request(app).get(`/albums/${album[0].id}`).send();

      expect(status).to.equal(200);
      expect(body).to.deep.equal(album[0]);
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .get('/albums/999999999').
        send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});