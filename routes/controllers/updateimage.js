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

const updateimage = (req, res) => {
  //the unique id
  const { cloudinary_id } = req.params;

  // collected image from the user
  const data = {
    title: req.body.title,
    image: req.body.image,
  };

  //delete image from cloudinary first
  cloudinary.v2.uploader
    .destroy(cloudinary_id)
    //upload image here
    .then((data) => {
      cloudinary.v2.uploader
        .upload(data.image)
        .then((result) => {
          pool.connect((err, client) => {
            //update query
            const updateQuery =
              "UPDATE images SET title = $1, cloudinary_id = $2, image_url = $3 WHERE cloudinary_id = $4";

            const value = [
              data.title,
              result.public_id,
              result.secure_url,
              cloudinary_id,
            ];
            //execute query
            client
              .query(updateQuery, value)
              .then(() => {
                // send success response
                response.status(201).send({
                  status: "success",
                  data: {
                    message: "Image Updated Successfully",
                  },
                });
              })
              .catch((e) => {
                response.status(500).send({
                  message: "Update Failed",
                  e,
                });
              });
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "failed",
            err,
          });
        });
    })
    .catch((error) => {
      res.atatus(500).send({
        message: "failed",
        error,
      });
    });
};

export default updateimage;
