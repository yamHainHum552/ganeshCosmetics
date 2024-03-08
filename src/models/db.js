import mongoose from "mongoose";

export async function connectToMongo() {
  try {
    return await mongoose
      .connect(process.env.CONNECTION_STRING)
      .then(() => console.log("Connected Successfully To Mongo"));
  } catch (error) {
    console.log(error.title);
  }
}
