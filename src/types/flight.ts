export type FlightStatus = "Confirmed" | "Tentative" | "Draft" | "Canceled";

export interface FlightServiceInfo {
  name?: string;
  location?: string;
  phone?: string;
  notes?: string;
}

export interface FlightLeg {
  id: number;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime?: string;
  passengers?: string[];
  crew?: string[];
  fbo?: FlightServiceInfo;
  fuel?: FlightServiceInfo;
  passengerHotel?: FlightServiceInfo;
  passengerCar?: FlightServiceInfo;
  passengerCatering?: FlightServiceInfo;
  passengerNotes?: string;
  crewHotel?: FlightServiceInfo;
  crewCar?: FlightServiceInfo;
  crewCatering?: FlightServiceInfo;
  crewNotes?: string;
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
