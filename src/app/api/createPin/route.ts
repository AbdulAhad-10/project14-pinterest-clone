import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Pin from "@/models/Pin";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Get the current user session
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const { image, title, description } = await req.json();

    // Validate the input
    if (!image || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new Pin
    const newPin = new Pin({
      image,
      title,
      description,
      creator: session.user.id,
    });

    // Save the Pin to the database
    await newPin.save();

    // Update the user's pinsCreated array
    await User.findByIdAndUpdate(session.user.id, {
      $push: { pinsCreated: newPin._id },
    });

    // Return the created Pin
    return NextResponse.json(newPin, { status: 201 });
  } catch (error) {
    console.error("Error creating pin:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
