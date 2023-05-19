const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('create album', () => {
  let artist
  beforeEach(async () => {
    const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *', [
      'MF DOOM',
      'Rap'
    ])
    artist = rows[0]
  })
  console.log(artist);
  describe('/artists/{id}/albums', () => {
    describe('POST', () => {
      it('creates an album released by the artist in the database', async () => {
        const { status, body } = await request(app).post('/artists/:id/albums').send({
          name: 'MM..FOOD',
          year: 2004,
          artistsId: 4
        });

        expect(status).to.equal(201);
        expect(body.name).to.equal('MM..FOOD');
        expect(body.year).to.equal(2004);
        expect(body.artistsId).to.equal(4);

        const { rows: [albumsData],
        } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
        expect(albumsData.name).to.equal('MM..FOOD');
        expect(albumsData.year).to.equal(2004);
        expect(body.artistsId).to.equal(4);
      })
    })
  })
})