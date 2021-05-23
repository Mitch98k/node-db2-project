const Cars = require('./cars-model');
const vinValidate = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  const car = await Cars.getById(id);
  if (!car) {
    res.status(404).json({ message: `car with id ${id} is not found` });
  } else {
    next();
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make, model, mileage} = req.body;
  if (!vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body;
  const isValid = vinValidate.validate(vin);

  if (!isValid) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body;
  cars = await Cars.getAll();

  if (cars.includes(vin)) {
    res.status(400).json({ message: `vin ${vin} already exists` });
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
