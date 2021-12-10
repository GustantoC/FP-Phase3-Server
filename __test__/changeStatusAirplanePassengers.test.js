const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
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
  const userChangeStatus3 = {
    name: "testuser2",
    passportNumber: "9804535",
    role: "User",
    email: "testUser2@mail.com",
    password: "password",
    phoneNumber: "4532461",
    status: "Interviewed",
  };
  const userChangeStatus4 = {
    name: "testuser2",
    passportNumber: "9804535",
    role: "User",
    email: "testUser2@mail.com",
    password: "password",
    phoneNumber: "4532461",
    status: "Exit Terminal",
  };
  const userChangeStatus = [
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
      passportNumber: "9804535",
      role: "User",
      email: "testUser2@mail.com",
      password: "password",
      phoneNumber: "4532461",
      status: "Interview",
    },
  ];
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => User.create(adminLoginTest))
    .then(() => User.bulkCreate(userChangeStatus))
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
      done();
    })
    .catch((err) => {
      done(err);
    });
});

let payload = {
  name: "OfficerAirport",
  passportNumber: "462752625727",
  email: "OfficerAirport@mail.com",
  password: "password",
  phoneNumber: "236234632632",
  role: "OfficerAirport",
  status: "Active",
};
describe("PUT /users/:id, [SUCCESS  PUT STATUS USER CASE]", () => {
  test(" 200, Should return user with status: 'Interview' when role officer: OfficerAirport", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerAirport@mail.com",
          password: "password",
        };
        return request(app)
          .get("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "OfficerAirport@mail.com",
              password: "password",
            });
            return request(app)
              .put("/users/2")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty(
                  "passportNumber",
                  expect.any(String)
                );
                expect(body).toHaveProperty("role", expect.any(String));
                expect(body).toHaveProperty("email", expect.any(String));
                expect(body).toHaveProperty("phoneNumber", expect.any(String));
                expect(body).toHaveProperty("status", expect.any(String));
                return done();
              });
          });
      });
  });
  test(" 200, Should return user with status: 'Interviewed' when role officer: OfficerAirport", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerAirport@mail.com",
          password: "password",
        };
        return request(app)
          .get("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "OfficerAirport@mail.com",
              password: "password",
            });
            return request(app)
              .put("/users/3")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty(
                  "passportNumber",
                  expect.any(String)
                );
                expect(body).toHaveProperty("role", expect.any(String));
                expect(body).toHaveProperty("email", expect.any(String));
                expect(body).toHaveProperty("phoneNumber", expect.any(String));
                expect(body).toHaveProperty("status", expect.any(String));
                return done();
              });
          });
      });
  });
});

describe("PUT /users/:id, [FAILED  PUT STATUS USER CASE]", () => {
  test(" 401, Should return error message when Token Invalid", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerAirport@mail.com",
          password: "password",
        };
        return request(app)
          .get("/login")
          .send(loginOfficer)
          .then(() => {
            let invalidToken =
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE";

            return request(app)
              .put("/users/3")
              .set("Accept", "application/json")
              .set("access_token", invalidToken)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
              });
          });
      });
  });
  test(" 403, Should return error message when Unauthorized", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let officerHealth = {
      name: "HealthOfficial",
      passportNumber: "462752625727",
      email: "HealthOfficial@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "HealthOfficial",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(officerHealth)
      .then(() => {
        const loginOfficer = {
          email: "HealthOfficial@mail.com",
          password: "password",
        };
        return request(app)
          .get("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "HealthOfficial@mail.com",
              password: "password",
            });
            return request(app)
              .put("/users/2")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", expect.any(String));
                return done();
              });
          });
      });
  });
  test(" 404, Should return error message when User NotFound", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerAirport@mail.com",
          password: "password",
        };
        return request(app)
          .get("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "OfficerAirport@mail.com",
              password: "password",
            });
            return request(app)
              .put("/users/29")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", expect.any(String));

                return done();
              });
          });
      });
  });
});
