import { TOption } from "./types";

export const optionsPages: TOption[] = [
  {
    value: "5",
    text: "5",
  },
  {
    value: "10",
    text: "10",
  },
  {
    value: "15",
    text: "15",
  },
  {
    value: "25",
    text: "25",
  },
  {
    value: "45",
    text: "45",
  },
];

export const enum CATEGORIES {
  ALL = "Все",
  AUTO = "Авто",
  REAL_ESTATE = "Недвижимость",
  SERVICES = "Услуги",
}

export const optionsCategories: TOption[] = [
  {
    value: CATEGORIES.ALL,
    text: "Все",
  },
  {
    value: CATEGORIES.AUTO,
    text: "Авто",
  },
  {
    value: CATEGORIES.REAL_ESTATE,
    text: "Недвижимость",
  },
  {
    value: CATEGORIES.SERVICES,
    text: "Услуги",
  },
];
