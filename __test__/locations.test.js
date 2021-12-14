const request = require("supertest");
const app = require("../app");
const { User, QuarantineLocation, QuarantineDetail } = require("../models");
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

  const user = {
    name: "testuser",
    passportNumber: "9804535",
    role: "User",
    email: "testUser@mail.com",
    password: "password",
    phoneNumber: "4532461",
    status: "Quarantine",
  };
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => User.create(adminLoginTest))
    .then(() => User.create(user))
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
    .then(() => {
      return QuarantineDetail.destroy({
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

describe("POST /locations  [SUCCESS CASE] POST LOCATION", () => {
  test(" 201, should be return object  [SUCCES POST LOCATION]", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("type", expect.any(String));
            done();
          });
      });
  });
});

describe("GET /locations", () => {
  test(" 200, should be return array  [SUCCES POST LOCATION]", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
          .then(() => {
            return request(app)
              .get("/locations")
              .set("Accept", "application/json")
              .set("access_token", token)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("totalItems", expect.any(Number));
                expect(body).toHaveProperty("totalPages", expect.any(Number));
                expect(body).toHaveProperty("currentPage", expect.any(Number));
                expect(Array.isArray(body.pageData)).toBeTruthy();
                expect(body.pageData.length).toBeGreaterThan(0);
                done();
              });
          });
      });
  });
});

describe("GET /users/:id, return some object [SUCCESS  CASE] ", () => {
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
  test(" 200, Should return object", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        return request(app)
          .get("/locations/2")
          .set("Accept", "application/json")
          .set("access_token", token)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(200);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", expect.any(String));
            expect(body).toHaveProperty("address", expect.any(String));
            expect(body).toHaveProperty("type", expect.any(String));
            done();
          });
      });
  });
});

describe("PUT /locations/:id  [SUCCESS CASE] PUT LOCATION", () => {
  test(" 200, should be return object  [SUCCES POST LOCATION]", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
          .then(() => {
            const updateLocation = {
              name: "Wisma Covid",
              address: "jl.covid",
              type: "Wisma",
            };
            return request(app)
              .put("/locations/1")
              .set("Accept", "application/json")
              .set("access_token", token)
              .send(updateLocation, { id: 1 })
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("name", expect.any(String));
                expect(body).toHaveProperty("address", expect.any(String));
                expect(body).toHaveProperty("type", expect.any(String));
                done();
              });
          });
      });
  });
});

// ERROR CASE
describe("POST /locations  [ERROR CASE] POST LOCATION", () => {
  test(" 400, should be return message when type not Hotel || Wisma", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const newLocation = {
          name: "Dummy Hotel",
          address: "jl.dummy",
          type: "Penginapan",
        };
        return request(app)
          .post("/locations")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(newLocation)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
  test(" 400, should be return message when name Null", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const newLocation = {
          address: "jl.dummy",
          type: "Hotel",
        };
        return request(app)
          .post("/locations")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(newLocation)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
  test(" 400, should be return message when Address Null", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const newLocation = {
          name: "Dummy Hotel",
          type: "Hotel",
        };
        return request(app)
          .post("/locations")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(newLocation)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
  test(" 400, should be return message when Type Null", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const newLocation = {
          name: "Dummy Hotel",
          address: "Jl.hotel",
        };
        return request(app)
          .post("/locations")
          .set("Accept", "application/json")
          .set("access_token", token)
          .send(newLocation)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
  test(" 403, should be return message when Role not Admin", (done) => {
    const loginUser = {
      email: "testUser@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginUser)
      .then((data) => {
        let tokenUser = data.body.access_token;
        const newLocation = {
          name: "Dummy Hotel",
          address: "Jl.hotel",
        };
        return request(app)
          .post("/locations")
          .set("Accept", "application/json")
          .set("access_token", tokenUser)
          .send(newLocation)
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});

describe("PUT /locations/:id  [ERROR CASE] PUT LOCATION", () => {
  test(" 404, should be return message  when Location NOTFOUND", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
          .then(() => {
            const updateLocation = {
              name: "Wisma Covid",
              address: "jl.covid",
              type: "Wisma",
            };
            return request(app)
              .put("/locations/50")
              .set("Accept", "application/json")
              .set("access_token", token)
              .send(updateLocation, { id: 1 })
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
              });
          });
      });
  });
  test(" 400, should be return message  when Location type Not Wisma || Hotel", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
          .then(() => {
            const updateLocation = {
              name: "Wisma Covid",
              address: "jl.covid",
              type: "Penginapan",
            };
            return request(app)
              .put("/locations/1")
              .set("Accept", "application/json")
              .set("access_token", token)
              .send(updateLocation, { id: 1 })
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
              });
          });
      });
  });
});

describe("GET /locations/userId  [ERROR CASE]", () => {
  test("404, should be return message", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        return request(app)
          .get("/locations/59")
          .set("Accept", "application/json")
          .set("access_token", token)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
  test("401, should be return message  [FAILED GET LOCATION] when Invalid Token", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then(() => {
        let invalidToken =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2MzkzMDM1OTR9.6IhbiZdgsdger564dfasveYFZmys6Odtr6Yqlr8SLI20x4U";
        return request(app)
          .get("/locations/2")
          .set("Accept", "application/json")
          .set("access_token", invalidToken)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
  test("404, should be return message  [FAILED GET LOCATION]", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        return request(app)
          .get("/locations/50")
          .set("Accept", "application/json")
          .set("access_token", token)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});

describe("GET /locations", () => {
  test(" 200, should be return array  [SUCCES POST LOCATION]", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        return request(app)
          .get("/locations/1")
          .set("Accept", "application/json")
          .set("access_token", token)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});
