const RolDepartment = require("../models/rolDepartment.model");

module.exports.create = (req, res, next) => {
  const { name, state, department, squad } = req.body;

  const rol = {
    name,
    state: !state ? "Inactive" : state,
    department: !department ? null : department,
  };

  RolDepartment.create(rol)
    .then((rol) => {
      res.status(202).json(rol);
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const updateRol = req.body;

  RolDepartment.findOneAndUpdate(id, updateRol, { new: true })
    .then((rol) => {
      if (!rol) {
        res.status(404).json({ message: "Rol not found" });
      } else {
        res.status(202).json(rol);
      }
    })
    .catch(next);
};

module.exports.getRoles = (_, res, next) => {
  RolDepartment.find()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch(next);
};

module.exports.getDepartmentRoles = (req, res, next) => {
  const { department } = req.params;

  RolDepartment.find({ department })
    .then((roles) => {
      if (!roles) {
        res.status(404).json({ message: "Roles not founds" });
      } else {
        res.status(200).json(roles);
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  RolDepartment.findOneAndDelete(id)
    .then((del) => {
      res.status(202).json({ message: "Rol deleted" });
    })
    .catch(next);
};
