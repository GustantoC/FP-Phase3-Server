const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

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

const loginSuccess = {
  email: "test1@mail.com",
  password: "password",
};
describe("POST /login user/admin [SUCCESS CASE]", () => {
  test("should return status 200, & access_token", (done) => {
    request(app)
      .post("/login")
      .send(loginSuccess)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        return done();
      });
  });
});

let loginError = {
  email: "test1@mail.com",
  password: "password",
};
describe("POST /login user/admin [FAILED CASE]", () => {
  test("should return status 400 & message when email null", (done) => {
    let emailNull = {
      ...loginError,
      email: null,
    };
    request(app)
      .post("/login")
      .send(emailNull)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("should return status 400 & message when password null", (done) => {
    let passwordNull = {
      ...loginError,
      password: null,
    };
    request(app)
      .post("/login")
      .send(passwordNull)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("should return status 400 & message when authorized", (done) => {
    let authorized = {
      email: "pelancong@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(authorized)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});
