export enum RequestStatus {
  IDLE = "idle",
  SUCCESS = "success",
  FAILED = "error",
  LOADING = "loading",
}

// REAL_ESTATE: "Недвижимость",
// AUTO: "Авто",
// SERVICES: "Услуги",

export type categoryType = "Недвижимость" | "Авто" | "Услуги";

export type ItemType = {
  name: string;
  description: string;
  location: string;
  type: categoryType;
  image?: string;
};

export type EstateType = {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
};

export type AutoType = {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
};

export type ServiceType = {
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
};

export type Id = number;
