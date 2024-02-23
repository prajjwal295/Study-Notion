const User = require("../models/User");
const mailSender = require("../utils/mailSend");

// change password forgot password

exports.forgotPasswordToken = async (req, res) => {
  try {
    // get email from req body;
    const { email } = req.body;

    //   checkuser for this email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "this email is not  registered || Please Try Again",
      });
    }

    //   create token for unique link generation
    const token = crypto.randomUUID();
    //   update user by adding token and expiration time -->why??
    const updatedDetails = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        token: token,
        forgotPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    // send url

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link : ${url}`
    );
    // return responsse

    return res.json({
      success: true,
      message: "Email sent Successfully with the link url",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong in reset",
    });
  }
};

exports.resetPassword = async (req, res) => {
  // fetch data
  // validation
  // get user details from db using token
  // if no entry then invalid token
  // time expire token check
  // hash password and change in db
  //   return res
  try {
    const { password, confirmPassword, token } = req.body;

    if (password != confirmPassword) {
      return res.json({
        success: false,
        message: "password not matching",
      });
    }

    const userDetails = await User.findOne({ token: token });

    if (!userDetails) {
      return res.status(500).json({
        success: false,
        message: "token is invalid",
      });
    }

    if (userDetails.forgotPasswordExpires < Date.now()) {
      {
        return res.json({
          success: false,
          message: "token is expired",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "User Password Changed",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "something went wrong in reset",
    });
  }
};
