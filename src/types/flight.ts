export type FlightStatus = "Confirmed" | "Tentative" | "Draft" | "Canceled";

export interface FlightLeg {
  id: number;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime?: string;
}

export interface Flight {
  id: number;
  day: number;
  date: string;
  status: FlightStatus;
  ownerOnboard: boolean;

  aircraft: {
    tail: string;
    model: string;
    color: "blue" | "green" | "orange";
  };

  departureTime: string;
  flightTime?: string;

  route: {
    from: string;
    to: string;
  };

  legs: FlightLeg[];
  crew: string[];
  passengers: string[];

  fbo?: {
    name: string;
    airport: string;
    phone?: string;
  };

  hotel?: {
    name: string;
    rooms?: number;
    notes?: string;
  };

  rentalCar?: {
    company: string;
    vehicle?: string;
  };

  catering?: {
    vendor: string;
    passengers?: number;
    notes?: string;
  };

  notes?: string;
}
