import { NextResponse } from "next/server";

import { connectDB } from "@/config/database";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: leads,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
      },
      {
        status: 500,
      }
    );
  }
}