const nodemailer = require("nodemailer");
const { User, QuarantineDetail, QuarantineLocation } = require("../models");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
class MailController {
  static async sendMail(req, res, next) {
    try {
      let { userId } = req.params;
      let UserDetail = await QuarantineDetail.findOne({
        where: { userId: userId },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: QuarantineLocation,
            attributes: ["name", "address"],
          },
        ],
        order: [["createdAt", "DESC"]]
      });
      if (!UserDetail) {
        throw { name: "404", message: "User not found" };
      }
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS
        },
      });

      let mailDetails = {
        from: process.env.EMAIL,
        to: "ambulancecenter.fake@gmail.com",
        subject: "EMERGENCY Ambulance call",
        text: `EMERGENCY CALL! For ${UserDetail.User.name}, 
        Location: ${UserDetail.QuarantineLocation.name}
        Address: ${UserDetail.QuarantineLocation.address} 
        on Room Number ${UserDetail.QuarantineLocation.roomNumber ? UserDetail.QuarantineLocation.roomNumber : "<unknown>"}`,
      }

      transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          res.status(503).json({
            message: "Email sent error!",
          })
        } else {
          console.log(data)
          res.status(200).json({
            message: "Email sent successfully",
          })
        }
      });
    } catch (error) {
      next(error)
    }
  }
  static async sendSMS(req, res, next) {
    try {
      //THIS WORKS BUT VERY EXPENSIVE
      let { userId } = req.params;
      let UserDetail = await QuarantineDetail.findOne({
        where: { userId: userId },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
          {
            model: QuarantineLocation,
            attributes: ["name", "address"],
          },
        ],
        order: [["createdAt", "DESC"]]
      });
      if (!UserDetail) {
        throw { name: "404", message: "User not found" };
      }

      client.messages
        .create({
          body: `EMERGENCY CALL! For ${UserDetail.User.name}, 
      Location: ${UserDetail.QuarantineLocation.name}
      Address: ${UserDetail.QuarantineLocation.address} 
      on Room Number ${UserDetail.QuarantineLocation.roomNumber ? UserDetail.QuarantineLocation.roomNumber : "<unknown>"}`, from: '+15305392348', to: '+6287889231322'
        })
        .then(message => {
          console.log(message.sid);
          res.status(200).json({
            message: "SMS sent successfully",
          })
        })
        .catch(err => {
          res.status(503).json({
            message: "SMS sent unsuccessful",
          })
        })
    } catch (error) {
      next(error)
    }
  }
}


module.exports = MailController;
