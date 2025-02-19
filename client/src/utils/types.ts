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

export type ItemType = EstateType | AutoType | ServiceType;

export type BaseType = {
  id: number;
  name: string;
  description: string;
  location: string;
  type: categoryType;
  image?: string;
};

export type EstateType = BaseType & {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
};

export type AutoType = BaseType & {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
};

export type ServiceType = BaseType & {
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
};

// User types

export type userType = {
  id: number;
  password: string;
  email: string;
};

export type LoginForm = Pick<userType, "password" | "email">;
