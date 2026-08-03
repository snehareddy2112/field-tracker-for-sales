import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/config/database";
import { verifyToken } from "@/lib/auth";
import { getCurrentUser } from "@/services/auth.service";
import { AUTH_COOKIE } from "@/constants/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get(AUTH_COOKIE)?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const payload = verifyToken(token);

    const user = await getCurrentUser(payload.userId);

    return NextResponse.json(
      {
        success: true,
        data: {
          user,
        },
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
        message: "Invalid or expired token",
      },
      {
        status: 401,
      }
    );
  }
}