const express = require('express');
const app = express();
const supertest = require("supertest");
const { describe, test } = require("jest-circus");


describe("/homepage endpoint", () => {
    let server = null;

    beforeEach(() => {
      server = app.listen(3000, () => console.log("Listening on port 3000"));
    });

    afterEach(async () => {
      await server.close();
    });

    it("should pass the test", () => {
      expect(2).toBe(2);
    });
});
