const mongoose = require('mongoose');

const url = process.env.DB_URL

const options = {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


mongoose.connect(url, options);
const connection = mongoose.connection;
connection.on('error', err => console.error('connection error: ', err));
connection.once('open', () => console.log('connected to: ', connection.name))