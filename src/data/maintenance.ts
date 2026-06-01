import type { MaintenanceRecord } from "../types/maintenance";

export const maintenanceRecords: MaintenanceRecord[] = [
  {
    id: 1,
    aircraftTail: "N359W",
    title: "Scheduled Inspection",
    status: "Due Soon",
    dueDate: "2026-08-18",
    estimatedHoursRemaining: 12,
    notes: "Protect schedule around inspection window.",
  },
  {
    id: 2,
    aircraftTail: "N358E",
    title: "Routine Maintenance Review",
    status: "Available",
    dueDate: "2026-09-10",
    estimatedHoursRemaining: 42,
    notes: "No conflict at this time.",
  },
  {
    id: 3,
    aircraftTail: "N442F",
    title: "Avionics Check",
    status: "Available",
    dueDate: "2026-09-22",
    estimatedHoursRemaining: 35,
    notes: "Check before long-range scheduling.",
  },
];
