const request = require("supertest");
const app = require("../app");
const {
  User,
  QuarantineDetail,
  QuarantineLocation,
  HistoryLog,
} = require("../models");
const TokenHelper = require("../helpers/TokenHelper");
const { get } = require("superagent");

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
  const user = {
    name: "ArrivalProcedure",
    passportNumber: "2624624",
    role: "User",
    email: "ArrivalProcedure@mail.com",
    password: "password",
    phoneNumber: "14547257",
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

  User.create(adminLoginTest)
    .then(() => User.create(user))
    .then(() =>
      QuarantineLocation.bulkCreate(quarantineLocation, { createdBy: 1 })
    )
    .then(() => done())
    .catch((err) => done(err));
});

afterAll((done) => {
  User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
    .then(() => {
      return QuarantineDetail.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      return QuarantineLocation.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      return HistoryLog.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => done())
    .catch((err) => {
      done(err);
    });
});

// ERROR CASE
describe("GET /mail/userId, [Error CASE]", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 2,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    QuarantineDetail.create(quarantine, { createdBy: 2 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test("Should return message 'Email sent error!'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let tokenAdmin = data.body.access_token;
        return request(app)
          .get("/mail/2")
          .set("Accept", "application/json")
          .set("access_token", tokenAdmin)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(503);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});

describe("GET /mail/userId, [Error CASE]", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 2,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    QuarantineDetail.create(quarantine, { createdBy: 2 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test("Should return message 'User not found'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let tokenAdmin = data.body.access_token;
        return request(app)
          .get("/mail/15")
          .set("Accept", "application/json")
          .set("access_token", tokenAdmin)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});
