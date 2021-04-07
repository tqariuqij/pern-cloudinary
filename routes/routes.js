import express from "express";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
// import { createTables, pool } from "../services/dbConnect.mjs";
import imageupload from "./controllers/imageupload.js";
import persistimage from "./controllers/persistimage.js";
import retreiveimage from "./controllers/retrieveimage.js";
import updateimage from "./controllers/updateimage.js";
import deleteimage from "./controllers/deleteimage.js";

const router = express.Router();

dotenv.config();

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get("/", (req, res) => {
  res.json({ message: "i am from your server" });
});

//image retrieval api
router.get("/retrieve-image/:cloudinary_id", retreiveimage);

//update image api
router.put("/update-image/:cloudinary", updateimage);

//persist image
router.post("/persist-image/", persistimage);

//upload-image
router.post("/image-upload", imageupload);

// delete image
router.delete("/delete-image/:cloudinary_id", deleteimage);

export default router;
