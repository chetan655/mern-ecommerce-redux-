import mongoose from "mongoose";

const connectDB = async (req, res, next) => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(`db connected host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("error connecting db", error);
    process.exit(1);
  }
};

export default connectDB;
