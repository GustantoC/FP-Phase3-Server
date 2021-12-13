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
      name: "ArrivalProcedure",
      passportNumber: "2624624",
      role: "User",
      email: "ArrivalProcedure@mail.com",
      password: "password",
      phoneNumber: "14547257",
      status: "ArrivalProcedure",
    },
    {
      name: "Interview",
      passportNumber: "8635683",
      role: "User",
      email: "Interview@mail.com",
      password: "password",
      phoneNumber: "146257843",
      status: "Interview",
    },
    {
      name: "Interviewed",
      passportNumber: "9806246244535",
      role: "User",
      email: "Interviewed@mail.com",
      password: "password",
      phoneNumber: "3686593",
      status: "Interviewed",
    },
    {
      name: "ExitTerminal",
      passportNumber: "576587600",
      role: "User",
      email: "ExitTerminal@mail.com",
      password: "password",
      phoneNumber: "134623653734",
      status: "Exit Terminal",
    },
    {
      name: "ExitTerminal1",
      passportNumber: "576587600",
      role: "User",
      email: "ExitTerminal1@mail.com",
      password: "password",
      phoneNumber: "134623653734",
      status: "Exit Terminal",
    },
    {
      name: "Onroute",
      passportNumber: "874944947",
      role: "User",
      email: "Onroute@mail.com",
      password: "password",
      phoneNumber: "257273673658",
      status: "On route",
    },
    {
      name: "Onroute1",
      passportNumber: "874944947",
      role: "User",
      email: "Onroute1@mail.com",
      password: "password",
      phoneNumber: "257273673658",
      status: "On route",
    },
    {
      name: "Briefing",
      passportNumber: "357356835935",
      role: "User",
      email: "Briefing@mail.com",
      password: "password",
      phoneNumber: "376638238",
      status: "Briefing",
    },
    {
      name: "Quarantine",
      passportNumber: "23462562",
      role: "User",
      email: "Quarantine@mail.com",
      password: "password",
      phoneNumber: "52654735690",
      status: "Quarantine",
    },
    {
      name: "SwabPertama",
      passportNumber: "4361654735",
      role: "User",
      email: "SwabPertama@mail.com",
      password: "password",
      phoneNumber: "26257357",
      status: "1st Swab",
    },
    {
      name: "SwabKedua",
      passportNumber: "23462572458",
      role: "User",
      email: "SwabKedua@mail.com",
      password: "password",
      phoneNumber: "265274828",
      status: "2nd Swab",
    },
    {
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

let payload = {
  name: "OfficerAirport",
  passportNumber: "462752625727",
  email: "OfficerAirport@mail.com",
  password: "password",
  phoneNumber: "236234632632",
  role: "OfficerAirport",
  status: "Active",
};

describe("PUT /users/:id, [SUCCESS  PUT STATUS USER CASE]", () => {
  // beforeEach((done) => {
  //   const quarantine = {
  //     userId: 2,
  //     locationId: 1,
  //     roomNumber: "5A",
  //     quarantineuntil: new Date(),
  //     tripOrigin: "Germany",
  //     tripDeatination: "Berlin",
  //     isQuarantined: false,
  //   };
  //   const locationQuarantine = {
  //     name: "dummy Hotel",
  //     address: "jl.dummy",
  //     type: "Hotel",
  //   };
  //   QuarantineLocation.create(locationQuarantine)
  //     .then(() => QuarantineDetail.create(quarantine))
  //     .then(() => done())
  //     .catch((err) => done(err));
  // });

  // afterEach((done) => {
  //   QuarantineDetail.update(
  //     { isQuarantined: true },
  //     {
  //       where: { userId: 12 },
  //       updatedBy: 14,
  //     }
  //   )
  //     .then(() => done())
  //     .catch((err) => done(err));
  // });
  test.only(" 200, Should return user with status: 'Interview' when role officialofficial: OfficerAirport", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
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
            console.log(data, "<<<<<========== data access_token");
            // let token = data.access_token
            // let tokenOfficer = TokenHelper.signPayload({
            //   id: 14,
            //   email: "OfficerAirport@mail.com",
            //   role: "OfficerAirport",
            // });
            return request(app)
              .put("/users/14")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                // console.log(body, status, "<<<<<<<<<<==============");
                expect(status).toBe(200);
                // expect(body).toHaveProperty("id", expect.any(Number));
                // expect(body).toHaveProperty("name", expect.any(String));
                // expect(body).toHaveProperty(
                //   "passportNumber",
                //   expect.any(String)
                // );
                // expect(body).toHaveProperty("role", expect.any(String));
                // expect(body).toHaveProperty("email", expect.any(String));
                // expect(body).toHaveProperty("phoneNumber", expect.any(String));
                // expect(body).toHaveProperty("status", expect.any(String));
                done();
              });
          });
      });
  });
  test(" 200, Should return user with status: 'Interviewed' when role official: OfficerAirport", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

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
            let tokenOfficer = TokenHelper.signPayload({
              email: "OfficerAirport@mail.com",
              password: "password",
            });
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
                done();
              });
          });
      });
  });
  test(" 200, Should return user with status: 'Exit Terminal' when role official: OfficerAirport", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

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
            let tokenOfficer = TokenHelper.signPayload({
              email: "OfficerAirport@mail.com",
              password: "password",
            });
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
                done();
              });
          });
      });
  });
  test(" 200, Should return user with status: 'On route' when role official: DriverHotel", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let driverHotel = {
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
      .send(driverHotel)
      .then(() => {
        const loginOfficer = {
          email: "DriverHotel@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "DriverHotel@mail.com",
              password: "password",
            });
            return request(app)
              .put("/users/5")
              .set("Accept", "application/json")
              .set("access_token", tokenOfficer)
              .then((res) => {
                const { status, body } = res;
                console.log(body);
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
  test(" 200, Should return user with status: 'On route' when role official: DriverWisma", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let driverWisma = {
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
      .send(driverWisma)
      .then(() => {
        const loginOfficer = {
          email: "DriverWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "DriverWisma@mail.com",
              password: "password",
            });
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
                expect(body).toHaveProperty("phoneNumber", expect.any(String));
                expect(body).toHaveProperty("status", expect.any(String));
                done();
              });
          });
      });
  });
  test(" 200, Should return user with status: 'Quarantine' when role official: OfficerHotel", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let officerHotel = {
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
      .send(officerHotel)
      .then(() => {
        const loginOfficer = {
          email: "OfficerHotel@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "OfficerHotel@mail.com",
              password: "password",
            });
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
  test(" 200, Should return user with status: 'Briefing' when role official: officerWisma", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let officerWisma = {
      name: "officerWisma",
      passportNumber: "462752625727",
      email: "officerWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(officerWisma)
      .then(() => {
        const loginOfficer = {
          email: "officerWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "officerWisma@mail.com",
              password: "password",
            });
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
  test(" 200, Should return user with status: 'Quarantine' when role official: officerWisma", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let officerWisma = {
      name: "officerWisma",
      passportNumber: "462752625727",
      email: "officerWisma@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "OfficerWisma",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(officerWisma)
      .then(() => {
        const loginOfficer = {
          email: "officerWisma@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "officerWisma@mail.com",
              password: "password",
            });
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
                done();
              });
          });
      });
  });
  test(" 200, Should return user with status: '1st Swab' when role officer: HealthOfficial", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let healthOfficial = {
      name: "healthOfficial",
      passportNumber: "462752625727",
      email: "healthOfficial@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "HealthOfficial",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(healthOfficial)
      .then(() => {
        const loginOfficer = {
          email: "healthOfficial@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "healthOfficial@mail.com",
              password: "password",
            });
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
                done();
              });
          });
      });
  });
  test(" 200, Should return user with status: '2nd Swab' when role officer: HealthOfficial", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    let healthOfficial = {
      name: "healthOfficial",
      passportNumber: "462752625727",
      email: "healthOfficial@mail.com",
      password: "password",
      phoneNumber: "236234632632",
      role: "HealthOfficial",
      status: "Active",
    };
    request(app)
      .post("/staffs")
      .set("Accept", "application/json")
      .set("access_token", token)
      .send(healthOfficial)
      .then(() => {
        const loginOfficer = {
          email: "healthOfficial@mail.com",
          password: "password",
        };
        return request(app)
          .post("/login")
          .send(loginOfficer)
          .then(() => {
            let tokenOfficer = TokenHelper.signPayload({
              email: "healthOfficial@mail.com",
              password: "password",
            });
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
                done();
              });
          });
      });
  });
});

