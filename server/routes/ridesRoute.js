const express = require("express")
const router = express.Router()
const {auth,isDriver} = require("../middleware/auth")
const{createRide, bookRide} = require("../controllers/rides")
//create ride routes
router.post("/createRide", auth,isDriver, createRide)
//book ride
router.post("/bookRide", bookRide)
module.exports = router