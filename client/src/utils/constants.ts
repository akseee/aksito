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

export const DEFAULT_USER_IMAGE =
  "https://img.freepik.com/free-vector/sweet-eyed-kitten-cartoon-character_1308-133242.jpg?t=st=1741370557~exp=1741374157~hmac=d81fd96ecb84927ab4070d44fb9b56ae0e6d009d4f33dbedd79908f59b7f2a69&w=996";
