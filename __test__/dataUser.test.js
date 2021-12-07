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

describe("GET /users ", () => {
  test(" 200, should be return an array of object  [SUCCES GET DATA USERS]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
      role: "User",
    });
    request(app)
      .get("/users")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        return done();
      });
  });
  //   test("401, should return mesage [FAILED GET DATA USER]", (done) => {
  //     const invalidToken =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE";

  //     request(app)
  //       .get("/users")
  //       .set("Accept", "application/json")
  //       .set("access_token", invalidToken)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         const { body, status } = res;

  //         expect(status).toBe(401);
  //         expect(body).toHaveProperty("message", "Invalid token");
  //         return done();
  //       });
  //   });
});

describe("GET /users:id", () => {
  test("200 should return object [SUCCESS CASE]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
      role: "User",
    });
    request(app)
      .get("/users/1")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
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
  test("404 should return message [FAILED CASE]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
      role: "User",
    });
    request(app)
      .get("/users/11004")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});

describe("PUT /users:id", () => {
  test();
});
