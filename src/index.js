const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const sensorsRouter = require('./routes/sensors');
const datasetsRouter = require('./routes/datasets');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/sensors', sensorsRouter);
app.use('/data', datasetsRouter);


const PORT = process.env.PORT || 8080;

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        app.listen(PORT, () => console.log(`Database is connected. Server started on http://localhost:${PORT}`));
    },
);
