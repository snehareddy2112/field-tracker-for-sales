import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    requireRole(user, [ROLES.BRANCH_HEAD]);

    const associates = await User.find({
      role: ROLES.SALES_ASSOCIATE,
    }).select("-password");

    return NextResponse.json(
      {
        success: true,
        data: associates,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}