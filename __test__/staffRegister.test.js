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
  const uadminCreate = {
    name: "DriverWisma",
    email: "DriverWisma@mail.com",
    passportNumber: "657626527",
    password: "password",
    phoneNumber: "563737",
    role: "DriverWisma",
    status: "Active",
  };
  User.create(adminLoginTest)
    .then(() => {
      User.create(uadminCreate);
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

let payload = {
  name: "DriverWisma",
  email: "DriverWisma1@mail.com",
  passportNumber: "462752625727",
  password: "password",
  phoneNumber: "236234632632",
  role: "DriverWisma",
  status: "Active",
};
describe("POST /staffs, [SUCCESS  REGISTER CASE]", () => {
  test("Should return status 201", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(201);
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

let loginError = {
  name: "DriverWisma",
  email: "DriverWisma1@mail.com",
  password: "password",
  phoneNumber: "236234632632",
  role: "DriverWisma",
  status: "Active",
};
describe("POST /staffs, [FAILED  REGISTER CASE] ", () => {
  test("Should return status 400 when Name null", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let nameNull = {
      ...loginError,
      name: null,
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(nameNull)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when Email Null", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let emailNull = {
      ...loginError,
      email: null,
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(emailNull)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when password Null", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let passwordNull = {
      ...loginError,
      password: null,
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(passwordNull)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when phoneNumber Null", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let phoneNumberNull = {
      ...loginError,
      phoneNumber: null,
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(phoneNumberNull)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when Role Null", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let roleNumberNull = {
      ...loginError,
      role: null,
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(roleNumberNull)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when Email Failed", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let emailFailed = {
      ...loginError,
      email: "DriverWisma1 mail.com",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(emailFailed)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when Role Undefined in database", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let roleAcception = {
      ...loginError,
      Role: "petugas keamanan",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(roleAcception)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("Should return status 400 when Password less than 6 character", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let roleAcception = {
      ...loginError,
      Role: "pass",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(roleAcception)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("Should return status 400 when Email already Exists", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let emailReadyExists = {
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
      .send(emailReadyExists)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});
