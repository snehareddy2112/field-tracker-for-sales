import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { endDaySchema } from "@/validations/session.validation";
import { endDay } from "@/services/session.service";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    const body = await request.json();

    const validatedData = endDaySchema.parse(body);

    const session = await endDay({
      associateId: user._id.toString(),
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      accuracy: validatedData.accuracy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Day ended successfully",
        data: session,
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
        message:
          error instanceof Error ? error.message : "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}