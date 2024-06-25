import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Pin from "@/models/Pin";

interface PinDocument {
  _id: string;
  image: string;
  title: string;
}

export async function GET(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all pins from the database
    const pins = await Pin.find({}).select("image title").lean<PinDocument[]>();

    // Extract image URLs and titles into an array
    const pinImages = pins.map((pin) => ({
      _id: pin._id.toString(),
      image: pin.image,
      title: pin.title,
    }));

    // Return the array of pin images
    return NextResponse.json(pinImages, { status: 200 });
  } catch (error) {
    console.error("Error fetching pins:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
