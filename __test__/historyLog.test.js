const request = require("supertest");
const app = require("../app");
const { User, HistoryLog } = require("../models");
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
  const historyLogs = [
    {
      userId: 2,
      updatedBy: 2,
      description: "New user with ID: 2 created",
    },
    {
      userId: 3,
      updatedBy: 3,
      description: "New Quarantine Detail created for 2",
    },
    {
      userId: 2,
      updatedBy: 2,
      description: "New Quarantine Detail created for 2",
    },
    {
      userId: 3,
      updatedBy: 3,
      description: "New Quarantine Detail created for 2",
    },
    {
      userId: 2,
      updatedBy: 2,
      description: "Status changed from ArrivalProcedure to ArrivalProcedure",
    },
    {
      userId: 3,
      updatedBy: 2,
      description: "New Quarantine Detail created for 2",
    },
    {
      userId: 2,
      updatedBy: 2,
      description: "Status changed from ArrivalProcedure to ArrivalProcedure",
    },
  ];
  const user = [
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
      status: "ArrivalProcedure",
    },
  ];

  User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  HistoryLog.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
    .then(() => User.create(adminLoginTest))
    .then(() => User.bulkCreate(user))
    .then(() => HistoryLog.bulkCreate(historyLogs))
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
      return HistoryLog.destroy({
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
describe("GET /histories", () => {
  test("200, Success get historyLog", (done) => {
    const token = TokenHelper.signPayload({
      email: "test1@mail.com",
      password: "password",
    });
    request(app)
      .get("/histories")
      .set("Accept", "application/json")
      .set("access_token", token)
      .end((err, res) => {
        if (err) return done(err);
        const { status, body } = res;
        expect(status).toBe(200);
        console.log(body);
        expect(body).toHaveProperty("totalItems", expect.any(Number));
        expect(body).toHaveProperty("totalPages", expect.any(Number));
        expect(body).toHaveProperty("currentPage", expect.any(Number));
        expect(body).toHaveProperty("pageData", expect.any(Array));
        return done();
      });
  });
});
