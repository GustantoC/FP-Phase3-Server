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
  const quarantineDetails = {
    userId: 2,
    locationId: 1,
    roomNumber: "5A",
    createdAt: new Date(),
    updatedAt: new Date(),
    quarantineUntil: new Date(),
    tripOrigin: "Germany",
    tripDestination: "Berlin",
    isQuarantined: true,
  };

  const quarantineLocation = [
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

  User.create(adminLoginTest);
  User.create(user);
  QuarantineLocation.bulkCreate(quarantineLocation);
  QuarantineDetail.create(quarantineDetails)
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

describe("GET /quarantines", () => {
  console.log("masuk ksini gak");
  test("200, [SUCCESS CASE]", (done) => {
    const token = TokenHelper.signPayload({
      email: "ArrivalProcedure@mail.com",
      password: "password",
    });
    request(app)
      .get("/quarantines")
      .set("Accept", "application/json")
      .set("access_token", token);
    //     //   .then((err, res) => {
    //     //     console.log(err, "INI ERROR <<<<=====================>>>>");
    //     //     // if (err) return done(err);
    //     //     const { body, status } = res;
    //     //     expect(status).toBe(200);
    //     //     expect(Array.isArray(body)).toBeTruthy();
    //     //     expect(body.length).toBeGreaterThan(0);
    //     //     return done();
    //     //   });
  });
});
