import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { requireRole } from "@/middleware/role.middleware";
import { ROLES } from "@/constants/roles";

import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    requireRole(user, [ROLES.BRANCH_HEAD]);

    const query = request.nextUrl.searchParams.get("q") || "";

    const associates = await User.find({
      role: ROLES.SALES_ASSOCIATE,
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          email: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).select("-password");

    return NextResponse.json({
      success: true,
      data: associates,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Search failed",
      },
      {
        status: 500,
      }
    );
  }
}