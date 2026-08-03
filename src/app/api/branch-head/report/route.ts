import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

import DaySession from "@/models/DaySession";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    requireRole(user, [ROLES.BRANCH_HEAD]);

    const from = request.nextUrl.searchParams.get("from");
    const to = request.nextUrl.searchParams.get("to");

    type SessionReportFilter = {
      startTime?: {
        $gte?: Date;
        $lte?: Date;
      };
    };

    const filter: SessionReportFilter = {};

    if (from || to) {
      filter.startTime = {};

      if (from) {
        filter.startTime.$gte = new Date(from);
      }

      if (to) {
        filter.startTime.$lte = new Date(to);
      }
    }

    const sessions = await DaySession.find(filter)
      .populate("associate", "name email")
      .sort({
        startTime: -1,
      });

    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch report",
      },
      {
        status: 500,
      }
    );
  }
}