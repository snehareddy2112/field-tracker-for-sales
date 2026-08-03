import { NextRequest, NextResponse } from "next/server";
import { Parser } from "json2csv";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

import DaySession from "@/models/DaySession";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    requireRole(user, [ROLES.BRANCH_HEAD]);

    const month = Number(
      request.nextUrl.searchParams.get("month")
    );

    const year = Number(
      request.nextUrl.searchParams.get("year")
    );

    const start = new Date(year, month - 1, 1);

    const end = new Date(year, month, 0, 23, 59, 59);

    const sessions = await DaySession.find({
      startTime: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("associate", "name email")
      .lean();

    const parser = new Parser();

    const csv = parser.parse(sessions);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition":
          'attachment; filename="monthly-report.csv"',
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Export failed",
      },
      {
        status: 500,
      }
    );
  }
}