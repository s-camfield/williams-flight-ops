export type PersonnelCategory =
  | "Pilot"
  | "Flight Attendant"
  | "Executive Support"
  | "Maintenance"
  | "Scheduler";

export type PersonnelStatus =
  | "Available"
  | "Scheduled"
  | "Training"
  | "Unavailable"
  | "Owner Trip";

export interface Personnel {
  id: number;
  name: string;
  category: PersonnelCategory;
  role: string;
  status: PersonnelStatus;
  phone?: string;
  email?: string;
  medicalExpires?: string;
  passportExpires?: string;
  trainingStatus?: string;
  trainingExpires?: string;
  notes?: string;
  training: string;
}
