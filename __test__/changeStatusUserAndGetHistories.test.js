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
    {
      // 14
      name: "Penumpang",
      passportNumber: "243624572",
      role: "Penumpang",
      email: "Penumpang@mail.com",
      password: "password",
      phoneNumber: "547485227658386",
      status: "ArrivalProcedure",
    },
  ];
  const quarantineLocation = [
    {
      name: "dummy Hotel",
      address: "jl. dummy",
      type: "Hotel",
    },
    {
      name: "dummy Wisma",
      address: "jl. dummy",
      type: "Wisma",
    },
    {
      name: "dummy Penginapan",
      address: "jl. dummy",
      type: "Penginapan",
    },
  ];

  User.create(adminLoginTest)
    .then(() => User.bulkCreate(userChangeStatus))
    .then(() =>
      QuarantineLocation.bulkCreate(quarantineLocation, { createdBy: 1 })
    )
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
    QuarantineDetail.create(quarantine, { createdBy: 2 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Interview'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
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
    QuarantineDetail.create(quarantine, { createdBy: 3 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Interviewed'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
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
    QuarantineDetail.create(quarantine, { createdBy: 4 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Exit Terminal'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
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
    QuarantineDetail.create(quarantine, { createdBy: 5 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "DriverHotel",
          passportNumber: "462752625727",
          email: "DriverHotel@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "DriverHotel",
          status: "Active",
        };
        return request(app)
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
              });
          });
      });
  });
});

describe("PUT /users/:id, return status user: On route [SUCCESS  PUT STATUS USER CASE]  when role DriverWisma", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 6,
      locationId: 2,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    QuarantineDetail.create(quarantine, { createdBy: 6 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "DriverWisma",
          passportNumber: "462752625727",
          email: "DriverWisma@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "DriverWisma",
          status: "Active",
        };
        return request(app)
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
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("name", expect.any(String));
                    expect(body).toHaveProperty(
                      "passportNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("role", expect.any(String));
                    expect(body).toHaveProperty("email", expect.any(String));
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
              });
          });
      });
  });
});

describe("PUT /users/:id, return status user: Briefing || Quarantine [SUCCESS  PUT STATUS USER CASE]  when role OfficerWisma || OfficerHotel ", () => {
  beforeEach((done) => {
    const quarantine1 = {
      userId: 7,
      locationId: 1,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Nederland",
      tripDeatination: "Den Haag",
      isQuarantined: false,
    };
    const quarantine2 = {
      userId: 8,
      locationId: 2,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };

    QuarantineDetail.create(quarantine1, { createdBy: 7 })
      .then(() => QuarantineDetail.create(quarantine2, { createdBy: 8 }))
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Quarantine'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "OfficerHotel",
          passportNumber: "462752625727",
          email: "OfficerHotel@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "OfficerHotel",
          status: "Active",
        };
        return request(app)
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    done();
                  });
              });
          });
      });
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    done();
                  });
              });
          });
      });
  });
});

describe("PUT /users/:id, return status user: Quarantine [SUCCESS  PUT STATUS USER CASE]  when role OfficerWisma", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 9,
      locationId: 2,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    QuarantineDetail.create(quarantine, { createdBy: 9 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Quarantine'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "OfficerWisma",
          passportNumber: "462752625727",
          email: "OfficerWisma@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "OfficerWisma",
          status: "Active",
        };
        return request(app)
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
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

    QuarantineDetail.create(quarantine, { createdBy: 10 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'Quarantine'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
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
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "HealthOfficial",
          passportNumber: "462752625727",
          email: "HealthOfficial@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "HealthOfficial",
          status: "Active",
        };
        return request(app)
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
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
  test(" 200, Should return user with status: 'Finished'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "OfficerHotel",
          passportNumber: "462752625727",
          email: "OfficerHotel@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "OfficerHotel",
          status: "Active",
        };
        return request(app)
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
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
              });
          });
      });
  });
});

//  ERROR NEED FIX
describe("PUT /users/:id, return status user: Finished [SUCCESS  PUT STATUS USER CASE]  when role OfficerWisma", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 13,
      locationId: 2,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };
    QuarantineDetail.create(quarantine, { createdBy: 1 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 200, Should return user with status: 'On route'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("id", expect.any(Number));
                    expect(body).toHaveProperty("name", expect.any(String));
                    expect(body).toHaveProperty(
                      "passportNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("role", expect.any(String));
                    expect(body).toHaveProperty("email", expect.any(String));
                    expect(body).toHaveProperty(
                      "phoneNumber",
                      expect.any(String)
                    );
                    expect(body).toHaveProperty("status", expect.any(String));
                    return done();
                  });
              });
          });
      });
  });
});

