const User = require("../models/User");
const otpGenerater = require("otp-generator");
const Otp = require("../models/Otp");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

//  send otp

exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req body;

    const { email } = req.body;

    // check user existence;

    const checkUserPresent = await User.findOne({ email: email });

    //   if exist then false;
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Exits",
      });
    }

    //   generate otp
    var otp = otpGenerater.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Otp generated ", otp);

    // check otp uniqueness

    const result = await Otp.findOne({ otp: otp });

    while (result) {
      var otp = otpGenerater.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await Otp.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    // create an entry for OTP;

    const otpBody = await Otp.create(otpPayload);
    console.log(otpPayload);

    res.status(200).json({
      success: true,
      message: "OTP send Successfully",
      otpBody,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "OTP sent failed",
    });
  }
};

// signup;

exports.signup = async (req, res) => {
  try {
    // fetch data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      accountType,
      otp,
    } = req.body;

    // checkk for empty fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check for  password and confirm password
    if (password != confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "password and Confirm Password value does not match",
      });
    }

    //check user existance

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Existed",
      });
    }

    // find most recent otp
    const recentOtp = await Otp.find({ email: email })
      .sort({ createdAT: -1 })
      .limit(1);
    console.log({ recentOtp });

    // validate otp

    if (recentOtp.length == 0) {
      // otp not found
      return res.status(400).json({
        success: false,
        message: "Otp  not found",
      });
    } else if (otp != recentOtp[0].otp) {
      // otp not matched
      return res.status(400).json({
        success: false,
        message: "Otp  not matched",
      });
    }

    // Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    // create entry in db;

    const profileDetails = await Profile.create({
      gender: null,
      dob: null,
      about: null,
      contact: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/7.x/personas/svg?seed=${Math.floor(
        Math.random() * 101
      )}`,
    });

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user.token = token;
    user.password = undefined;

    // create cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // send response
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Login success",
      token,
    });

    // return res
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "User creation failed",
    });
  }
};

// login

exports.login = async (req, res) => {
  try {
    // get data from req
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "field can not be empty",
      });
    }

    // user existence check

    const user = await User.findOne({ email }).populate("additionalDetails").exec();

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "user is not existed in database || Please signup first",
      });
    }

    // generate jwt token after password matching

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      // create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login success",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Login Failed || Please Try Again",
    });
  }
};

// reset Password

exports.changePassword = async (req, res) => {
  try {
    // get data from req body

    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "wrong email || Please Try Again",
      });
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Password Updated",
    });

  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "Password Updation Failed",
    });
  }
};
