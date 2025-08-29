import mongoose from "mongoose";

export async function connectDB() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log("Error connecting to mongodb" + err.message));
}

