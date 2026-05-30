import type { Flight } from "../types/flight";

export const flights: Flight[] = [
  {
    id: 1,
    date: "2026-08-05",
    day: 5,
    status: "Confirmed",
    ownerOnboard: true,
    aircraft: {
      tail: "N359W",
      model: "Gulfstream G650",
      color: "blue",
    },
    departureTime: "08:00",
    flightTime: "01:12",
    route: {
      from: "KDET",
      to: "KTEB",
    },
    legs: [
      {
        id: 1,
        from: "KDET",
        to: "KTEB",
        departureTime: "08:00",
        arrivalTime: "09:12",
      },
    ],
    crew: ["Capt. Roberts", "FO James"],
    passengers: ["GGW", "Executive Assistant"],
    fbo: {
      name: "Atlantic Aviation",
      airport: "KTEB",
      phone: "201-288-5000",
    },
    hotel: {
      name: "Marriott at Glenpointe",
      rooms: 2,
      notes: "King rooms preferred",
    },
    rentalCar: {
      company: "Enterprise",
      vehicle: "SUV",
    },
    catering: {
      vendor: "Gourmet Aviation",
      passengers: 2,
      notes: "Standard owner breakfast tray",
    },
    notes: "Owner trip. Ground transportation coordinated.",
  },
  {
    id: 2,
    date: "2026-08-12",
    day: 12,
    status: "Confirmed",
    ownerOnboard: false,
    aircraft: {
      tail: "N358E",
      model: "Gulfstream G550",
      color: "green",
    },
    departureTime: "10:30",
    flightTime: "04:10",
    route: {
      from: "KPBI",
      to: "KLAS",
    },
    legs: [
      {
        id: 1,
        from: "KPBI",
        to: "KLAS",
        departureTime: "10:30",
        arrivalTime: "14:40",
      },
    ],
    crew: ["Capt. Smith"],
    passengers: ["Engineering Team"],
    fbo: {
      name: "Signature Aviation",
      airport: "KLAS",
      phone: "702-555-0100",
    },
    hotel: {
      name: "Four Seasons Las Vegas",
      rooms: 2,
    },
    rentalCar: {
      company: "National",
      vehicle: "Executive SUV",
    },
    catering: {
      vendor: "Las Vegas Flight Catering",
      passengers: 4,
    },
    notes: "Business trip. No owner onboard.",
  },
  {
    id: 3,
    date: "2026-08-14",
    day: 14,
    status: "Confirmed",
    ownerOnboard: true,
    aircraft: {
      tail: "N442F",
      model: "Falcon",
      color: "orange",
    },
    departureTime: "14:00",
    flightTime: "00:48",
    route: {
      from: "KTEB",
      to: "KBOS",
    },
    legs: [
      {
        id: 1,
        from: "KTEB",
        to: "KBOS",
        departureTime: "14:00",
        arrivalTime: "14:48",
      },
    ],
    crew: ["Capt. Roberts"],
    passengers: ["GGW"],
    fbo: {
      name: "Signature Aviation",
      airport: "KBOS",
      phone: "617-555-0199",
    },
    hotel: {
      name: "Boston Harbor Hotel",
      rooms: 1,
    },
    rentalCar: {
      company: "Enterprise",
      vehicle: "Black SUV",
    },
    catering: {
      vendor: "Gourmet Aviation",
      passengers: 1,
    },
    notes: "Owner onboard. Confirm timing before release.",
  },
  {
    id: 4,
    date: "2026-08-25",
    day: 25,
    status: "Tentative",
    ownerOnboard: true,
    aircraft: {
      tail: "N359W",
      model: "Gulfstream G650",
      color: "blue",
    },
    departureTime: "09:00",
    flightTime: "03:25",
    route: {
      from: "KTEB",
      to: "KEGE",
    },
    legs: [
      {
        id: 1,
        from: "KTEB",
        to: "KEGE",
        departureTime: "09:00",
      },
    ],
    crew: ["TBD"],
    passengers: ["GGW"],
    fbo: {
      name: "Vail Valley Jet Center",
      airport: "KEGE",
      phone: "970-555-0160",
    },
    hotel: {
      name: "TBD",
      rooms: 2,
    },
    rentalCar: {
      company: "TBD",
      vehicle: "SUV",
    },
    catering: {
      vendor: "TBD",
      passengers: 1,
    },
    notes: "Tentative owner trip. Do not release maintenance conflicts without approval.",
  },
];
