const { expect } = require("chai");
const request = require("supertest");
const db = require("../src/db");
const app = require("../src/app");

describe("Update Album", () => {
  let album;
  let artist;
  beforeEach(async () => {
    const artistTable = await db.query("INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *", [
      "MF DOOM",
      "rap"
    ]);

    artist = artistTable.rows[0];

    const albumTable = await db.query("INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *", [
      "MM..FOOD",
      2004,
      artist.id
    ]);

    album = albumTable.rows[0];
  });

  describe("PATCH /albums/{id}", () => {
    it("updates the album and returns the updated record", async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ name: "Updated Album", year: 2022 });
      expect(status).to.equal(200);
      expect(body).to.deep.equal({
        id: album.id,
        name: "Updated Album",
        year: 2022,
        artistid: artist.id,
      });
    });

    it("returns a 404 if the album does not exist", async () => {
      const { status, body } = await request(app)
        .patch("/albums/999999999")
        .send({ name: "MM..FOOD", year: 2004 });

      expect(status).to.equal(404);
      expect(body.message).to.equal("album 999999999 does not exist");
    });
  });
});