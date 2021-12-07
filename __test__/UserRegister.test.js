const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

const adminTest1 = {
  name: "test",
  passportNumber: "09437410364326",
  role: "Admin",
  email: "test1@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};

beforeAll((done) => {
  User.create(adminTest1)
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

describe("POST /regisAdmin, [SUCCESS  REGISTER CASE]", () => {
  test("Should return status 201", (done) => {
    request(app)
      .post("/regisAdmin")
      .send(adminTest1)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});

let errorRegisterAdmin = {
  name: "errortest",
  passportNumber: "09374168735",
  role: "Admin",
  email: "errortest@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};

describe("POST /regisAdmin, [FAILED  REGISTER CASE]", () => {
  test("Should return status 400 when name null", (done) => {
    let nameNull = {
      ...errorRegisterAdmin,
      name: null,
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      passportNumber: null,
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      roleNull: null,
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      email: null,
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      email: "test1@mail.com",
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      email: "test1mail.com",
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      password: null,
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      password: "pass",
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      phoneNumber: null,
    };
    request(app)
      .post("/regisAdmin")
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
      ...errorRegisterAdmin,
      status: null,
    };
    request(app)
      .post("/regisAdmin")
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
