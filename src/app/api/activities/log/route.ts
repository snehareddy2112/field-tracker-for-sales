import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/middleware/auth.middleware";
import { createActivitySchema } from "@/validations/activity.validation";
import { logActivity } from "@/services/activity.service";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);

    const body = await request.json();

    const validatedData = createActivitySchema.parse(body);

    const activity = await logActivity({
      associateId: user._id.toString(),
      leadId: validatedData.leadId,
      notes: validatedData.notes,
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      accuracy: validatedData.accuracy,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Activity logged successfully",
        data: activity,
      },
      {
        status: 201,
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