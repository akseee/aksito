export type TCategoryType = "Недвижимость" | "Авто" | "Услуги";

export type TItemType = TEstateType | TAutoType | TServiceType;

export type TBaseType = {
  id: number;
  name: string;
  description: string;
  location: string;
  type: TCategoryType;
  image?: string;
};

export type TEstateType = TBaseType & {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
};

export type TAutoType = TBaseType & {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
};

export type TServiceType = TBaseType & {
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
};

// User types

export type TUserType = {
  id: number;
  password: string;
  email: string;
  name: string;
  surname: string;
  city: string;
  image?: string;
};

export type TLoginForm = Pick<TUserType, "password" | "email">;
