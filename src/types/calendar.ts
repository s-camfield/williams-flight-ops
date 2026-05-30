export type CalendarHoldType = "Maintenance" | "Training" | "Major Event";

export interface CalendarHold {
  id: number;
  day: number;
  title: string;
  subtitle?: string;
  type: CalendarHoldType;
  aircraftTail?: string;
  ghosted?: boolean;
}
