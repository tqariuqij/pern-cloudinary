import cloudinary from "cloudinary";
import { createTables, pool } from "../services/dbConnect.mjs";
import dotenv from "dotenv";

dotenv.config();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const persistimage = (req, res) => {
  // collected image from a user
  const data = {
    title: req.body.title,
    image: req.body.image,
  };
  //upload image here
  cloudinary.v2.uploader
    .upload(data.image)
    .then((image) => {
      // connecting to database
      pool.connect((err, client) => {
        //insert query to run if the upload to cloudinary is succesful
        const insertQuery =
          "INSERT INTO images (title, cloudinary_id, image_url) VALUES($1,$2,$3) RETURNING *";
        const values = [data.title, image.public_id, image.secure_url];

        //execute query
        if (err) throw err;
        client
          .query(insertQuery, values)
          .then((result) => {
            result = result.rows[0];

            //send sucess res
            res.status(201).send({
              status: "success",
              data: {
                message: "Ïmage Upload Successful",
                title: result.title,
                cloudinary_id: result.cloudinary_id,
                image_url: result.image_url,
              },
            });
          })
          .catch((e) => {
            res.status(500).send({
              message: "failure",
              e,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failure",
        error,
      });
    });
};

export default persistimage;
