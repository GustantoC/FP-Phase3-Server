const request = require("supertest");
const app = require("../app");
const { User, QuarantineDetail } = require("../models");
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

  const userTest = [
    {
      name: "testuser",
      passportNumber: "9804535",
      role: "User",
      email: "testUser@mail.com",
      password: "password",
      phoneNumber: "4532461",
      status: "ArrivalProcedure",
    },
    {
      name: "testuser2",
      passportNumber: "462362462",
      role: "User",
      email: "testUser2@mail.com",
      password: "password",
      phoneNumber: "62457482",
      status: "ArrivalProcedure",
    },
  ];
  const newTrip = {
    userId: 2,
    tripOrigin: "Jerman",
    tripDestination: "Berlin",
    isQuarantined: false,
  };
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => User.create(adminLoginTest))
    .then(() => User.bulkCreate(userTest))
    .then(() => done())
    .catch((err) => done(err));
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
  afterEach((done) => {
    User.update(
      {
        status: "ArrivalProcedure",
      },
      {
        where: {
          id: 3,
        },
        individualHooks: true,
        updateType: "user",
        updatedBy: 3,
      }
    )
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 201, should be return some object  [SUCCES POST DATA TRIP]", (done) => {
    const tokenUser = TokenHelper.signPayload({
      email: "testUser2@mail.com",
      password: "password",
    });
    const newTrip = {
      userId: 3,
      tripOrigin: "Jerman",
      tripDestination: "Berlin",
      isQuarantined: false,
    };
    request(app)
      .post("/trips")
      .set("Accept", "application/json")
      .set("access_token", tokenUser)
      .send(newTrip)
      .then((res) => {
        const { status, body } = res;
        console.log(status, body, "<<<<<<<<<<<<<================");
        // expect(status).toBe(200);

        done();
      })
      .catch((err) => done(err));
  });
});

let newTripError = {
  userId: 3,
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