describe("GET /histories", () => {
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
  test(" 200, some Object", (done) => {
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
          .get("/histories")
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
  test(" 401, [ERROR CASE] when INVALID TOKEN", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        let invalidToken =
          "3462574gqejibisavbuqg9873tf73/fywgf9wqgf97qgffqwfe-wrbhwvergqergvqergqegqegqegqe-qrghqerhqehqeh/htwhwrtwrth";

        return request(app)
          .get("/histories")
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

//  ERROR CASE

describe("PUT /users/:id, [FAILED  PUT STATUS USER CASE]", () => {
  test(" 401, Should return error message when Token Invalid", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "DriverWisma",
          passportNumber: "462752625727",
          email: "DriverWisma@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "DriverWisma",
          status: "Active",
        };
        return request(app)
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
  });
  test(" 403, Should return error message when Unauthorized", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        let officerHealth = {
          name: "HealthOfficial",
          passportNumber: "462752625727",
          email: "HealthOfficial@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "HealthOfficial",
          status: "Active",
        };
        return request(app)
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
  });
  test(" 404, Should return error message when User NotFound", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "DriverWisma",
          passportNumber: "462752625727",
          email: "DriverWisma@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "DriverWisma",
          status: "Active",
        };
        return request(app)
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
                  .put("/users/29577")
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
  test(" 404, Should return error message when User NotFound", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "DriverWisma",
          passportNumber: "462752625727",
          email: "DriverWisma@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "DriverWisma",
          status: "Active",
        };
        return request(app)
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
                  .put("/users/14")
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
});

describe("PUT /users/:id, return message [FAILED  PUT STATUS USER CASE]  when Quarantine Detail null", () => {
  test(" 404, Should return message", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
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
                  .put("/users/3984")
                  .set("Accept", "application/json")
                  .set("access_token", tokenOfficer)
                  .then((res) => {
                    const { status, body } = res;
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", expect.any(String));
                    return done();
                  });
              });
          });
      });
  });
});

describe("PUT /users/:id, return message [FAILLED  PUT STATUS USER CASE]  when isQuarantined: true", () => {
  test("403, Should return user with status: 'On route'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "OfficerWisma",
          passportNumber: "462752625727",
          email: "OfficerWisma@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "OfficerWisma",
          status: "Active",
        };
        return request(app)
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
});

describe("PUT /users/:id, return message [FAILED  PUT STATUS USER CASE]  when role DriverHotel and type !== Hotel", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 5,
      locationId: 3,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };

    QuarantineDetail.create(quarantine, { createdBy: 5 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 403, Should return user with status: 'On route'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "DriverHotel",
          passportNumber: "462752625727",
          email: "DriverHotel@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "DriverHotel",
          status: "Active",
        };
        return request(app)
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
                    expect(status).toBe(403);
                    expect(body).toHaveProperty("message", expect.any(String));
                    return done();
                  });
              });
          });
      });
  });
});

describe("PUT /users/:id, return message [FAILED  PUT STATUS USER CASE]  when role OfficerHotel and Type !== Hotel", () => {
  beforeEach((done) => {
    const quarantine = {
      userId: 7,
      locationId: 3,
      roomNumber: "5A",
      quarantineuntil: new Date(),
      tripOrigin: "Germany",
      tripDeatination: "Berlin",
      isQuarantined: false,
    };

    QuarantineDetail.create(quarantine, { createdBy: 1 })
      .then(() => done())
      .catch((err) => done(err));
  });
  test(" 403, Should return user with status: 'Quarantine'", (done) => {
    const loginAdmin = {
      email: "test1@mail.com",
      password: "password",
    };
    request(app)
      .post("/login")
      .send(loginAdmin)
      .then((data) => {
        let token = data.body.access_token;
        const payload = {
          name: "OfficerHotel",
          passportNumber: "462752625727",
          email: "OfficerHotel@mail.com",
          password: "password",
          phoneNumber: "236234632632",
          role: "OfficerHotel",
          status: "Active",
        };
        return request(app)
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
                    expect(status).toBe(403);
                    expect(body).toHaveProperty("message", expect.any(String));
                    return done();
                  });
              });
          });
      });
  });
});
