const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const SensorModel = require('../models/sensors');

const getSensors = async (req, res) => {
    const { ownerId } = req.params;
    try {
        const docs = await SensorModel.find({ "ownerId": ownerId }).select();
        res.status(200).json(docs);
    } catch (e) {
        res.status(501).json({ error: { message: 'Something went wrong' } });
    }
};

const createSensor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { ownerId, description } = req.body;
    try {
        await SensorModel.create({
            id: uuidv4(),
            token: uuidv4(),
            ownerId,
            description,
        });
        res.status(200).json({ success: 'Sensor created' });
    }
    catch (e) {
        res.status(422).json({ error: { message: 'Sensor is already taken' } });
    }
};

const updateSensor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    try {
        await SensorModel.findOneAndUpdate({ id }, [{ $addFields: req.body }], { upsert: true });
        res.status(200).json({ success: 'OK' });
    } catch (e) {
        res.status(500).send('Something went wrong');
    }
};
const deleteSensors = async (req, res) => {
    const { id } = req.params;

    try {
        await SensorModel.findOneAndDelete({ id });
        res.status(200).json({ success: 'OK' });
    } catch (e) {
        res.status(500).send('Something went wrong');
    }
};
module.exports = {
    getSensors,
    createSensor,
    updateSensor,
    deleteSensors
};