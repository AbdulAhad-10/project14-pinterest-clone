import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Pin from "@/models/Pin";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const pin = await Pin.findById(params.id).populate({
      path: "creator",
      select: "name profilePicture",
    });

    if (!pin) {
      return NextResponse.json({ error: "Pin not found" }, { status: 404 });
    }

    return NextResponse.json(pin);
  } catch (error) {
    console.error("Error fetching pin:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
