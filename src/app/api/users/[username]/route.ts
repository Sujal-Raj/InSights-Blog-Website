// import { NextRequest, NextResponse } from "next/server";
// import connectToDatabase from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";

// export async function GET(req: NextRequest) {
//   try {
//     await connectToDatabase();

//     // Get username from the request URL
//     const { searchParams } = new URL(req.url);
//     const username = searchParams.get('username');

//     if (!username || typeof username !== 'string') {
//       return NextResponse.json({ error: "Invalid username" }, { status: 400 });
//     }

//     // Find user
//     const user = await User.findOne({ username });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Return user data
//     return NextResponse.json(user);

//   } catch (error:any) {
//     console.log(error.message);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }