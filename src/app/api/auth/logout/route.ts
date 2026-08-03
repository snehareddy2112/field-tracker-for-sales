import { NextResponse } from "next/server";

import { AUTH_COOKIE } from "@/constants/auth";

export async function POST() {
  const response = NextResponse.json(
    {
      success: true,
      message: "Logged out successfully",
    },
    {
      status: 200,
    }
  );

  response.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}