const request = require("supertest");
const app = require("../app");
const { User, QuarantineDetail, QuarantineLocation } = require("../models");
const TokenHelper = require("../helpers/TokenHelper");

beforeAll((done) => {
  const adminLoginTest = {
    name: "test",
    passportNumber: "09437410364326",
    role: "Admin",
    email: "test1@mail.com",
    password: "password",
    phoneNumber: "111333",
    status: "Active",
  };

  const userTest = {
    name: "testuser",
    passportNumber: "9804535",
    role: "User",
    email: "testUser@mail.com",
    password: "password",
    phoneNumber: "4532461",
    status: "ArrivalProcedure",
  };

  const quarantineLocation = [
    {
      name: "dummy Hotel",
      address: "jl. dummy",
      type: "Hotel",
    },
    {
      name: "dummy Wisma",
      address: "jl. dummy",
      type: "Wisma",
    },
    {
      name: "dummy Penginapan",
      address: "jl. dummy",
      type: "Penginapan",
    },
  ];

  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => User.create(adminLoginTest))
    .then(() => User.create(userTest))
    .then(() =>
      QuarantineLocation.bulkCreate(quarantineLocation, { createdBy: 1 })
    )
    .then(() => done())
    .catch((err) => done(err));
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      return QuarantineLocation.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then((_) => {
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
    const loginUser = {
      email: "testUser@mail.com",
      password: "password",
    };

    request(app)
      .post("/login")
      .send(loginUser)
      .then((data) => {
        let tokenUser = data.body.access_token;
        const newTrip = {
          tripOrigin: "Jerman",
          tripDestination: "Berlin",
        };
        return request(app)
          .post("/trips")
          .set("Accept", "application/json")
          .set("access_token", tokenUser)
          .send(newTrip)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("tripOrigin", expect.any(String));
            expect(body).toHaveProperty("tripDestination", expect.any(String));

            done();
          });
      });
  });
  test(" 403, should be return message [FAILED POST DATA TRIP]", (done) => {
    const loginUser = {
      email: "testUser@mail.com",
      password: "password",
    };

    request(app)
      .post("/login")
      .send(loginUser)
      .then((data) => {
        let tokenUser = data.body.access_token;
        const newTrip = {
          tripOrigin: "Jerman",
          tripDestination: "Berlin",
        };
        return request(app)
          .post("/trips")
          .set("Accept", "application/json")
          .set("access_token", tokenUser)
          .send(newTrip)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});

let newTripError = {
  userId: 2,
  tripOrigin: "Jerman",
  tripDestination: "Berlin",
  isQuarantined: false,
};

describe("POST /trips [ERROR CASE]", () => {
  test("400, should be return message  [FAILED POST DATA TRIP] where tripOrigin: null", (done) => {
    let tripOriginNull = {
      ...newTripError,
      tripOrigin: null,
    };
    const tokenUser = TokenHelper.signPayload({
      email: "testUser@mail.com",
      password: "password",
    });
    request(app)
      .post("/trips")
      .set("Accept", "application/json")
      .set("access_token", tokenUser)
      .send(tripOriginNull)
      .then((res) => {
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => done(err));
  });
  test("400, should be return message  [FAILED POST DATA TRIP] where tripDestination: null", (done) => {
    let tripDestinationNull = {
      ...newTripError,
      tripDestination: null,
    };
    const tokenUser = TokenHelper.signPayload({
      email: "testUser@mail.com",
      password: "password",
    });
    request(app)
      .post("/trips")
      .set("Accept", "application/json")
      .set("access_token", tokenUser)
      .send(tripDestinationNull)
      .then((res) => {
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => done(err));
  });
  test("400, should be return message  [FAILED POST DATA TRIP] where Role Not 'User'", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    const official = {
      name: "OfficerAirport",
      passportNumber: "462752625727",
      email: "OfficerAirport@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerAirport",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(official)
      .then(() => {
        let tokenOfficer = TokenHelper.signPayload({
          email: "OfficerAirport@mail.com",
          password: "password",
        });
        return request(app)
          .post("/trips")
          .set("Accept", "application/json")
          .set("access_token", tokenOfficer)
          .send(newTripError)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          })
          .catch((err) => done(err));
      });
  });
});
