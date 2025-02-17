import mongoose from "mongoose";

export default async function connectToDatabase() {
    try {
        mongoose.connect(process.env.MONGO_URI!);

        mongoose.connection.on("connected", () => {
            console.log("Connected to database");

        })

        mongoose.connection.on("error", (error) => {
            console.log("Error connecting to database", error);
            process.exit(1);
        })
    } catch (error) {
        console.log(error);
        console.log("Error connecting to database");
    }
}