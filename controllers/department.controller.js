const Department = require("../models/department.model");

module.exports.new = (req, res, next) => {
  const { title, depImage, state, userCreate } = req.body;

  const department = {
    title,
    depImage: !depImage ? "image" : depImage,
    state: !state ? "Inactive" : state,
    userCreate,
  };

  Department.create(department)
    .populate("userCreate")
    .then((dep) => {
      res.status(200).json(dep);
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const toUpdate = req.body;
  console.log("entra");
  Department.findByIdAndUpdate(id, toUpdate, { new: true })
    .populate("userCreate")
    .then((dep) => {
      if (!dep) {
        res.status(404).json({ message: "department not found" });
      } else {
        res.status(202).json(dep);
      }
    })
    .catch(next);
};

module.exports.getAll = (req, res, next) => {
  Department.find()
    .populate("userCreate")
    .then((departments) => {
      if (!departments) {
        res.status(404).json({ message: "Departments not founds" });
      } else {
        res.status(200).json(departments);
      }
    });
};

module.exports.getDepartment = (req, res, next) => {
  const { id } = req.params;
  Department.findById(id)
    .populate("userCreate")
    .then((dep) => {
      if (!dep) {
        res.status(404).json({ message: "Department not found" });
      } else {
        res.status(200).json(dep);
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Department.findByIdAndDelete(id)
    .then((del) => {
      res.status(202).json({ message: "Department deleted" });
    })
    .catch(next);
};
