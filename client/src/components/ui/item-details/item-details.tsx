import { FC, JSX } from "react";
import styles from "./item-details.module.css";
import { AutoType, EstateType, ItemType, ServiceType } from "src/utils/types";

type ItemDetailsProps = {
  item: ItemType;
};

export const ItemDetail: FC<ItemDetailsProps> = ({ item }) => {
  const { location } = item;

  let details: JSX.Element[] = [];

  switch (item.type) {
    case "Авто": {
      const { brand, model, year, mileage } = item as AutoType;
      details = [
        <li key="brand">
          <div>Марка:</div> <p>{brand}</p>
        </li>,
        <li key="model">
          <div>Модель:</div> <p>{model}</p>
        </li>,
        <li key="year">
          <div>Год:</div> <p>{year}</p>
        </li>,
        mileage && (
          <li key="mileage">
            <div>Пробег:</div> <p>{mileage} км</p>
          </li>
        ),
      ].filter((el): el is JSX.Element => Boolean(el));
      break;
    }

    case "Недвижимость": {
      const { propertyType, area, rooms, price } = item as EstateType;
      details = [
        <li key="type">
          <div>Тип недвижимости:</div> <p>{propertyType}</p>
        </li>,
        <li key="area">
          <div>Площадь:</div> <p>{area} м²</p>
        </li>,
        <li key="rooms">
          <div>Комнат:</div> <p>{rooms}</p>
        </li>,
        <li key="price">
          <div>Цена:</div> <p>{price} ₽</p>
        </li>,
      ];
      break;
    }

    case "Услуги": {
      const { serviceType, experience, cost, workSchedule } =
        item as ServiceType;
      details = [
        <li key="service">
          <div>Тип услуги:</div> <p>{serviceType}</p>
        </li>,
        <li key="experience">
          <div>Опыт:</div> <p>{experience} лет</p>
        </li>,
        <li key="cost">
          <div>Стоимость:</div> <p>{cost} ₽</p>
        </li>,
        workSchedule && (
          <li key="schedule">
            <div>График работы:</div> <p>{workSchedule}</p>
          </li>
        ),
      ].filter((el): el is JSX.Element => Boolean(el));
      break;
    }
  }

  return (
    <ul className={styles.details}>
      <li className={styles.detail}>
        <div>Расположение:</div>
        <p>{location}</p>
      </li>
      {details.map((detail) => detail)}
    </ul>
  );
};
