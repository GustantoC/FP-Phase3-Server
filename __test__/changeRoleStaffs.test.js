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
  User.create(adminLoginTest)
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

describe("PUT /staffs, [SUCCESS  REGISTER CASE]", () => {
  const staff = {
    name: "DriverWisma",
    email: "DriverWisma@mail.com",
    passportNumber: "657626527",
    password: "password",
    phoneNumber: "563737",
    role: "DriverWisma",
    status: "Active",
  };
  test("Should return status 201", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(staff)
      .then(() => {
        const role = { role: "HealthOfficial" };
        return request(app)
          .put("/staffs/2")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(role)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("passportNumber", expect.any(String));
            expect(body).toHaveProperty("role", expect.any(String));
            expect(body).toHaveProperty("email", expect.any(String));
            expect(body).toHaveProperty("phoneNumber", expect.any(String));
            expect(body).toHaveProperty("status", expect.any(String));
            return done();
          });
      });
  });
});

describe("PUT /staffs, [FAILED  CHANGE TOLE STAFF CASE]", () => {
  test("should be return message, because {TOKEN INVALID", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    const staffErrorToken = {
      name: "DriverWisma",
      email: "DriverWisma@mail.com",
      passportNumber: "657626527",
      password: "password",
      phoneNumber: "563737",
      role: "DriverWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(staffErrorToken)
      .then(() => {
        const role = { role: "HealthOfficial" };
        let invalidToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE";

        return request(app)
          .put("/staffs/2")
          .set("Accept", "application/json")
          .set("access_token", invalidToken)
          .send(role)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", expect.any(String));
            return done();
          });
      });
  });
  test("should be return message, because {TOKEN INVALID", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    const staffErrorRole = {
      name: "DriverWisma",
      email: "DriverWisma@mail.com",
      passportNumber: "657626527",
      password: "password",
      phoneNumber: "563737",
      role: "DriverWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(staffErrorRole)
      .then(() => {
        const role = { role: "Petugas Bandara" };

        return request(app)
          .put("/staffs/2")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(role)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", expect.any(String));
            return done();
          });
      });
  });
  test("should be return message, because {TOKEN INVALID", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    const staffErrorToken = {
      name: "DriverWisma",
      email: "DriverWisma@mail.com",
      passportNumber: "657626527",
      password: "password",
      phoneNumber: "563737",
      role: "DriverWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(staffErrorToken)
      .then(() => {
        const role = { role: "HealthOfficial" };
        return request(app)
          .put("/staffs/5")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(role)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", expect.any(String));
            return done();
          });
      });
  });
});
