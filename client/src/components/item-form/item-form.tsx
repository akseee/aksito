import { FC, useRef, useState } from "react";
import styles from "./item-form.module.css";
import { Button } from "@ui";
import { TCategoryType, TItemType } from "src/utils/types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

type ItemFormProps = {
  submitForm: (data: TItemType) => void;
  error: Error | null;
  isEditing: boolean;
  deleteItem?: () => void;
  item?: TItemType;
};

export const ItemForm: FC<ItemFormProps> = ({
  submitForm,
  deleteItem,
  error,
  isEditing,
  item,
}) => {
  const { register, handleSubmit } = useForm<TItemType>({
    defaultValues: item || {},
  });

  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [category, setCategory] = useState<
    TCategoryType | "Выберите категорию"
  >(item?.type || "Выберите категорию");

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleFormSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <>
      <div className={styles.steps}>
        <Button onClick={() => setStep(1)}>Шаг 1</Button>
        <Button onClick={() => setStep(2)}>Шаг 2</Button>
        {isEditing && deleteItem && (
          <Button extraClass={styles.delete} onClick={() => deleteItem()}>
            Удалить объявление
          </Button>
        )}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit(submitForm)}
        className={styles.form}
      >
        {step === 1 && (
          <>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Название"
              className={styles.input}
            />
            <input
              {...register("location", { required: true })}
              type="text"
              placeholder="Город"
              className={styles.input}
            />
            <textarea
              {...register("description", { required: true })}
              placeholder="Описание"
              className={styles.input}
            />
            <input
              {...register("image")}
              type="text"
              placeholder="Фото"
              className={clsx(styles.image)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <select
              {...register("type", { required: true })}
              className={clsx(styles.input, styles.category)}
              onChange={(e) => setCategory(e.target.value as TCategoryType)}
              value={category}
            >
              <option value="default">Выберите категорию</option>
              <option value="Недвижимость">Недвижимость</option>
              <option value="Авто">Авто</option>
              <option value="Услуги">Услуги</option>
            </select>
            {category === "Недвижимость" && (
              <>
                <input
                  {...register("propertyType", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Тип недвижимости"
                  className={styles.input}
                />
                <input
                  {...register("area", {
                    required: true,
                  })}
                  type="number"
                  placeholder="Площадь"
                  className={styles.input}
                />
                <input
                  {...register("rooms", { required: true })}
                  type="number"
                  placeholder="Количество комнат"
                  className={styles.input}
                />
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Цена"
                  className={styles.input}
                />
              </>
            )}

            {category === "Авто" && (
              <>
                <input
                  {...register("brand", { required: true })}
                  type="text"
                  placeholder="Марка автомобиля"
                  className={styles.input}
                />
                <input
                  {...register("model", { required: true })}
                  type="text"
                  placeholder="Модель автомобиля"
                  className={styles.input}
                />
                <input
                  {...register("year", { required: true })}
                  type="number"
                  placeholder="Год выпуска"
                  className={styles.input}
                />
                <input
                  {...register("mileage")}
                  type="number"
                  placeholder="Пробег"
                  className={styles.input}
                />
              </>
            )}

            {category === "Услуги" && (
              <>
                <input
                  {...register("serviceType", { required: true })}
                  type="text"
                  placeholder="Тип услуги"
                  className={styles.input}
                />
                <input
                  {...register("experience", { required: true })}
                  type="number"
                  placeholder="Стаж работы"
                  className={styles.input}
                />
                <input
                  {...register("cost", { required: true })}
                  type="number"
                  placeholder="Стоимость"
                  className={styles.input}
                />
                <input
                  {...register("workSchedule")}
                  type="text"
                  placeholder="График работы"
                  className={styles.input}
                />
              </>
            )}
          </>
        )}
      </form>
      <div className={styles.controls}>
        {step === 1 && (
          <>
            <Button onClick={() => navigate("/")}>Отменить</Button>
            <Button extraClass={styles.next} onClick={() => setStep(2)}>
              Далее
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <Button onClick={() => setStep(1)}>Вернуться</Button>
            <Button
              extraClass={styles.next}
              htmlType="submit"
              onClick={handleFormSubmit}
            >
              {isEditing ? "Сохранить изменения" : "Опубликовать объявление"}
            </Button>
          </>
        )}
      </div>
      {error && (
        <p className={styles.error}>Ошибка публикации: {error.message}</p>
      )}
    </>
  );
};
