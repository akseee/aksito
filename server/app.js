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
const items = require("./items").items;
const users = require("./users").users;

app.use(
  bodyParser.json(),
  cors({
    origin: "*",
  })
);

const makeCounter = () => {
  let count = items.length;
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
  const { page = "1", limit = "5" } = req.query;

  const pageLimit = parseInt(limit, 10);
  const pageNumber = parseInt(page, 10);

  // рассчитываем индексы для среза массива
  const from = (pageNumber - 1) * pageLimit;
  const to = from + pageLimit;
  const data = items.slice(from, to);

  res.json({
    items: data,
    totalItems: items.length,
    totalPages: Math.ceil(items.length / pageLimit),
    currentPage: pageNumber,
  });
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
