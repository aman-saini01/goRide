const User = require("../models/User");
const OTP = require("../models/OTP");
const Driver = require("../models/Driver")
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
require("dotenv").config()
const jwt = require("jsonwebtoken");
exports.signUpUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp } = req.body;
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
        message: "all fields are required",
      });
    }
    if (password !== confirmPassword) {
      return res.status.json({
        success: false,
        message:
          "Password and Confirm Password don not match, please try again!!",
      });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user exists , please login",
      });
    }

    //find otp for the email
    const otpRecord = await OTP.findOne({ email:email });
    console.log("otprecord", otpRecord)
    console.log("otp record from db", otpRecord.otp)
    console.log("otp secret from db", otpRecord.secret)
    if (!otpRecord) {
      // OTP not found for the email
      return res.status(401).json({
        success: false,
        message: "enter valid OTP",
      });
    }
    if(otp !== otpRecord.otp){
      return res.status(401).json({
        success:false,
        message:"otp dont match"
      })
    }

    const verifyOTP = speakeasy.totp.verify({
      secret: otpRecord.secret,
      encoding: "base32",
      token: otp,
      window: 2,
      step:300
    });
    console.log("verify otp", verifyOTP)
    if (!verifyOTP) {
      return res.status(400).json({
        success: false,
        message: "invalid Otp or has expired",
      });
    }
    if (otpRecord.otpExpires < Date.now()) {
        // OTP has expired
        return { success: false, message: "OTP has expired" };
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a new OTP secret for the user
    // const secret = speakeasy.generateSecret({ length: 20 }).base32;
    //create user
    const userSecret = otpRecord.secret
   await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "User",
      secret:userSecret,
    });

    return res.status(200).json({
      success: true,
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "user cant be registered, please try again",
    });
  }
};

//signup controller for Driver
exports.signUpDriver = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      licenseNumber,
      carRegistrationNumber,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !licenseNumber ||
      !carRegistrationNumber
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match, please try again!",
      });
    }

    // Check if user with the same email already exists
    const existingDriver = await Driver.findOne({ email });  
    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login in to continue.",
      });
    }

    // Check if license number is unique
    const existingLicense = await Driver.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({
        success: false,
        message: "Driver with this license number already exists.",
      });
    }

    // Find the most recent OTP for the email
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: "Enter a valid OTP",
      });
    }

    // Verify the OTP using speakeasy
    const isVerified = speakeasy.totp.verify({
      secret: otpRecord.secret, // Make sure the secret is stored when generating OTP
      encoding: "base32",
      token: otp,
      window: 2,
      step:300 // Adjust the window if needed
    });

    if (!isVerified) {
      return res.status(401).json({
        success: false,
        message: "OTP is invalid or has expired",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const driverSecret = otpRecord.secret

    // Create the driver (user with role 'Driver')
    const driver = await Driver.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      licenseNumber,
      carRegistrationNumber: carRegistrationNumber,
      role: "Driver",
      secret:driverSecret

    });

    return res.status(200).json({
      success: true,
      message: "Driver registered successfully",
      driver,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Driver can't be registered, please try again",
    });
  }
};

//login controller for User
exports.logInUser = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Check if email or password is missing
    if (!email || !password ) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    //find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    //generate JWT tokoen and compare password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      //save token to user model
      user.token = token;
      user.password = undefined;
      //set cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logn successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
        token
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

//login controller for Driver
exports.logInDriver = async (req, res) => {
  try {
    const { email, password} = req.body;

    // Check if email or password is missing
    if (!email || !password ) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    //find user with provided email
    const driver = await Driver.findOne({ email });

    // If user not found with provided email
    if (!driver) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `Driver is not Registered with Us Please SignUp to Continue`,
      });
    }

    //generate JWT tokoen and compare password
    if (await bcrypt.compare(password, driver.password)) {
      const token = jwt.sign(
        { email: driver.email, id: driver._id, role: driver.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      console.log("token", token)
      //save token to user model
      driver.token = token;
      driver.password = undefined;
      //set cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        driver,
        message:"Driver Login successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
        token
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

//OTP generator controller
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
       return res.status(401),json({
        message:"user exists"
      })
    }
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    console.log("secret in sendOtp", secret)
    const otpToken = speakeasy.totp({
      secret: secret,
      encoding: "base32",
      step: 300,
    });
    console.log("otp token from sendOtp", otpToken)

    // Check if an OTP already exists for the email
    let existingOtp = await OTP.findOne({ email });
    if (existingOtp) {
     await OTP.deleteOne({ email });
    }

    // Store the OTP with its expiration
    const otpRecord = new OTP({
      email:email,
      otp: otpToken,
      otpExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
      secret:secret,
      step:300
    });
    await otpRecord.save();

    // Send the OTP via email
    // await mailSender({
    //     to: email,
    //     subject: 'Your OTP Code',
    //     text: `Your OTP code is ${otpToken}. It will expire in 5 minutes.`,
    // });
    return res.status(500).json({
      success: true,
      message: "OTP generated and sent successfullty",
      otp: otpToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in generating OTP",
    });
  }
};
