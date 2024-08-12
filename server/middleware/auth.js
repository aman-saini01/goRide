const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const User = require("../models/User")
const Driver = require("../models/Driver")

exports.auth = async (req, res, next) => {
    try{
        const token = req.cookies.token||
                      req.body.token||
                      req.header("Authorization").replace("Bearer ", "");
        console.log("token in auth middleware", token)              
        //if jwt is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:`Token Missing`
            })
        } 

        try{
            //match the token is valid or not
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            console.log("decoded token", decode)
            req.user = decode           
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
        // If JWT is valid, move on to the next middleware or request handler
        next();
    }
    catch(error){
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}

exports.isDriver = async (req, res, next) => {
    try{
        const driverDetails = await Driver.findOne({email:req.user.email})
        if(driverDetails.role !== 'Driver'){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for only Drivers"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:" role cant be verified",
        })
    }
}

exports.isUser = async (req, res, next) => {
    try{
        const userDetails = await User.findOne({email:req.user.email})
        if(userDetails.role !== 'Driver'){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for only User"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:" role cant be verified",
        })
    }
}