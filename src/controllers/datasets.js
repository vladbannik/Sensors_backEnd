const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const DatasetsModel = require('../models/datasets');
const SensorModel = require('../models/sensors');
const e = require('express');

const getData = async (req, res) => {
    const { sensorId } = req.params;
    try {
        const docs = await DatasetsModel.find({ "sensorId": sensorId }).select();
        res.status(200).json(docs);
    } catch (e) {
        res.status(501).json({ error: { message: 'Something went wrong' } });
    }
};

const createData = async (req, res) => {
    const { sensorId, datas, token } = req.body;
    try {
        const docs = await SensorModel.findOne({ "id": sensorId, token }).exec();
        if (docs) {
            await DatasetsModel.create({
                id: uuidv4(),
                sensorId,
                datas
            });
            res.status(200).json({ success: 'data created' });
        }
        else
            res.status(401).json({ error: { message: 'token or sensorId is bad' } });

    }
    catch (e) {
        res.status(422).json({ error: { message: 'data is already taken' } });
    }
};

const deleteData = async (req, res) => {
    const { id } = req.params;

    try {
        await DatasetsModel.findOneAndDelete({ id });
        res.status(200).json({ success: 'OK' });
    } catch (e) {
        res.status(500).send('Something went wrong');
    }
};
module.exports = {
    getData,
    createData,
    deleteData
};