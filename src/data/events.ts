import type { CalendarHold } from "../types/calendar";

export const calendarHolds: CalendarHold[] = [
  {
    id: 1,
    day: 18,
    title: "All Day Maintenance",
    subtitle: "N359W",
    type: "Maintenance",
    aircraftTail: "N359W",
  },
  {
    id: 2,
    day: 20,
    title: "NBAA-BACE",
    subtitle: "Orlando, FL",
    type: "Major Event",
    ghosted: true,
  },
  {
    id: 3,
    day: 21,
    title: "NBAA-BACE",
    subtitle: "Major Event Hold",
    type: "Major Event",
    ghosted: true,
  },
  {
    id: 4,
    day: 28,
    title: "Pilot Training",
    subtitle: "Recurrent",
    type: "Training",
  },
];
