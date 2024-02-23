const razorpay = require("razorpay");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSend");
const { default: mongoose } = require("mongoose");

// captue the payment and initiate the order
exports.capturePayment = async (req, res) => {
  try {
    // get course and user id
    const { courseId } = req.body;
    const userId = req.user.id;

    // validation

    if (!courseId) {
      return res.json({
        success: false,
        Message: "Please provide valid course id",
      });
    }

    // valid courseDetails
    let course;
    try {
      course = await Course.findById(courseId);

      if (!course) {
        return res.json({
          success: false,
          Message: "could not find the course",
        });
      }

      // check user already paid??
      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          Message: "User already enrolled",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        success: false,
        Message: "something went wrong",
      });
    }
    // order create
    const amount = course.price;
    const currency = "INR";

    // option create
    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: courseId,
        userId,
      },
    };

    try {
      // initiate the payment using razorpay
      const paymentResponse = await instance.orders.create(options);

      console.log(paymentResponse);

      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        Message: "something went wrong",
      });
    }
    // return res
  } catch (err) {
    return res.status(400).json({
      success: false,
      Message: "something went wrong in order creation",
    });
  }
};

//

exports.verifySignature = async (erq, res) => {
  try {
    const webhooksecret = "12345";

    const signatue = req.header["x-razorpay-headers"];

    // 3 step proccess to decode webhooke secret

    const shashum = crypto.createHmac("sha256", webhooksecret);

    shashum.update(JSON.stringify(req.body()));

    const digest = shashum.digest("hex");

    // match both sign

    if (digest == signatue) {
      console.log("Payment is Authorized");

      //   finding out after testing
      const { courseId, userId } = req.body.payload.payment.entity.notes;

      try {
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentEnrolled: userId } },
          { new: true }
        );

        if (!enrolledCourse) {
          return res.status(400).json({
            success: false,
            Message: "something went wrong in course enrollement",
          });
        }

        console.log({ enrolledCourse });

        //  User updation
        const enrolledUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          { $push: { courses: courseId } },
          { new: true }
        );
        console.log({ enrolledCourse });

        // send confirmation mail

        await mailSender(
          enrolledUser.email,
          "Course Purchased Succesfully",
          `Hello ${enrolledUser.firstName}! You are now enrolled in the ${enrolledCourse.courseName} course
        `
        );

        return res.status(200).json({
          success: true,
          Message: "course purchased sucessfully",
        });
      } catch (err) {
        return res.status(400).json({
          success: false,
          Message: "something went wrong in course enrollement",
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      Message: "Course Purchase Failed",
    });
  }
};
