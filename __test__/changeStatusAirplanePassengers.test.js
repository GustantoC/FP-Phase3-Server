const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const TokenHelper = require("../helpers/TokenHelper");

const adminLoginTest = {
  name: "test",
  passportNumber: "09437410364326",
  role: "Admin",
  email: "test@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};
const officialAirport = {
  name: "test1",
  passportNumber: "15414616",
  role: "OfficerAirport",
  email: "test1@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};
const officialDriverHotel = {
  name: "test2",
  passportNumber: "5487257",
  role: "DriverHotel",
  email: "test2@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};
const officialDriverWisma = {
  name: "test3",
  passportNumber: "35163893",
  role: "DriverWisma",
  email: "test3@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};
const officialrHotel = {
  name: "test4",
  passportNumber: "0742562557",
  role: "OfficerHotel",
  email: "test4@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};
const officialWisma = {
  name: "test5",
  passportNumber: "09437410364326",
  role: "OfficerWisma",
  email: "test5mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};
const helathOfficial = {
  name: "test6",
  passportNumber: "6835272578",
  role: "HealthOfficial",
  email: "test6@mail.com",
  password: "password",
  phoneNumber: "111333",
  status: "Active",
};

const userChangeStatus1 = {
  name: "testuser",
  passportNumber: "9804535",
  role: "User",
  email: "testUser@mail.com",
  password: "password",
  phoneNumber: "4532461",
  status: "ArrivalProcedure",
};
const userChangeStatus2 = {
  name: "testuser2",
  passportNumber: "9804535",
  role: "User",
  email: "testUser2@mail.com",
  password: "password",
  phoneNumber: "4532461",
  status: "Interview",
};
const userChangeStatus3 = {
  name: "testuser2",
  passportNumber: "9804535",
  role: "User",
  email: "testUser2@mail.com",
  password: "password",
  phoneNumber: "4532461",
  status: "Interviewed",
};
const userChangeStatus4 = {
  name: "testuser2",
  passportNumber: "9804535",
  role: "User",
  email: "testUser2@mail.com",
  password: "password",
  phoneNumber: "4532461",
  status: "Exit Terminal",
};
beforeAll((done) => {
  User.create(adminLoginTest)
    .then(() => {
      User.create(officialAirport);
    })
    .then(() => {
      User.create(officialDriverHotel);
    })
    .then(() => {
      User.create(officialDriverWisma);
    })
    .then(() => {
      User.create(officialrHotel);
    })
    .then(() => {
      User.create(officialWisma);
    })
    .then(() => {
      User.create(helathOfficial);
    })
    .then(() => {
      User.create(userChangeStatus1);
    })
    .then(() => {
      User.create(userChangeStatus2);
    })
    .then(() => {
      User.create(userChangeStatus3);
    })
    .then(() => {
      User.create(userChangeStatus4);
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

describe("PUT /users:id", () => {
  // test("200 should return object [SUCCES change STATUS USER  FROM ArrivalProcedure TO Interview WITH ROLE OFFICER: OfficerAirport]", (done) => {
  //   let access_token = TokenHelper.signPayload({
  //     email: "test1@mail.com",
  //     password: "password",
  //   });
  //   request(app)
  //     .put("/users/7")
  //     .set("Accept", "application/json")
  //     .set("access_token", access_token)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       const { status, body } = res;
  //       expect(status).toBe(200);
  //       console.log(status, body, "<<<<<===========");
  //       expect(body).toHaveProperty("id", expect.any(Number));
  //       expect(body).toHaveProperty("name", expect.any(String));
  //       expect(body).toHaveProperty("passportNumber", expect.any(String));
  //       expect(body).toHaveProperty("role", expect.any(String));
  //       expect(body).toHaveProperty("email", expect.any(String));
  //       expect(body).toHaveProperty("phoneNumber", expect.any(String));
  //       expect(body).toHaveProperty("status", expect.any(String));
  //       return done();
  //     });

  // });
  test("200 should return object [SUCCES PUT STATUS USER FROM Interview TO Interviewed WITH ROLE OFFICER: OfficerAirport]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    request(app)
      .put("/users/8")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        // console.log(status, body, "<<<<<===========");
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
  //     test("200 should return object [SUCCES PUT STATUS USER FROM Exit Terminal TO On route WITH ROLE OFFICER: OfficerAirport]", (done) => {
  //       let access_token = TokenHelper.signPayload({
  //         email: "test1@mail.com",
  //         password: "password",
  //       });
  //       request(app)
  //         .put("/users/11")
  //         .set("Accept", "application/json")
  //         .set("access_token", access_token)
  //         .end((err, res) => {
  //           if (err) return done(err);
  //           const { status, body } = res;
  //           expect(status).toBe(200);
  //           // console.log(status, body, "<<<<<===========");
  //           expect(body).toHaveProperty("id", expect.any(Number));
  //           expect(body).toHaveProperty("name", expect.any(String));
  //           expect(body).toHaveProperty("passportNumber", expect.any(String));
  //           expect(body).toHaveProperty("role", expect.any(String));
  //           expect(body).toHaveProperty("email", expect.any(String));
  //           expect(body).toHaveProperty("phoneNumber", expect.any(String));
  //           expect(body).toHaveProperty("status", expect.any(String));
  //           return done();
  //         });
  //     });
  //   test("200 should return object [SUCCES PUT STATUS USER FROM Exit Terminal TO On route WITH ROLE OFFICER: DriverHotel]", (done) => {
  //     let access_token = TokenHelper.signPayload({
  //       email: "test2@mail.com",
  //       password: "password",
  //     });
  //     request(app)
  //       .put("/users/11")
  //       .set("Accept", "application/json")
  //       .set("access_token", access_token)
  //       .end((err, res) => {
  //         if (err) return done(err);
  //         const { status, body } = res;
  //         expect(status).toBe(200);
  //         console.log(status, body, "<<<<<===========");
  //         expect(body).toHaveProperty("id", expect.any(Number));
  //         expect(body).toHaveProperty("name", expect.any(String));
  //         expect(body).toHaveProperty("passportNumber", expect.any(String));
  //         expect(body).toHaveProperty("role", expect.any(String));
  //         expect(body).toHaveProperty("email", expect.any(String));
  //         expect(body).toHaveProperty("phoneNumber", expect.any(String));
  //         expect(body).toHaveProperty("status", expect.any(String));
  //         return done();
  //       });
  //   });
});

// describe("PUT /users:id", () => {
//   test("200 should return object [SUCCES PUT STATUS USER WITH ROLE OFFICER: OfficerAirport]", (done) => {
//     let access_token = TokenHelper.signPayload({
//       email: "test1@mail.com",
//       password: "password",
//     });
//     request(app)
//       .put("/users/7")
//       .set("Accept", "application/json")
//       .set("access_token", access_token)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { status, body } = res;
//         expect(status).toBe(200);
//         // console.log(status, body, "<<<<<===========");
//         expect(body).toHaveProperty("id", expect.any(Number));
//         expect(body).toHaveProperty("name", expect.any(String));
//         expect(body).toHaveProperty("passportNumber", expect.any(String));
//         expect(body).toHaveProperty("role", expect.any(String));
//         expect(body).toHaveProperty("email", expect.any(String));
//         expect(body).toHaveProperty("phoneNumber", expect.any(String));
//         expect(body).toHaveProperty("status", expect.any(String));
//         return done();
//       });
//   });
// });
// describe("PUT /users:id", () => {
//   test("200 should return object [SUCCES PUT STATUS USER WITH ROLE OFFICER: DriverHotel]", (done) => {
//     let access_token = TokenHelper.signPayload({
//       email: "test2@mail.com",
//       password: "password",
//     });
//     request(app)
//       .put("/users/7")
//       .set("Accept", "application/json")
//       .set("access_token", access_token)
//       .end((err, res) => {
//         if (err) return done(err);
//         const { status, body } = res;
//         expect(status).toBe(200);
//         // console.log(status, body, "<<<<<===========");
//         expect(body).toHaveProperty("id", expect.any(Number));
//         expect(body).toHaveProperty("name", expect.any(String));
//         expect(body).toHaveProperty("passportNumber", expect.any(String));
//         expect(body).toHaveProperty("role", expect.any(String));
//         expect(body).toHaveProperty("email", expect.any(String));
//         expect(body).toHaveProperty("phoneNumber", expect.any(String));
//         expect(body).toHaveProperty("status", expect.any(String));
//         return done();
//       });
//   });
// });
