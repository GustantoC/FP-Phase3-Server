const request = require("supertest");
const app = require("../app");
const { User, QuarantineLocation, QuarantineDetail } = require("../models");
const TokenHelper = require("../helpers/TokenHelper");
const { ne } = require("sequelize/dist/lib/operators");

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
  const locations = [
    {
      name: "Wisma Atlet Pademangan",
      address:
        "Jl. Pademangan IX No.113, RW.10, Pademangan Tim., Kec. Pademangan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14410",
      type: "Wisma",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Mandarin Oriental Jakarta",
      address:
        "Jl. MH Thamrin, RT.1/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
      type: "Hotel",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const user = {
    name: "testuser",
    passportNumber: "9804535",
    role: "User",
    email: "testUser@mail.com",
    password: "password",
    phoneNumber: "4532461",
    status: "Quarantine",
  };
  const quarantineDetails = {
    userId: 2,
    locationId: 1,
    roomNumber: "5A",
    quarantineUntil: new Date(),
    tripOrigin: "Germany",
    tripDestination: "Berlin",
    isQuarantined: false,
  };
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => User.create(adminLoginTest))
    .then(() => User.create(user))
    .then(() => QuarantineLocation.bulkCreate(locations))
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
      return QuarantineLocation.destroy({
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

describe("GET /locations", () => {
  test(" 200, should be return object  [SUCCES GET LOCATION]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    request(app)
      .get("/locations")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("totalItems", expect.any(Number));
        expect(body).toHaveProperty("totalPages", expect.any(Number));
        expect(body).toHaveProperty("currentPage", expect.any(Number));
        expect(body).toHaveProperty("pageData", expect.any(Array));
        return done();
      });
  });
  test("401, should be return message  [FAILED GET LOCATION] when Invalid Token", (done) => {
    let invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MzkzMDM1OTR9.6IhbiZdgsdger564dfasveYFZmys6Odtr6Yqlr8SLI20x4U";

    request(app)
      .get("/locations/50")
      .set("Accept", "application/json")
      .set("access_token", invalidToken)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});

describe("GET /locations/userId ", () => {
  test("200, should be return object  [SUCCESS GET LOCATION USER]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    request(app)
      .get("/locations/2")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        return done();
      });
  });
  test("401, should be return message  [FAILED GET LOCATION] when Invalid Token", (done) => {
    let invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MzkzMDM1OTR9.6IhbiZdgsdger564dfasveYFZmys6Odtr6Yqlr8SLI20x4U";
    request(app)
      .get("/locations/2")
      .set("Accept", "application/json")
      .set("access_token", invalidToken)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("404, should be return message  [FAILED GET LOCATION]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    request(app)
      .get("/locations/50")
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

describe("POST /locations  [SUCCESS] POST LOCATION", () => {
  test(" 201, should be return object  [SUCCES POST LOCATION]", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then(() => {
        let token = TokenHelper.signPayload({
          email: "test1@mail.com",
          password: "password",
        });
        const newLocation = {
          name: "Dummy Hotel",
          address: "jl.dummy",
          type: "Hotel",
        };
        return request(app)
          .post("/locations")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(newLocation)
          .then((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            console.log(
              body,
              status,
              "<<<<<<<=============== ini adalah post locations"
            );
            return done();
          });
      });
  });
});

describe("POST /locations [FAILED POST LOCATION]", () => {
  test("400, should be return message  [FAILED POST LOCATION] when Type Not WISMA || HOTEl", (done) => {
    let token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    const newLocation = {
      name: "Dummy Hotel",
      address: "jl.dummy",
      type: "Penginapan",
    };
    const createdBy = {
      createdBy: 1,
    };
    request(app)
      .post("/locations")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(newLocation, createdBy)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("401, should be return message  [FAILED POST LOCATION] when Invalid Token", (done) => {
    let invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MzkzMDM1OTR9.6IhbiZdgsdger564dfasveYFZmys6Odtr6Yqlr8SLI20x4U";
    const newLocation = {
      name: "Dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    const createdBy = {
      createdBy: 1,
    };
    request(app)
      .post("/locations")
      .set("Accept", "application/json")
      .set("access_token", invalidToken)
      .send(newLocation, createdBy)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("400, should be return message  [FAILED POST LOCATION] when Name : Null", (done) => {
    let token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

    const newLocation = {
      address: "jl.dummy",
      type: "Hotel",
    };
    request(app)
      .post("/locations")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(newLocation)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("400, should be return message  [FAILED POST LOCATION] when address : Null", (done) => {
    let token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

    const newLocation = {
      name: "Dummy Hotel",
      type: "Hotel",
    };
    request(app)
      .post("/locations")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(newLocation)
      .end((err, res) => {
        console.log(err);
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
  test("403, should be return message  [FAILED POST LOCATION] when Unauthorized", (done) => {
    let token = TokenHelper.signPayload({
      email: "testUser@mail.com",
      password: "password",
    });

    const newLocation = {
      name: "Dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    request(app)
      .post("/locations")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(newLocation)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });
});
