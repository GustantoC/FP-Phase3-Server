const nodemailer = require("nodemailer");
const { User, QuarantineDetail, QuarantineLocation } = require("../models");

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
            attributes: ["name","address"],
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
        subject: "Ermengency Ambulance call",
        text: `EMERGENCY CALL! For ${UserDetail.User.name}, 
        Location: ${UserDetail.QuarantineLocation.name}
        Address: ${UserDetail.QuarantineLocation.address} 
        on Room Number ${UserDetail.QuarantineLocation.roomNumber ? UserDetail.QuarantineLocation.roomNumber : "<unknown>"}`,
      }

      transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err)
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
}


module.exports = MailController;
