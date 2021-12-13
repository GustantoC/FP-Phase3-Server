const request = require("supertest");
const app = require("../app");
const {
  User,
  QuarantineDetail,
  QuarantineLocation,
  HistoryLog,
} = require("../models");
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

  const userChangeStatus = [
    {
      // 2
      name: "ArrivalProcedure",
      passportNumber: "2624624",
      role: "User",
      email: "ArrivalProcedure@mail.com",
      password: "password",
      phoneNumber: "14547257",
      status: "ArrivalProcedure",
    },
    {
      // 3
      name: "Interview",
      passportNumber: "8635683",
      role: "User",
      email: "Interview@mail.com",
      password: "password",
      phoneNumber: "146257843",
      status: "Interview",
    },
    {
      // 4
      name: "Interviewed",
      passportNumber: "9806246244535",
      role: "User",
      email: "Interviewed@mail.com",
      password: "password",
      phoneNumber: "3686593",
      status: "Interviewed",
    },
    {
      // 5
      name: "ExitTerminal",
      passportNumber: "576587600",
      role: "User",
      email: "ExitTerminal@mail.com",
      password: "password",
      phoneNumber: "134623653734",
      status: "Exit Terminal",
    },
    {
      // 6
      name: "ExitTerminal1",
      passportNumber: "65462456",
      role: "User",
      email: "ExitTermina1@mail.com",
      password: "password",
      phoneNumber: "26265256257",
      status: "Exit Terminal",
    },
    {
      // 7
      name: "Onroute",
      passportNumber: "874944947",
      role: "User",
      email: "Onroute@mail.com",
      password: "password",
      phoneNumber: "257273673658",
      status: "On route",
    },
    {
      // 8
      name: "Onroute1",
      passportNumber: "874944947",
      role: "User",
      email: "Onroute1@mail.com",
      password: "password",
      phoneNumber: "257273673658",
      status: "On route",
    },
    {
      // 9
      name: "Briefing",
      passportNumber: "357356835935",
      role: "User",
      email: "Briefing@mail.com",
      password: "password",
      phoneNumber: "376638238",
      status: "Briefing",
    },
    {
      // 10
      name: "Quarantine",
      passportNumber: "23462562",
      role: "User",
      email: "Quarantine@mail.com",
      password: "password",
      phoneNumber: "52654735690",
      status: "Quarantine",
    },
    {
      // 11
      name: "SwabPertama",
      passportNumber: "4361654735",
      role: "User",
      email: "SwabPertama@mail.com",
      password: "password",
      phoneNumber: "26257357",
      status: "1st Swab",
    },
    {
      // 12
      name: "SwabKedua",
      passportNumber: "23462572458",
      role: "User",
      email: "SwabKedua@mail.com",
      password: "password",
      phoneNumber: "265274828",
      status: "2nd Swab",
    },
    {
      // 13
      name: "user1",
      passportNumber: "76382571276383",
      role: "User",
      email: "user1@mail.com",
      password: "password",
      phoneNumber: "547485227658386",
      status: "2nd Swab",
    },
  ];

  User.create(adminLoginTest)
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
      return QuarantineDetail.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      return QuarantineLocation.destroy({
        truncate: true,
        cascade: true,
        restartIdentity: true,
      });
    })
    .then(() => {
      return HistoryLog.destroy({
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

describe("PUT /users/:id, return status user: Interview [SUCCESS  PUT STATUS USER CASE]  when role officialofficial", () => {
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
    const locationQuarantine = {
      name: "dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Interview'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerAirport",
      passportNumber: "462752625727",
      email: "OfficerAirport@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerAirport",
      status: "Active",
    };
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
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
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
});

describe("PUT /users/:id, return status user: Interviewed [SUCCESS  PUT STATUS USER CASE]  when role officialofficial", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 3,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Interviewed'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerAirport",
      passportNumber: "462752625727",
      email: "OfficerAirport@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerAirport",
      status: "Active",
    };
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
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
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

describe("PUT /users/:id, return status user: Exit Terminal [SUCCESS  PUT STATUS USER CASE]  when role officialofficial", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 4,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Exit Terminal'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerAirport",
      passportNumber: "462752625727",
      email: "OfficerAirport@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerAirport",
      status: "Active",
    };
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
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/4")
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

describe("PUT /users/:id, return status user: On route [SUCCESS  PUT STATUS USER CASE]  when role DriverHotel", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 5,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "DriverHotel",
      passportNumber: "462752625727",
      email: "DriverHotel@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "DriverHotel",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "DriverHotel@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/5")
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

describe("PUT /users/:id, return status user: On route [SUCCESS  PUT STATUS USER CASE]  when role DriverWisma", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 6,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Wisma",
      address: "jl.dummy",
      type: "Wisma",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "DriverWisma",
      passportNumber: "462752625727",
      email: "DriverWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "DriverWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "DriverWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/6")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                console.log(body, "<<<<<<<===================");
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

describe("PUT /users/:id, return status user: Briefing || Quarantine [SUCCESS  PUT STATUS USER CASE]  when role OfficerWisma || OfficerHotel ", () => {
  beforeEach((done) => {
    const quarantine = [
      {
        userId: 7,
        locationId: 2,
        roomNumber: "5A",
        quarantineuntil: new Date(),
        tripOrigin: "Nederland",
        tripDeatination: "Den Haag",
        isQuarantined: false,
      },
      {
        userId: 8,
        locationId: 1,
        roomNumber: "5A",
        quarantineuntil: new Date(),
        tripOrigin: "Germany",
        tripDeatination: "Berlin",
        isQuarantined: false,
      },
    ];
    const locationQuarantine = [
      {
        name: "dummy Wisma",
        address: "jl.dummy",
        type: "Wisma",
      },
      {
        name: "dummy Hotel",
        address: "jl.dummy",
        type: "Hotel",
      },
    ];
    QuarantineLocation.bulkCreate(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.bulkCreate(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Quarantine'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerHotel",
      passportNumber: "462752625727",
      email: "OfficerHotel@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerHotel",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerHotel@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/7")
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
                done();
              });
          });
      });
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerWisma",
      passportNumber: "462752625727",
      email: "OfficerWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/8")
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
                done();
              });
          });
      });
  });
});