// describe("PUT /users/:id, [SUCCESS USER CASE]", () => {
//   beforeEach((done) => {
//     const quarantine = {
//       userId: 12,
//       locationId: 1,
//       roomNumber: "5A",
//       quarantineuntil: new Date(),
//       tripOrigin: "Germany",
//       tripDeatination: "Berlin",
//       isQuarantined: false,
//     };
//     const locationQuarantine = {
//       name: "dummy Hotel",
//       address: "jl.dummy",
//       type: "Hotel",
//     };
//     QuarantineLocation.create(locationQuarantine)
//       .then(() => QuarantineDetail.create(quarantine))
//       .then(() => done())
//       .catch((err) => done(err));
//   });

//   afterEach((done) => {
//     QuarantineDetail.update(
//       { isQuarantined: true },
//       {
//         where: { userId: 12 },
//         updatedBy: 14,
//       }
//     )
//       .then(() => done())
//       .catch((err) => done(err));
//   });
//   test(" 200, Should return user with status: 'Finished' when role officer: OfficerHotel", (done) => {
//     const token = TokenHelper.signPayload({
//       email: "test1@mail.com",
//       password: "password",
//     });
//     let officerHotel = {
//       name: "OfficerHotel",
//       passportNumber: "462752625727",
//       email: "OfficerHotel@mail.com",
//       password: "password",
//       phoneNumber: "236234632632",
//       role: "OfficerHotel",
//       status: "Active",
//     };
//     request(app)
//       .post("/staffs")
//       .set("Accept", "application/json")
//       .set("access_token", token)
//       .send(officerHotel)
//       .then(() => {
//         const tokenOfficerHotel = TokenHelper.signPayload({
//           email: "OfficerHotel@mail.com",
//           password: "password",
//         });
//         return request(app)
//           .put("/users/12")
//           .set("Accept", "application/json")
//           .set("access_token", tokenOfficerHotel)
//           .then((err, res) => {
//             console.log("ada dsisni <<<<<=============================");
//             if (err) return done(err);
//             const { status, body } = res;
//             // console.log(status, body, "<<<<<<<<<======================= body");
//             expect(status).toBe(200);
//             // expect(body).toHaveProperty("id", expect.any(Number));
//             // expect(body).toHaveProperty("name", expect.any(String));
//             // expect(body).toHaveProperty("passportNumber", expect.any(String));
//             // expect(body).toHaveProperty("role", expect.any(String));
//             // expect(body).toHaveProperty("email", expect.any(String));
//             // expect(body).toHaveProperty("phoneNumber", expect.any(String));
//             // expect(body).toHaveProperty("status", expect.any(String));
//             done();
//           });
//       });
//   });
// });

describe("PUT /users/:id, [FAILED  PUT STATUS USER CASE]", () => {
  test(" 401, Should return error message when Token Invalid", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });

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
            let tokenOfficer = TokenHelper.signPayload({
              email: "OfficerAirport@mail.com",
              password: "password",
            });
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
