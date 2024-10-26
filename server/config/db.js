import mongoose from "mongoose";

const connectDb = (url) => {
  // Connect to MongoDB
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
    });
};

export {connectDb}


