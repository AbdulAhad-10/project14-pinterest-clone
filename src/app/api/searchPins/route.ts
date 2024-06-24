import { connectMongoDB } from "@/lib/mongodb";
import Pin from "@/models/Pin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams.get("q");

  try {
    await connectMongoDB();

    let pins;

    if (!searchQuery || searchQuery.trim() === "") {
      // If no search query or empty query, return all pins
      pins = await Pin.find().limit(50); // Limit to 50 results for performance
    } else {
      // If there's a search query, perform the search
      pins = await Pin.find({
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      }).limit(50);
    }

    return NextResponse.json(pins);
  } catch (error) {
    console.error("Error fetching pins:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
