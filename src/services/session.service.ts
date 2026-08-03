import Activity from "@/models/Activity";
import DaySession from "@/models/DaySession";
import { getRoadDistance } from "@/utils/openRouteService";

interface StartDayInput {
  associateId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface EndDayInput {
  associateId: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export async function startDay(data: StartDayInput) {
  const existingSession = await DaySession.findOne({
    associate: data.associateId,
    status: "ACTIVE",
  });

  if (existingSession) {
    throw new Error("An active session already exists.");
  }

  const session = await DaySession.create({
    associate: data.associateId,
    startTime: new Date(),
    startLatitude: data.latitude,
    startLongitude: data.longitude,
    startAccuracy: data.accuracy ?? null,
    totalDistance: 0,
    status: "ACTIVE",
  });

  return session;
}

export async function endDay(data: EndDayInput) {
  const session = await DaySession.findOne({
    associate: data.associateId,
    status: "ACTIVE",
  });

  if (!session) {
    throw new Error("No active session found.");
  }

  const activities = await Activity.find({
    session: session._id,
  }).sort({
    loggedAt: 1,
  });

  const coordinates = [
    {
      latitude: session.startLatitude,
      longitude: session.startLongitude,
    },

    ...activities.map((activity) => ({
      latitude: activity.latitude,
      longitude: activity.longitude,
    })),

    {
      latitude: data.latitude,
      longitude: data.longitude,
    },
  ];

  const totalDistance = await getRoadDistance(coordinates);

  session.endTime = new Date();

  session.endLatitude = data.latitude;
  session.endLongitude = data.longitude;
  session.endAccuracy = data.accuracy ?? null;

  session.totalDistance = totalDistance;

  session.status = "COMPLETED";

  await session.save();

  return session;
}

export async function getActiveSession(associateId: string) {
  return DaySession.findOne({
    associate: associateId,
    status: "ACTIVE",
  });
}

export async function getSessionHistory(associateId: string) {
  return DaySession.find({
    associate: associateId,
  })
    .sort({
      createdAt: -1,
    })
    .lean();
}