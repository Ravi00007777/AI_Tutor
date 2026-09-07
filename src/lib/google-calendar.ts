/**
 * Google Calendar Service
 *
 * Handles OAuth flow, event creation, Meet link generation,
 * and calendar synchronization.
 *
 * IMPORTANT: This requires valid Google Cloud credentials.
 * See .env.example for required environment variables.
 */

import { google, calendar_v3 } from "googleapis";
import { v4 as uuid } from "uuid";

// Initialize OAuth2 client for Google Calendar
function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CALENDAR_CLIENT_ID,
    process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
    process.env.GOOGLE_CALENDAR_REDIRECT_URI
  );
}

/**
 * Generate the Google OAuth authorization URL for calendar access
 */
export function getCalendarAuthUrl(state: string): string {
  const oauth2Client = getOAuth2Client();

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    state, // Teacher user ID for callback identification
    prompt: "consent",
  });
}

/**
 * Exchange authorization code for tokens
 */
export async function getCalendarTokens(code: string) {
  const oauth2Client = getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

/**
 * Create a calendar client using a teacher's refresh token
 */
function getCalendarClient(refreshToken: string): calendar_v3.Calendar {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

/**
 * Create a calendar event with Google Meet link
 */
export async function createCalendarEvent(params: {
  refreshToken: string;
  summary: string;
  description: string;
  startTime: Date;
  duration: number; // minutes
  teacherEmail: string;
  studentEmail: string;
  parentEmail?: string;
  recurrence?: string[]; // RRULE strings
}): Promise<{ eventId: string; meetLink: string }> {
  const calendar = getCalendarClient(params.refreshToken);

  const endTime = new Date(params.startTime.getTime() + params.duration * 60000);

  const attendees = [
    { email: params.teacherEmail },
    { email: params.studentEmail },
  ];

  if (params.parentEmail) {
    attendees.push({ email: params.parentEmail });
  }

  const event = {
    summary: params.summary,
    description: params.description,
    start: {
      dateTime: params.startTime.toISOString(),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: "Asia/Kolkata",
    },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: uuid(),
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email" as const, minutes: 30 },
        { method: "popup" as const, minutes: 15 },
      ],
    },
    recurrence: params.recurrence,
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
    conferenceDataVersion: 1,
    sendUpdates: "all",
  });

  return {
    eventId: response.data.id!,
    meetLink: response.data.hangoutLink!,
  };
}

/**
 * Update an existing calendar event
 */
export async function updateCalendarEvent(params: {
  refreshToken: string;
  eventId: string;
  startTime?: Date;
  duration?: number;
  summary?: string;
  description?: string;
}) {
  const calendar = getCalendarClient(params.refreshToken);

  const updateData: calendar_v3.Schema$Event = {};

  if (params.summary) updateData.summary = params.summary;
  if (params.description) updateData.description = params.description;

  if (params.startTime && params.duration) {
    const endTime = new Date(params.startTime.getTime() + params.duration * 60000);
    updateData.start = {
      dateTime: params.startTime.toISOString(),
      timeZone: "Asia/Kolkata",
    };
    updateData.end = {
      dateTime: endTime.toISOString(),
      timeZone: "Asia/Kolkata",
    };
  }

  const response = await calendar.events.patch({
    calendarId: "primary",
    eventId: params.eventId,
    requestBody: updateData,
    sendUpdates: "all",
  });

  return response.data;
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(
  refreshToken: string,
  eventId: string
) {
  const calendar = getCalendarClient(refreshToken);

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
    sendUpdates: "all",
  });
}

/**
 * List teacher's busy times for conflict detection
 */
export async function getTeacherBusyTimes(
  refreshToken: string,
  timeMin: Date,
  timeMax: Date
): Promise<{ start: Date; end: Date }[]> {
  const calendar = getCalendarClient(refreshToken);

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: "primary" }],
    },
  });

  const busyTimes = response.data.calendars?.primary?.busy || [];

  return busyTimes.map((b) => ({
    start: new Date(b.start!),
    end: new Date(b.end!),
  }));
}
