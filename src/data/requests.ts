import type { OwnerFlightRequest } from "../types/request";

export const ownerFlightRequests: OwnerFlightRequest[] = [
  {
    id: 1,
    requestedBy: "GGW",
    destination: "KTEB / New York Area",
    preferredDate: "2026-08-05",
    preferredTime: "08:00",
    aircraftPreference: "N359W",
    notes: "Owner meeting. Ground transportation preferred.",
    status: "New",
    createdAt: "2026-07-28 09:15",
  },
];

export const notificationRecipients = [
  { name: "Adam Smith", role: "Pilot", email: "adam@example.com", phone: "", notifyByEmail: true, notifyByText: true },
  { name: "Joel Camfield", role: "Pilot", email: "joel@example.com", phone: "", notifyByEmail: true, notifyByText: true },
  { name: "Gina", role: "Main Admin", email: "gina@example.com", phone: "", notifyByEmail: true, notifyByText: true },
];
