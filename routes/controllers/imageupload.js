import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const imageupload = (req, res) => {
  /*this works but i think it is a bit bulky so i went with the try catch  */
  // const imageupload = {
  //   image: req.body.image,
  // };
  // //upload image here
  // cloudinary.v2.uploader
  //   .upload(imageupload.image)
  //   .then((result) => {
  //     res.status(200).send({
  //       message: "success",
  //       result,
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).send({
  //       message: "failure",
  //       error,
  //     });
  //   });
  try {
    const data = {
      image: req.body.image,
    };
    cloudinary.v2.uploader.upload(data.image).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      message: "failure",
      err,
    });
  }
};

export default imageupload;
