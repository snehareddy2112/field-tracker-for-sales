import Activity from "@/models/Activity";
import DaySession from "@/models/DaySession";
import Lead from "@/models/Lead";

interface CreateActivityInput {
  associateId: string;
  leadId: string;
  notes: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export async function logActivity(data: CreateActivityInput) {
  const activeSession = await DaySession.findOne({
    associate: data.associateId,
    status: "ACTIVE",
  });

  if (!activeSession) {
    throw new Error("Start your day before logging activities");
  }

  const lead = await Lead.findById(data.leadId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  const activity = await Activity.create({
    session: activeSession._id,
    associate: data.associateId,
    lead: data.leadId,
    activityType: "IN_PERSON_MEETING",
    notes: data.notes,
    latitude: data.latitude,
    longitude: data.longitude,
    accuracy: data.accuracy,
    loggedAt: new Date(),
  });

  return activity;
}