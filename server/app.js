const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const ItemTypes = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const app = express();
app.use(
  bodyParser.json(),
  cors({
    origin: "*",
  })
);

// In-memory хранилище для объявлений
let items = [
  {
    id: 1,
    name: "Квартира в центре",
    description: "Просторная квартира с видом на парк",
    location: "Москва",
    type: "Недвижимость",
    image: "https://example.com/estate1.jpg",
    propertyType: "Квартира",
    area: 85,
    rooms: 3,
    price: 12000000,
  },
  {
    id: 2,
    name: "Загородный дом",
    description: "Уютный дом с садом и бассейном",
    location: "Подмосковье",
    type: "Недвижимость",
    propertyType: "Дом",
    area: 150,
    rooms: 5,
    price: 25000000,
  },
  {
    id: 3,
    name: "Офисное помещение",
    description: "Помещение для бизнеса в центре города",
    location: "Санкт-Петербург",
    type: "Недвижимость",
    propertyType: "Офис",
    area: 60,
    rooms: 2,
    price: 8000000,
  },
  {
    id: 4,
    name: "Toyota Camry",
    description: "Комфортный седан в отличном состоянии",
    location: "Казань",
    type: "Авто",
    brand: "Toyota",
    model: "Camry",
    year: 2018,
    mileage: 50000,
  },
  {
    id: 5,
    name: "BMW X5",
    description: "Премиальный внедорожник с полным приводом",
    location: "Екатеринбург",
    type: "Авто",
    brand: "BMW",
    model: "X5",
    year: 2020,
    mileage: 30000,
  },
  {
    id: 6,
    name: "Lada Granta",
    description: "Экономичный автомобиль для города",
    location: "Нижний Новгород",
    type: "Авто",
    brand: "Lada",
    model: "Granta",
    year: 2015,
    mileage: 100000,
  },
  {
    id: 7,
    name: "Ремонт сантехники",
    description: "Качественный ремонт сантехники любой сложности",
    location: "Новосибирск",
    type: "Услуги",
    serviceType: "Сантехника",
    experience: 10,
    cost: 2000,
    workSchedule: "Пн-Пт, 9:00-18:00",
  },
  {
    id: 8,
    name: "Уроки английского",
    description: "Индивидуальные занятия с носителем языка",
    location: "Москва",
    type: "Услуги",
    serviceType: "Образование",
    experience: 5,
    cost: 1500,
  },
  {
    id: 9,
    name: "Фотосессия",
    description: "Профессиональная фотосессия в студии или на природе",
    location: "Санкт-Петербург",
    type: "Услуги",
    serviceType: "Фотография",
    experience: 7,
    cost: 5000,
  },
  {
    id: 10,
    name: "Квартира у моря",
    description: "Апартаменты с видом на море",
    location: "Сочи",
    type: "Недвижимость",
    propertyType: "Квартира",
    area: 70,
    rooms: 2,
    price: 15000000,
  },
  {
    id: 11,
    name: "Audi A4",
    description: "Стильный седан с минимальным пробегом",
    location: "Краснодар",
    type: "Авто",
    brand: "Audi",
    model: "A4",
    year: 2019,
    mileage: 40000,
  },
  {
    id: 12,
    name: "Ремонт компьютеров",
    description: "Настройка и ремонт ПК и ноутбуков",
    location: "Воронеж",
    type: "Услуги",
    serviceType: "IT",
    experience: 8,
    cost: 1000,
  },
  {
    id: 13,
    name: "Коттедж в лесу",
    description: "Уединенный коттедж для отдыха",
    location: "Карелия",
    type: "Недвижимость",
    propertyType: "Дом",
    area: 200,
    rooms: 6,
    price: 30000000,
  },
  {
    id: 14,
    name: "Hyundai Solaris",
    description: "Надежный автомобиль для города",
    location: "Ростов-на-Дону",
    type: "Авто",
    brand: "Hyundai",
    model: "Solaris",
    year: 2017,
    mileage: 80000,
  },
  {
    id: 15,
    name: "Уборка квартир",
    description: "Генеральная уборка квартир и домов",
    location: "Москва",
    type: "Услуги",
    serviceType: "Клининг",
    experience: 3,
    cost: 2500,
  },
  {
    id: 16,
    name: "Mercedes-Benz E-Class",
    description: "Роскошный седан с полным комплектом опций",
    location: "Санкт-Петербург",
    type: "Авто",
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2021,
    mileage: 20000,
  },
  {
    id: 17,
    name: "Юридические консультации",
    description: "Помощь в решении юридических вопросов",
    location: "Екатеринбург",
    type: "Услуги",
    serviceType: "Юриспруденция",
    experience: 12,
    cost: 3000,
  },
  {
    id: 18,
    name: "Таунхаус",
    description: "Современный таунхаус в спальном районе",
    location: "Казань",
    type: "Недвижимость",
    propertyType: "Таунхаус",
    area: 120,
    rooms: 4,
    price: 18000000,
  },
  {
    id: 19,
    name: "Kia Rio",
    description: "Экономичный и надежный автомобиль",
    location: "Уфа",
    type: "Авто",
    brand: "Kia",
    model: "Rio",
    year: 2016,
    mileage: 90000,
  },
  {
    id: 20,
    name: "Репетитор по математике",
    description: "Подготовка к ЕГЭ и ОГЭ",
    location: "Новосибирск",
    type: "Услуги",
    serviceType: "Образование",
    experience: 6,
    cost: 1200,
  },
];

let users = [
  {
    id: 1,
    email: "test@example.com",
    name: "axe",
    surname: "attaxe",
    password: "123123",
    city: "Москва",
    items: [],
    image: "",
  },
];

const makeCounter = () => {
  let count = items.length + 1;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Ручки, связанные с объявлением
// Создание нового объявления
app.post("/items", (req, res) => {
  const { name, description, location, type, ...rest } = req.body;

  // Валидация общих полей
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Real estate" });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Auto" });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: "Missing required fields for Services" });
      }
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get("/items", (req, res) => {
  res.json(items);
});

// Получение объявления по его id
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Обновление объявления по его id
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send("Item not found");
  }
});

// Удаление объявления по его id
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Item not found");
  }
});

const usersIdCounter = makeCounter();

app.get("/users", (req, res) => {
  res.json(users);
});

// Ручки, связанные с пользователем
// Регистрация пользователя
app.post("/users/register", (req, res) => {
  const { email, password, name, surname, city, image } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Неверно заполненны данные" });
  }
  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "Пользователь уже существует" });
  }
  const user = {
    id: usersIdCounter(),
    email,
    password,
    surname,
    name,
    city,
    image,
    items: [],
  };
  users.push(user);
  res.status(201).json(user);
});

// Вход пользователя
app.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "yourSecretKey",
    {
      expiresIn: "5h",
    }
  );

  res.json({
    message: "Login successful",
    token,
    user,
  });
});

app.get("/users/:id", (req, res) => {
  const user = users.find((i) => i.id === parseInt(req.params.id, 10));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// Изменение данных пользователя
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  Object.assign(user, req.body);
  res.json(user);
});

// Добавление объявления пользователю
app.post("/users/:id/items", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id, 10));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { name, description, location, type, ...rest } = req.body;
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: "Missing required common fields" });
  }
  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  };
  user.items.push(item);
  items.push(item);
  res.status(201).json(item);
});

// Удаление пользователя
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(
    (u) => u.id === parseInt(req.params.id, 10)
  );
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(userIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
