const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const app = express()

const dataBase = require("./config/dataBase")
const dotenv = require("dotenv")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
dotenv.config()

const cors = require("cors")
const { cloudinaryConnect } = require("./config/cloudinary")
const userRoute = require("./routes/userRoute")
const rideRoute = require("./routes/ridesRoute")
const { createRide, bookRide } = require("./controllers/rides")
const PORT = process.env.PORT || 4000

//connection to database
dataBase.dbConnect()

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:"*"
    }
})
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
    origin:"*",
    credentials:true,
    }
))
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

//connecting cloudinary
cloudinaryConnect()

//setting up routes
app.use("/api/v1/auth", userRoute)
app.use("/api/v1/rides", rideRoute)
// app.use("/api/v1/bookRide", ride)

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
//testing server
app.get("/", (req, res) => {
    res.send("<h1>Your server is live and running...</h1>")
})

app.listen(PORT, () => {
    console.log(`server is listening on PORT${PORT}`);
})

