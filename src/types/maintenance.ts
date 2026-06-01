export type MaintenanceStatus =
  | "Available"
  | "Due Soon"
  | "In Maintenance"
  | "Grounded";

export interface MaintenanceRecord {
  id: number;
  aircraftTail: string;
  title: string;
  status: MaintenanceStatus;
  dueDate: string;
  estimatedHoursRemaining?: number;
  notes?: string;
}
