const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const userTest = {
  name: "testuser",
  passportNumber: "9804535",
  role: "User",
  email: "testUser@mail.com",
  password: "password",
  phoneNumber: "4532461",
  status: "ArrivalProcedure",
};

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

describe("POST /users, [SUCCESS  REGISTER CASE]", () => {
  test("Should return status 201", (done) => {
    request(app)
      .post("/users")
      .send(userTest)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", userTest.name);
        expect(body).toHaveProperty("passportNumber", userTest.passportNumber);
        expect(body).toHaveProperty("role", expect.any(String));
        expect(body).toHaveProperty("email", userTest.email);
        expect(body).toHaveProperty("phoneNumber", userTest.phoneNumber);
        expect(body).toHaveProperty("status", expect.any(String));
        return done();
      });
  });
});

let userError = {
  name: "testuser",
  passportNumber: "9804535",
  role: "User",
  email: "testUser@mail.com",
  password: "password",
  phoneNumber: "4532461",
  status: "ArrivalProcedure",
};

describe("POST /users, [FAILED  REGISTER CASE]", () => {
  test("Should return status 400 when name null", (done) => {
    let nameNull = {
      ...userError,
      name: null,
    };
    request(app)
      .post("/users")
      .send(nameNull)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when passportNumber null", (done) => {
    let passportNumberNull = {
      ...userError,
      passportNumber: null,
    };
    request(app)
      .post("/users")
      .send(passportNumberNull)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when role null", (done) => {
    let roleNull = {
      ...userError,
      roleNull: null,
    };
    request(app)
      .post("/users")
      .send(roleNull)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when email null", (done) => {
    let emailNull = {
      ...userError,
      email: null,
    };
    request(app)
      .post("/users")
      .send(emailNull)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when email already use ", (done) => {
    let emailAlreadyUse = {
      ...userError,
      email: "testUser@mail.com",
    };
    request(app)
      .post("/users")
      .send(emailAlreadyUse)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when email already wrong format", (done) => {
    let wrongFormatEmail = {
      ...userError,
      email: "test1mail.com",
    };
    request(app)
      .post("/users")
      .send(wrongFormatEmail)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when password null", (done) => {
    let passwordNull = {
      ...userError,
      password: null,
    };
    request(app)
      .post("/users")
      .send(passwordNull)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when password under 6 characters", (done) => {
    let passwordUnder = {
      ...userError,
      password: "pass",
    };
    request(app)
      .post("/users")
      .send(passwordUnder)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when phoneNumber null", (done) => {
    let phoneNumberNull = {
      ...userError,
      phoneNumber: null,
    };
    request(app)
      .post("/users")
      .send(phoneNumberNull)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when status null", (done) => {
    let statusNull = {
      ...userError,
      status: null,
    };
    request(app)
      .post("/users")
      .send(statusNull)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});
