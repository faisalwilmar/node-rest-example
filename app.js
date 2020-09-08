const express = require('express');
const app = express();
const morgan = require('morgan'); //nodejs http request logger
const bodyParser = require('body-parser'); //allow us to parse body (json data) from request
const mongoose = require('mongoose'); //mongodb connector
const logger = require('./api/util/logger');

const sequelize = require('./api/util/databaseseq'); //import the database with sequelize

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const barangRoutes = require('./api/routes/barangs');
const itemRoutes = require('./api/routes/items');
const pesananRoutes = require('./api/routes/pesanans');

mongoose.connect(
    process.env.MONGODB_CONN_STRING, {
        useNewUrlParser: true
    }
);

// ==== SYNC ALL SEQUELIZE DEFINED MODEL WITH DATABASE ====
const Pesanan = require('./api/models/pesanan');
const Item = require('./api/models/item');

// == DEFINE THE RELATIONSHIP ==
Item.belongsToMany(Pesanan, { through: 'Item_Pesanan' });
Pesanan.belongsToMany(Item, { through: 'Item_Pesanan' });
// == END ==

// sequelize.sync({force : true}) //this will delete all available table and recreate
sequelize.sync()
    .then(result => {
        // console.log(result);
        logger.info('MySQL Database Synchronized');
    })
    .catch(err => {
        logger.error(err.message);
    });
// ==== END ====

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')) //this make 'uploads' folder static and available for public
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //allow us to extract data from JSON Request Body with req.body.<entity_name>

//============== ALLOW CORS ==============
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});
//============== ALLOW CORS ENDED ==============

//============== ROUTES THAT HANDLE REQUEST ==============
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/barangs', barangRoutes);
app.use('/items', itemRoutes);
app.use('/pesanans', pesananRoutes);
//============== ROUTES THAT HANDLE REQUEST ENDED ==============

//============== ERROR HANDLING ==============
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error); //if routes not found, throw error
});

app.use((error, req, res, next) => { //get error thrown from anywhere then return to user as response
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
//============== ERROR HANDLING ENDED ==============

module.exports = app;