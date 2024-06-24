import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Pin from "@/models/Pin";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { userId, pinId } = body;

    if (!userId || !pinId) {
      return NextResponse.json(
        { error: "Missing userId or pinId" },
        { status: 400 }
      );
    }

    // Find the user and pin
    const user = await User.findById(userId);
    const pin = await Pin.findById(pinId);

    if (!user || !pin) {
      return NextResponse.json(
        { error: "User or Pin not found" },
        { status: 404 }
      );
    }

    // Check if the pin is already saved by the user
    if (user.pinsSaved.includes(pinId)) {
      return NextResponse.json(
        { message: "Pin already saved by user" },
        { status: 200 }
      );
    }

    // Update user's pinsSaved
    user.pinsSaved.push(pinId);
    await user.save();

    // Update pin's savedBy
    pin.savedBy.push(userId);
    await pin.save();

    return NextResponse.json(
      { message: "Pin saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving pin:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
