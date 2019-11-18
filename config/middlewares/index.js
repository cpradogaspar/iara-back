const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');

module.exports = function (app) {

    app.use((req, res, next) => {
        res.set('X-Powered-By', 'PHP/7.1.7');
        next();
    });

    app.use(compression());

    app.use(cors());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '2mb' }));

    app.use(cookieParser());
}