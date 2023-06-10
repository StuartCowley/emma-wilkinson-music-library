const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('Delete Album', () => {
  let album;
  let artist;
  beforeEach(async () => {
    const artistTable = await db.query('INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *', [
      'MF DOOM',
      'rap',
    ]);

    artist = artistTable.rows[0];

    const albumTable = await db.query('INSERT INTO Albums (name, year, artistid) VALUES( $1, $2, $3) RETURNING *', [
      'MM..FOOD',
      2004,
      artist.id
    ])
    album = albumTable.rows[0];
  })

  describe('DELETE /albums/{id}', () => {
    it('deletes the artist and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${album.id}`).send()

      expect(status).to.equal(200)

      expect(body).to.deep.equal({
        id: album.id,
        name: 'MM..FOOD',
        year: 2004,
        artistid: artist.id
      })
    })

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/albums/999999999').send()

      expect(status).to.equal(404)
      expect(body.message).to.equal('album 999999999 does not exist')
    })
  })
})