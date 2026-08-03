import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { startDaySchema } from "@/validations/session.validation";
import { startDay } from "@/services/session.service";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    const body = await request.json();

    const validatedData = startDaySchema.parse(body);

    const session = await startDay({
      associateId: user._id.toString(),
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      accuracy: validatedData.accuracy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Day started successfully",
        data: session,
      },
      {
        status: 201,
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