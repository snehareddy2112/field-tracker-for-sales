import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/config/database";
import { registerSchema } from "@/validations/auth.validation";
import { registerUser } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validatedData = registerSchema.parse(body);

    const { user, token } = await registerUser(validatedData);

    const response = NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      },
      {
        status: 201,
      }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

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