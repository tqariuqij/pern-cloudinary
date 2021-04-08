import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

//set the production variable. this will be called when deployed to a live host
const isProduction = process.env.NODE_ENV === "production";

//configuration details
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const config = {
//   user: "",
//   database: "",
//   password: "",
//   port: 5432,
//   max: 10, // max number of clients in the pool
//   idleTimeoutMillis: 30000,
// };
//if project has been deployed, connect with host database url
// else connect with the local DATABASE_URL

const pool = new pg.Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

//
pool.on("connect", () => {
  console.log("Teamwork database connected to the Database");
});

const createTables = () => {
  const imageTable = `CREATE TABLE IF NOT EXISTS
    images(
      id SERIAL PRIMARY KEY,
      title VARCHAR(128) NOT NULL,
      cloudinary_id VARCHAR(128) NOT NULL,
      image_url VARCHAR(128) NOT NULL
    )`;
  pool
    .query(imageTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

//export pool and createTables to be accessible  from an where within the application
// module.exports = {
//   createTables,
//   pool,
// };
export { createTables, pool };

// require("make-runnable");
// import "make-runnable";
