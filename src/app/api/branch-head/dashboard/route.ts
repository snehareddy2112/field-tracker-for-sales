import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

import User from "@/models/User";
import Lead from "@/models/Lead";
import Activity from "@/models/Activity";
import DaySession from "@/models/DaySession";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    requireRole(user, [ROLES.BRANCH_HEAD]);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const [
      associates,
      leads,
      totalActivities,
      totalSessions,
      todayActivities,
      todaySessions,
      completedSessions,
    ] = await Promise.all([
      User.countDocuments({
        role: ROLES.SALES_ASSOCIATE,
      }),

      Lead.countDocuments(),

      Activity.countDocuments(),

      DaySession.countDocuments(),

      Activity.countDocuments({
        loggedAt: {
          $gte: today,
        },
      }),

      DaySession.countDocuments({
        startTime: {
          $gte: today,
        },
      }),

      DaySession.find({
        status: "COMPLETED",
      }),
    ]);

    const totalDistance = completedSessions.reduce(
      (sum, session) => sum + (session.totalDistance || 0),
      0
    );

    return NextResponse.json({
      success: true,
      data: {
        associates,
        leads,
        totalActivities,
        totalSessions,
        todayActivities,
        todaySessions,
        totalDistance: Number(totalDistance.toFixed(2)),
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}