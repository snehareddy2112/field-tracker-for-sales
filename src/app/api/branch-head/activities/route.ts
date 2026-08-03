import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";
import Activity from "@/models/Activity";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    requireRole(user, [ROLES.BRANCH_HEAD]);

    const activities = await Activity.find()
      .populate("associate", "name email")
      .populate("lead", "name address")
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
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch activities",
      },
      {
        status: 500,
      }
    );
  }
}