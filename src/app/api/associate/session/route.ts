import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import DaySession from "@/models/DaySession";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    const sessions = await DaySession.find({
      associate: user._id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: sessions,
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
        message: "Failed to fetch sessions",
      },
      {
        status: 500,
      }
    );
  }
}