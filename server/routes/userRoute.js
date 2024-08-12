const express = require("express")
const router = express.Router()
const {signUpDriver, logInUser, logInDriver, sendOtp, signUpUser} = require("../controllers/Auth")
const{createRide} = require("../controllers/rides")
const{auth, isDriver} = require("../middleware/auth")
router.post("/sendOtp", sendOtp)
router.post("/signUpUser", signUpUser)
router.post("/signUpDriver", signUpDriver)
router.post("/logInUser", logInUser)
router.post("/logInDriver", logInDriver)



module.exports = router