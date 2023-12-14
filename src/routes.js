const express = require("express");

const routes = express.Router();
const users = [
  {
    id: 1,
    name: "Lucas",
    email: "contato@bitloop.com.br",
    password: "123456",
    moviments: [],
  },
];

routes.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    return res.status(200).json(user);
  }

  return res.status(401).json({ message: "E-mail ou senha inválidos" });
});

routes.post("/register", (req, res) => {
  const { name, lastName, email, password, confirmPassword } = req.body;

  const user = users.find((user) => user.email === email);
  if (!user) {
    return res
      .status(200)
      .json({ id: 1, name, lastName, email, password, confirmPassword });
  }

  return res.status(401).json({ message: "E-mail ou senha inválidos" });
});

routes.post("/moviment", (req, res) => {
  const {
    id,
    category,
    client,
    date,
    description,
    name,
    product,
    typeMov,
    units,
    value,
  } = req.body;

  const user = users.find((user) => user.id == id);

  const movObj = {
    category,
    client,
    date,
    description,
    name,
    product,
    typeMov,
    units,
    value,
  };

  if (!user) {
    return res.status(401).json({
      message: "Usuário não identificado",
    });
  }
  user.moviments.push(movObj);
  return res.status(200).json({
    user: user,
    moviment: movObj,
  });
});

routes.post("/getMoviment", (req, res) => {
  try {
    const { id } = req.body;

    const user = users.find((user) => user.id == id);

    res.status(200).json({
      moviments: user.moviments,
    });
  } catch (err) {
    res.status(401).json({
      message: err,
    });
  }
});

routes.post("/loginGoogle", (req, res) => {
  try {
    const { email, displayName } = req.body;
    // const { email, displayName } = obj;

    const user = users.find((user) => user.email == email);
    if (user) {
      res.status(201).json({
        type: "achou user",
        user,
      });
    } else if (!user) {
      const userObj = {
        id: users.length + 1,
        name: displayName,
        email: email,
        moviments: [],
      };
      users.push(userObj);
      res.status(201).json({ type: "não achou user", user: userObj });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: err,
    });
  }
});

module.exports = routes;
