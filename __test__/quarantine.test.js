const request = require("supertest");
const app = require("../app");
const { User, QuarantineDetail, QuarantineLocation } = require("../models");
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
    name: "ArrivalProcedure",
    passportNumber: "2624624",
    role: "User",
    email: "ArrivalProcedure@mail.com",
    password: "password",
    phoneNumber: "14547257",
    status: "ArrivalProcedure",
  };

  User.create(adminLoginTest)
    .then(() => User.create(user))
    .then(() => done())
    .catch((err) => done(err));
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then((_) => {
      return QuarantineLocation.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then((_) => {
      return QuarantineDetail.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /quarantines [SUCCESS CASE]", () => {
  beforeEach((done) => {
    const quarantineLocation = [
      {
        name: "Wisma Atlet Pademangan",
        address:
          "Jl. Pademangan IX No.113, RW.10, Pademangan Tim., Kec. Pademangan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14410",
        type: "Wisma",
      },
      {
        name: "Mandarin Oriental Jakarta",
        address:
          "Jl. MH Thamrin, RT.1/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
        type: "Hotel",
      },
    ];
    const quarantine = {
      userId: 2,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDestination: "Berlin",
      isQuarantined: false,
    };
    QuarantineLocation.bulkCreate(quarantineLocation, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 2 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test("200, [SUCCESS CASE]", (done) => {
    const loginUser = {
      email: "ArrivalProcedure@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginUser)
      .then((data) => {
        let tokenUser = data.body.access_token;
        return request(app)
          .get("/quarantines")
          .set("Accept", "application/json")
          .set("access_token", tokenUser)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(200);
            expect(Array.isArray(body)).toBeTruthy();
            expect(body.length).toBeGreaterThan(0);
            done();
          });
      });
  });
});

describe("PUT /quarantines/:userId [SUCCESS CASE]", () => {
  beforeEach((done) => {
    const quarantineLocation = [
      {
        name: "Wisma Atlet Pademangan",
        address:
          "Jl. Pademangan IX No.113, RW.10, Pademangan Tim., Kec. Pademangan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14410",
        type: "Wisma",
      },
      {
        name: "Mandarin Oriental Jakarta",
        address:
          "Jl. MH Thamrin, RT.1/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
        type: "Hotel",
      },
    ];
    const quarantine = {
      userId: 2,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDestination: "Berlin",
      isQuarantined: false,
    };
    QuarantineLocation.bulkCreate(quarantineLocation, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 2 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test("200, [SUCCESS CASE]", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let tokenAdmin = data.body.access_token;
        const payload = {
          name: "OfficerAirport",
          passportNumber: "462752625727",
          email: "OfficerAirport@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "OfficerAirport",
          status: "Active",
        };
        return request(app)
          .post("/staffs")
          .set("Accept", "application/json")
          .set("access_token", tokenAdmin)
          .send(payload)
          .then(() => {
            const loginOfficer = {
              email: "OfficerAirport@mail.com",
              password: "password",
            };
            return request(app)
              .post("/login")
              .send(loginOfficer)
              .then((data) => {
                let tokenOffier = data.body.access_token;
                const updateQuarantineLocation = {
                  locationId: 1,
                  roomNumber: "10D",
                  quarantineUntil: new Date(),
                  tripOrigin: "Mexico",
                  tripDestination: "Pátzcuaro",
                };
                return request(app)
                  .put("/quarantines/2")
                  .set("Accept", "application/json")
                  .set("access_token", tokenOffier)
                  .send(updateQuarantineLocation)
                  .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("userId", expect.any(Number));
                    expect(body).toHaveProperty(
                      "locationId",
                      expect.any(Number)
                    );
                    expect(body).toHaveProperty(
                      "roomNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty(
                      "quarantineUntil",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty(
                      "tripOrigin",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty(
                      "tripDestination",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty(
                      "isQuarantined",
                      expect.any(Boolean)
                    );
                    done();
                  });
              });
          });
      });
  });
});

// Error Case
describe("GET /quarantines [ERROR CASE]", () => {
  test("404, [FAILED CASE] when response NULL", (done) => {
    const registeruser = {
      name: "ArrivalProcedure1",
      passportNumber: "2624624",
      role: "User",
      email: "ArrivalProcedure1@mail.com",
      password: "password",
      phoneNumber: "14547257",
      status: "ArrivalProcedure",
    };
    request(app)
      .post("/register")
      .send(registeruser)
      .then(() => {
        const loginNewUser = {
          email: "ArrivalProcedure1@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginNewUser)
          .then((data) => {
            let tokenNewUser = data.body.access_token;
            return request(app)
              .get("/quarantines")
              .set("Accept", "application/json")
              .set("access_token", tokenNewUser)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
              });
          });
      });
  });
  test("404, [SUCCESS CASE]", (done) => {
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
          .get("/quarantines")
          .set("Accept", "application/json")
          .set("access_token", tokenAdmin)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});

describe("PUT /quarantines/:userId [FAILED CASE]", () => {
  beforeEach((done) => {
    const quarantineLocation = [
      {
        name: "Wisma Atlet Pademangan",
        address:
          "Jl. Pademangan IX No.113, RW.10, Pademangan Tim., Kec. Pademangan, Kota Jkt Utara, Daerah Khusus Ibukota Jakarta 14410",
        type: "Wisma",
      },
      {
        name: "Mandarin Oriental Jakarta",
        address:
          "Jl. MH Thamrin, RT.1/RW.5, Menteng, Kec. Menteng, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10310",
        type: "Hotel",
      },
    ];
    const quarantine = {
      userId: 2,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDestination: "Berlin",
      isQuarantined: false,
    };
    QuarantineLocation.bulkCreate(quarantineLocation, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 2 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test("200, [FAILED CASE] when role: Admin ", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let tokenAdmin = data.body.access_token;
        const updateQuarantineLocation = {
          locationId: 1,
          roomNumber: "10D",
          quarantineUntil: new Date(),
          tripOrigin: "Mexico",
          tripDestination: "Pátzcuaro",
        };
        return request(app)
          .put("/quarantines/2")
          .set("Accept", "application/json")
          .set("access_token", tokenAdmin)
          .send(updateQuarantineLocation)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
  test("200, [FAILED CASE] when role: User ", (done) => {
    const loginUser = {
      email: "ArrivalProcedure@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginUser)
      .then((data) => {
        let tokenUser = data.body.access_token;
        const updateQuarantineLocation = {
          locationId: 1,
          roomNumber: "10D",
          quarantineUntil: new Date(),
          tripOrigin: "Mexico",
          tripDestination: "Pátzcuaro",
        };
        return request(app)
          .put("/quarantines/2")
          .set("Accept", "application/json")
          .set("access_token", tokenUser)
          .send(updateQuarantineLocation)
          .then((res) => {
            const { status, body } = res;
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", expect.any(String));
            done();
          });
      });
  });
});

describe("PUT /quarantines/:userId [FAILED CASE]", () => {
  test("200, [ERROR CASE] when locationId: NOTFOUND", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let tokenAdmin = data.body.access_token;
        const payload = {
          name: "OfficerAirport",
          passportNumber: "462752625727",
          email: "OfficerAirport@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "OfficerAirport",
          status: "Active",
        };
        return request(app)
          .post("/staffs")
          .set("Accept", "application/json")
          .set("access_token", tokenAdmin)
          .send(payload)
          .then(() => {
            const loginOfficer = {
              email: "OfficerAirport@mail.com",
              password: "password",
            };
            return request(app)
              .post("/login")
              .send(loginOfficer)
              .then((data) => {
                let tokenOffier = data.body.access_token;
                const updateQuarantineLocation = {
                  roomNumber: "10D",
                  quarantineUntil: new Date(),
                  tripOrigin: "Mexico",
                  tripDestination: "Pátzcuaro",
                };
                return request(app)
                  .put("/quarantines/6")
                  .set("Accept", "application/json")
                  .set("access_token", tokenOffier)
                  .send(updateQuarantineLocation)
                  .then((res) => {
                    const { status, body } = res;
                    console.log(status, body);
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", expect.any(String));
                    done();
                  });
              });
          });
      });
  });
});
