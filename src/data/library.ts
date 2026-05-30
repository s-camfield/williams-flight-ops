import type {
  Passenger,
  Fbo,
  HotelVendor,
  RentalCarVendor,
  CateringVendor,
} from "../types/library";

export const passengers: Passenger[] = [
  {
    id: 1,
    name: "GGW",
    initials: "GGW",
    role: "Owner",
    vip: true,
    preferences:
      "Owner identifier. Show star on calendar. Preferred bottled water, coffee, privacy notes restricted.",
  },
  {
    id: 2,
    name: "Executive Assistant",
    initials: "EA",
    role: "Executive Support",
    preferences: "Seat near front cabin. Usually coordinates ground transportation.",
  },
  {
    id: 3,
    name: "Engineering Team",
    initials: "ENG",
    role: "Business Group",
    preferences: "Standard catering. Confirm final passenger count before release.",
  },
];

export const fbos: Fbo[] = [
  {
    id: 1,
    airport: "KTEB",
    name: "Atlantic Aviation",
    phone: "201-288-5000",
    address: "Teterboro Airport, Teterboro, NJ",
    notes: "Preferred for New York area trips.",
    preferred: true,
  },
  {
    id: 2,
    airport: "KTEB",
    name: "Signature Aviation",
    phone: "201-555-0182",
    address: "Teterboro Airport, Teterboro, NJ",
    notes: "Backup option.",
  },
  {
    id: 3,
    airport: "KLAS",
    name: "Signature Aviation",
    phone: "702-555-0100",
    address: "Las Vegas, NV",
    preferred: true,
  },
  {
    id: 4,
    airport: "KBOS",
    name: "Signature Aviation",
    phone: "617-555-0199",
    address: "Boston Logan Airport",
    preferred: true,
  },
];

export const hotels: HotelVendor[] = [
  {
    id: 1,
    airport: "KTEB",
    name: "Marriott at Glenpointe",
    phone: "201-555-1000",
    notes: "Preferred crew hotel. Usually 2 rooms.",
    preferred: true,
  },
  {
    id: 2,
    airport: "KLAS",
    name: "Four Seasons Las Vegas",
    phone: "702-555-1000",
    notes: "Executive/business trip option.",
    preferred: true,
  },
  {
    id: 3,
    airport: "KBOS",
    name: "Boston Harbor Hotel",
    phone: "617-555-1000",
    preferred: true,
  },
];

export const rentalCars: RentalCarVendor[] = [
  {
    id: 1,
    airport: "KTEB",
    company: "Enterprise",
    phone: "201-555-2000",
    vehiclePreference: "SUV",
    preferred: true,
  },
  {
    id: 2,
    airport: "KLAS",
    company: "National",
    phone: "702-555-2000",
    vehiclePreference: "Executive SUV",
    preferred: true,
  },
  {
    id: 3,
    airport: "KBOS",
    company: "Enterprise",
    phone: "617-555-2000",
    vehiclePreference: "Black SUV",
    preferred: true,
  },
];

export const cateringVendors: CateringVendor[] = [
  {
    id: 1,
    airport: "KTEB",
    vendor: "Gourmet Aviation",
    phone: "201-555-3000",
    notes: "Owner breakfast tray, coffee, bottled water.",
    preferred: true,
  },
  {
    id: 2,
    airport: "KLAS",
    vendor: "Las Vegas Flight Catering",
    phone: "702-555-3000",
    notes: "Standard business catering.",
    preferred: true,
  },
  {
    id: 3,
    airport: "KBOS",
    vendor: "Gourmet Aviation",
    phone: "617-555-3000",
    preferred: true,
  },
];
