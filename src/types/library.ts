export interface Passenger {
  id: number;
  name: string;
  initials?: string;
  role?: string;
  vip?: boolean;
  preferences?: string;
}

export interface Fbo {
  id: number;
  airport: string;
  name: string;
  phone: string;
  address: string;
  notes?: string;
  preferred?: boolean;
}

export interface HotelVendor {
  id: number;
  airport: string;
  name: string;
  phone?: string;
  notes?: string;
  preferred?: boolean;
}

export interface RentalCarVendor {
  id: number;
  airport: string;
  company: string;
  phone?: string;
  vehiclePreference?: string;
  notes?: string;
  preferred?: boolean;
}

export interface CateringVendor {
  id: number;
  airport: string;
  vendor: string;
  phone?: string;
  notes?: string;
  preferred?: boolean;
}
