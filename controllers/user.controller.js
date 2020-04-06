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

module.exports.login = (req, res, next) => {
  const { nickName, password } = req.body;

  User.findOne({ nickName }).then((user) => {
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      console.log("entra");
      return user.comparePassword(password).then((match) => {
        if (match) {
          req.session.user = user;
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      });
    }
  });
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.status(204).json({ message: "Session destroyed" });
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const userToUpdate = req.body;

  User.findOneAndUpdate(id, userToUpdate, { new: true })
    .then((user) => {
      res.status(202).json(user);
    })
    .catch(next);
};
