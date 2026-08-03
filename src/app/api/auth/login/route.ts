import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/config/database";
import { loginSchema } from "@/validations/auth.validation";
import { loginUser } from "@/services/auth.service";
import { AUTH_COOKIE, COOKIE_OPTIONS } from "@/constants/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validatedData = loginSchema.parse(body);

    const { user, token } = await loginUser(validatedData);

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          user,
        },
      },
      {
        status: 200,
      }
    );

    response.cookies.set(AUTH_COOKIE, token, COOKIE_OPTIONS);

    return response;
  } catch (error) {
    console.error(error);

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