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

const deleteimage = (req, res) => {
  // unique id
  /* this try catch method is bringing a unhandled promise error on console otherwise it is working */
  // try {
  //   const { cloudinary_id } = req.params;
  //   cloudinary.v2.uploader
  //     .destroy(cloudinary_id, (error, result) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         res.json(result);
  //       }
  //     })
  //     .then(() => {
  //       pool.connect((err, client) => {
  //         //delete query
  //         const deleteQuery = "DELETE FROM images WHERE cloudinary_id = $1";
  //         const deleteValue = [cloudinary_id];

  //         //execute query
  //         if (err) throw err;
  //         client
  //           .query(deleteQuery, deleteValue)
  //           .then((deleteResult) => {
  //             res.status(200).send({
  //               message: "Image deleted succefuly",
  //               deleteResult,
  //             });
  //           })
  //           .catch((e) => {
  //             res.status(500).send({
  //               message: "Image could not be deleted!",
  //               e,
  //             });
  //           });
  //       });
  //     })
  //     .catch((error) => {
  //       res.json(error);
  //     });
  // } catch (err) {
  //   res.json(err);
  // }
  /*alternatively */
  const { cloudinary_id } = req.params;
  // delete image record from cloudinary first
  cloudinary.v2.uploader
    .destroy(cloudinary_id, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    })

    //delete image record from postgres also
    .then(() => {
      pool.connect((err, client) => {
        //delete query
        const deleteQuery = "DELETE FROM images WHERE cloudinary_id = $1";
        const deleteValue = [cloudinary_id];

        //execute query
        client
          .query(deleteQuery, deleteValue)
          .then((deleteResult) => {
            res.status(200).send({
              message: "Image deleted succefuly",
              deleteResult,
            });
          })
          .catch((e) => {
            res.status(500).send({
              message: "Image could not be deleted!",
              e,
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "failure",
        err,
      });
    });
};
export default deleteimage;