describe("PUT /users/:id, return status user: Quarantine [SUCCESS  PUT STATUS USER CASE]  when role OfficerHotel", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 7,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Quarantine'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerHotel",
      passportNumber: "462752625727",
      email: "OfficerHotel@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerHotel",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerHotel@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/7")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
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

describe("PUT /users/:id, return status user: Quarantine [SUCCESS  PUT STATUS USER CASE]  when role OfficerWisma", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 9,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Wisma",
      address: "jl.dummy",
      type: "Wisma",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerWisma",
      passportNumber: "462752625727",
      email: "OfficerWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/9")
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

describe("PUT /users/:id, return status user: 1st Swab [SUCCESS  PUT STATUS USER CASE]  when role HealthOfficial", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 10,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Wisma",
      address: "jl.dummy",
      type: "Wisma",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
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
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "HealthOfficial@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/10")
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

describe("PUT /users/:id, return status user: 2nd Swab [SUCCESS  PUT STATUS USER CASE]  when role HealthOfficial", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 11,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Wisma",
      address: "jl.dummy",
      type: "Wisma",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
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
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "HealthOfficial@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/11")
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

describe("PUT /users/:id, return status user: Finished [SUCCESS  PUT STATUS USER CASE]  when role OfficerHotel", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 12,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Hotel",
      address: "jl.dummy",
      type: "Hotel",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerWisma",
      passportNumber: "462752625727",
      email: "OfficerWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/12")
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

describe("PUT /users/:id, return status user: Finished [SUCCESS  PUT STATUS USER CASE]  when role OfficerWisma", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 13,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    const locationQuarantine = {
      name: "dummy Wisma",
      address: "jl.dummy",
      type: "Wisma",
    };
    QuarantineLocation.create(locationQuarantine, { createdBy: 1 })
      .then(() => QuarantineDetail.create(quarantine, { createdBy: 1 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerWisma",
      passportNumber: "462752625727",
      email: "OfficerWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/13")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                console.log(body, status, "<<<<<<<<<<==============");
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
    const payload = {
      name: "DriverWisma",
      passportNumber: "462752625727",
      email: "DriverWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "DriverWisma",
      status: "Active",
    };
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
          .post("/login")
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
                done();
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
          .post("/login")
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
                done();
              });
          });
      });
  });
  test(" 404, Should return error message when User NotFound", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    const payload = {
      name: "DriverWisma",
      passportNumber: "462752625727",
      email: "DriverWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "DriverWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "DriverWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
            return request(app)
              .put("/users/29")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", expect.any(String));
                done();
              });
          });
      });
  });
});

describe("PUT /users/:id, return status user: On route [FAILLED  PUT STATUS USER CASE]  when isQuarantined: true", () => {
  test("403, Should return user with status: 'On route'", (done) => {
    const token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      role: "Admin",
    });
    const payload = {
      name: "OfficerWisma",
      passportNumber: "462752625727",
      email: "OfficerWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(payload)
      .then(() => {
        const loginOfficer = {
          email: "OfficerWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then((data) => {
            let tokenOfficer = data.body.access_token;
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
});
