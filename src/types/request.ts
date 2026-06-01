export type RequestStatus = "New" | "Reviewed" | "Approved" | "Scheduled" | "Declined";

export interface OwnerFlightRequest {
  id: number;
  requestedBy: string;
  destination: string;
  preferredDate: string;
  preferredTime: string;
  aircraftPreference: string;
  notes?: string;
  status: RequestStatus;
  createdAt: string;
}
