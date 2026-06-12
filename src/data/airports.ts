export type AirportOption = {
  code: string;
  name: string;
  city: string;
  state: string;
};

export const airports: AirportOption[] = [
  { code: "KDET", name: "Coleman A. Young Municipal Airport", city: "Detroit", state: "MI" },
  { code: "KDTW", name: "Detroit Metropolitan Wayne County Airport", city: "Detroit", state: "MI" },
  { code: "KPTK", name: "Oakland County International Airport", city: "Pontiac", state: "MI" },
  { code: "KYIP", name: "Willow Run Airport", city: "Ypsilanti", state: "MI" },
  { code: "KTEB", name: "Teterboro Airport", city: "Teterboro", state: "NJ" },
  { code: "KJFK", name: "John F. Kennedy International Airport", city: "New York", state: "NY" },
  { code: "KLGA", name: "LaGuardia Airport", city: "New York", state: "NY" },
  { code: "KEWR", name: "Newark Liberty International Airport", city: "Newark", state: "NJ" },
  { code: "KBOS", name: "Boston Logan International Airport", city: "Boston", state: "MA" },
  { code: "KPBI", name: "Palm Beach International Airport", city: "West Palm Beach", state: "FL" },
  { code: "KMIA", name: "Miami International Airport", city: "Miami", state: "FL" },
  { code: "KFLL", name: "Fort Lauderdale-Hollywood International Airport", city: "Fort Lauderdale", state: "FL" },
  { code: "KLAS", name: "Harry Reid International Airport", city: "Las Vegas", state: "NV" },
  { code: "KORD", name: "Chicago O'Hare International Airport", city: "Chicago", state: "IL" },
  { code: "KMDW", name: "Chicago Midway International Airport", city: "Chicago", state: "IL" },
  { code: "KCLE", name: "Cleveland Hopkins International Airport", city: "Cleveland", state: "OH" },
  { code: "KATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", state: "GA" },
  { code: "KDAL", name: "Dallas Love Field", city: "Dallas", state: "TX" },
  { code: "KDFW", name: "Dallas Fort Worth International Airport", city: "Dallas", state: "TX" },
  { code: "KDEN", name: "Denver International Airport", city: "Denver", state: "CO" },
  { code: "KEGE", name: "Eagle County Regional Airport", city: "Vail/Eagle", state: "CO" },
  { code: "KASE", name: "Aspen/Pitkin County Airport", city: "Aspen", state: "CO" },
  { code: "KSDL", name: "Scottsdale Airport", city: "Scottsdale", state: "AZ" },
  { code: "KPHX", name: "Phoenix Sky Harbor International Airport", city: "Phoenix", state: "AZ" },
  { code: "KLAX", name: "Los Angeles International Airport", city: "Los Angeles", state: "CA" },
  { code: "KVNY", name: "Van Nuys Airport", city: "Los Angeles", state: "CA" },
  { code: "KSNA", name: "John Wayne Airport", city: "Orange County", state: "CA" },
  { code: "KSFO", name: "San Francisco International Airport", city: "San Francisco", state: "CA" },
  { code: "KSEA", name: "Seattle-Tacoma International Airport", city: "Seattle", state: "WA" },
];
