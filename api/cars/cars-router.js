// DO YOUR MAGIC
const express = require('express');

const router = express.Router();

const {checkCarId, checkCarPayload, 
checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware');

const Cars = require('./cars-model');

router.get('/api/cars', async (req, res) => {
    try {
        const cars = await Cars.getAll();
        res.status(200).json(cars);
    } catch(err) {
        res.status(500).json({ message: "could not retrieve cars" });
    }
});

router.get('/api/cars/:id', checkCarId, async (req, res) => {
    const {id} = req.params;
    try {
        const car = await Cars.getById(id);
        res.status(200).json(car);
    } catch(err) {
        res.status(500).json({ message: "could not retrieve car" });
    }
});

router.post('/api/cars', checkVinNumberUnique, checkCarPayload, checkVinNumberValid, async (req, res) => {
    const car = req.body;
    try {
        const newCar = await Cars.create(car);
        res.status(201).json(newCar);
    } catch(err) {
        res.status(500).json({ message: "could not create new car" });
    }
});

module.exports = router;