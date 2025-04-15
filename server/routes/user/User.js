const express = require("express");
const User = require("../../schema/user/UserSchema");
const router = express.Router();
const ReportProblem = require("../../schema/user/ReportProblemSchema");
const { STATUSCODE, STATUSMESSAGE } = require("../../static/Status");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const { userName } = req.query;

    if (userName) {
      const userdetails = await User.findOne({ userName });

      if (!userdetails)
        return res
          .status(STATUSCODE.NOT_FOUND)
          .json({ message: STATUSMESSAGE.NOT_FOUND });

      return res.status(STATUSCODE.OK).json(userdetails);
    }

    const users = await User.find({
      userType: "individual",
    });

    res.json(users);
  } catch (error) {
    res
      .status(STATUSCODE.INTERNAL_SERVER_ERROR)
      .json({ message: STATUSMESSAGE.INTERNAL_SERVER_ERROR });
  }
});

// Route 1 - Update User details
router.post("/update", async (req, res) => {
  try {
    const { Token } = req.cookies;
    const { tagLine, description, city, state, address, country, pincode } =
      req.body;
    const email = jwt.verify(Token, process.env.JWT_SECRET).User.id;

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          tagLine,
          description,
          city,
          state,
          address,
          country,
          pincode,
        },
      },
      { new: true },
    );

    if (!user) {
      return res
        .status(STATUSCODE.NOT_FOUND)
        .json({ message: STATUSMESSAGE.USER_NOT_FOUND });
    }

    return res
      .status(STATUSCODE.OK)
      .json({ message: STATUSMESSAGE.PROFILE_UPDATE_SUCCESS });
  } catch (error) {
    res
      .status(STATUSCODE.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
});

// Route 2 - Report a problem
router.post("/report", async (req, res) => {
  try {
    const currentHour = new Date().getMinutes();
    const previousReports = await ReportProblem.find({
      email: req.body.email,
    }).exec();

    for (let i = 0; i < previousReports.length; i++) {
      let hourOfThisReport = new Date(
        previousReports[i].createdAt,
      ).getMinutes();

      if (hourOfThisReport >= currentHour - 120) {
        return res.status(STATUSCODE.TOO_MANY_REQUESTS).json({
          success: false,
          message: STATUSMESSAGE.TOO_MANY_REQUESTS,
        });
      }
    }

    const data = req.body;

    const ReportData = ReportProblem({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      reportmessage: data.reportmessage,
    });

    await ReportData.save();
    res.status(STATUSCODE.OK).json({ success: true });
  } catch (e) {
    res
      .status(STATUSCODE.INTERNAL_SERVER_ERROR)
      .json({ message: STATUSMESSAGE.INTERNAL_SERVER_ERROR });
  }
});

module.exports = router;
