const request = require("supertest");
const app = require("../app");
const { User, QuarantineDetail } = require("../models");
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
  const dummyQuarantineDetail = {
    userId: 1,
    tripOrigin: "Jerman",
    tripDestination: "Berlin",
    isQuarantined: false,
  };
  User.create(userTest)
    .then(() => {
      QuarantineDetail.create(dummyQuarantineDetail);
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      return QuarantineDetail.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then((_) => {
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
    const trip = {
      userId: 1,
      tripOrigin: "Belanda",
      tripDestination: "Den Haag",
      isQuarantined: false,
    };
    request(app)
      .post("/trips")
      .send(trip)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        console.log(body, status, "<<<<<<<<<<<=================");
        return done();
      });
  });
});
