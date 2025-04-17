import mongoose from "mongoose";

let URI: string ;

if(process.env.NODE_ENV === "production") {
    URI = process.env.MONGO_ATLAS_URI!;
}
else {
    URI = process.env.MONGO_URI!;
}


export default async function connectToDatabase() {
    try {
        mongoose.connect(URI);

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