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
  const userChangeStatus = {
    name: "testuser",
    passportNumber: "9804535",
    role: "User",
    email: "testUser@mail.com",
    password: "password",
    phoneNumber: "4532461",
    status: "ArrivalProcedure",
  };
  User.create(adminLoginTest)
    .then(() => {
      User.create(userChangeStatus);
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

describe("GET /users ", () => {
  test(" 200, should be return an array of object  [SUCCES GET DATA USERS]", (done) => {
    let access_token = TokenHelper.signPayload({
      id: 1,
      email: "test1@mail.com",
      password: "password",
    });
    request(app)
      .get("/users")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        expect(Array.isArray(body.pageData)).toBeTruthy();
        expect(body.pageData.length).toBeGreaterThan(0);
        return done();
      });
  });
});

describe("GET /users:id", () => {
  test("200 should return object [SUCCESS CASE]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
      role: "Admin",
    });
    request(app)
      .get("/users/1")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
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
  test("401 should return message [FAILED CASE] when not set access_token", (done) => {
    request(app)
      .get("/users/1")
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", expect.any(String));
        return done();
      });
  });

  test("404 should return message [FAILED CASE]", (done) => {
    let access_token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
      role: "User",
    });
    request(app)
      .get("/users/11004")
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
  test("404 should return message [FAILED CASE]", (done) => {
    let invalidToken =
      "3462574gqejibisavbuqg9873tf73/fywgf9wqgf97qgffqwfe-wrbhwvergqergvqergqegqegqegqe-qrghqerhqehqeh/htwhwrtwrth";

    request(app)
      .get("/users/11004")
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

// describe("GET /users [CASE FAILED]", () => {
//   function defuse(promise) {
//     promise.catch(() => {});
//     return promise;
//   }
//   const loginUser = {
//     email: "testUser@mail.com",
//     password: "password",
//   };
//   test.only("INTERNAL SERVER ERROR", (done) => {
//     request(app)
//       .post("/login")
//       .set("Accept", "application/json")
//       .send(loginUser)
//       .then((data) => {
//         const addMock = jest.spyOn(User, "useerList");
//         addMock.mockImplementation(() =>
//           defuse(Promise.reject(new Error("test1")))
//         );
//         return request(app)
//           .get("/users")
//           .set("Accept", "application/json")
//           .set("access_token", data.body.access_token)
//           .then((res) => {
//             expect(res.status).toBe(500);
//             addMock.mockReset();
//             done();
//           });
//       })

//       .catch((err) => {
//         done(err);
//       });
//   });
// });
