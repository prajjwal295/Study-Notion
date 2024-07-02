const express = require("express");
const app = express();

const userRoutes = require("./route/User");
const profileRoutes = require("./route/Profile");
const courseRoutes = require("./route/Course");
const paymentRoutes = require("./route/Payment");
const contactRoutes = require("./route/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const Port = process.env.PORT || 4000;

// db connect
database.connect();

const corsOptions = {
  origin: ["http://localhost:3000", "https://study-notion-prajjwal.vercel.app"],
  credentials: true,
};


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

cloudinaryConnect();

// routes

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach", contactRoutes);
app.use("/api/v1/payment", paymentRoutes);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running",
  });
});

// activate server
app
  .listen(Port, () => {
    console.log(`app listens at ${Port}`);
  })
  .on("error", (err) => {
    console.error("Server start error:", err);
  });
