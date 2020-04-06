const User = require("../models/user.model");
const mongoose = require("mongoose");

module.exports.prueba = (req, res, next) => {
  res.json({ message: "prueba" });
};

module.exports.create = (req, res, next) => {
  const { name, lastName1, lastName2, nickName, password, email } = req.body;
  console.log(req.body);
  const user = { name, lastName1, lastName2, nickName, password, email };

  User.create(user)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch(next);
};

module.exports.getFilterUsers = (req, res, next) => {
  const { userType } = req.params;

  User.find({ userType })
    .then((users) => res.status(200).json(users))
    .catch(next);
};
