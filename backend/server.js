const app = require("./app");


const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//HANDLING UNCAUGHT EXCEPTION
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to UNCAUGHT EXCEPTION`);
  process.exit(1);
});

//CONFIG
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//CONNECTING DATABASE
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on PORT http://localhost:${process.env.PORT}`
  );
});

// UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
