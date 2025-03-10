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

const makeCounter = (pool) => {
  let count = pool;
  return () => count++;
};

const itemsIdCounter = makeCounter(items.length);

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
  const { page = "1", limit = "5", query, category } = req.query;

  let data = [...items];

  // страничные
  const pageLimit = parseInt(limit, 10);
  const pageNumber = parseInt(page, 10);

  // поисковые
  if (category && category !== "Все") {
    data = data.filter((item) => item.type === category);
  }

  if (query) {
    const searchQuery = query.toLowerCase();
    data = data.filter((item) => item.name.toLowerCase().includes(searchQuery));
  }

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageLimit);

  // рассчитываем индексы для среза массива
  const from = (pageNumber - 1) * pageLimit;
  const to = from + pageLimit;
  data = data.slice(from, to);

  res.json({
    items: data,
    totalItems,
    totalPages,
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

// Добавление объявления пользователю
app.get("/user/items/:id", (req, res) => {
  const userId = Number(req.params.id);
  const filterItems = [...items].filter((item) => {
    return item.owner_id === userId;
  });
  res.json(filterItems);
});

// Ручки, связанные с пользователем
const usersIdCounter = makeCounter(users.length);

app.get("/users", (req, res) => {
  res.json(users);
});

// Регистрация пользователя
app.post("/users/register", (req, res) => {
  const { email, password, name, surname, city, image, phone } = req.body;
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
    phone,
    items: [],
  };
  users.push(user);

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    "yourSecretKey",
    {
      expiresIn: "5h",
    }
  );

  res.status(201).json({ token, user });
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
