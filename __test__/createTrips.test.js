const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const TokenHelper = require("../helpers/TokenHelper");

beforeAll((done) => {
  const userTest = {
    name: "testuser",
    passportNumber: "9804535",
    role: "User",
    email: "testUser@mail.com",
    password: "password",
    phoneNumber: "4532461",
    status: "ArrivalProcedure",
  };
  User.create(userTest)
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST /trips ", () => {
  test(" 201, should be return some object  [SUCCES POST DATA TRIP]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "testUser@mail.com",
      password: "password",
    });
    const payload = {
      tripOrigin: "Belanda",
      tripDestination: "Den Haag",
    };
    request(app)
      .post("/trips")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send(payload)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        console.log(body, ",<<<<=====");
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("tripOrigin", expect.any(String));
        expect(body).toHaveProperty("tripDestination", expect.any(String));
        return done();
      });
  });
});
