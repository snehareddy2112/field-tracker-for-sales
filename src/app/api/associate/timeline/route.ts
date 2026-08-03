import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import Activity from "@/models/Activity";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    const activities = await Activity.find({
      associate: user._id,
    })
      .populate("lead")
      .sort({
        loggedAt: -1,
      });

    return NextResponse.json(
      {
        success: true,
        data: activities,
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
        message: "Failed to fetch timeline",
      },
      {
        status: 500,
      }
    );
  }
}