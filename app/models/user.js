var sequelize = require('./../../config/database');
var Sequelize = require('sequelize');

var User = sequelize.define('User', {
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

sequelize.sync().complete(function (err) {
    if (!!err) {
        console.log('An error occurred while creating the table:', err);
    } else {
        console.log('It worked!');
    }
});

module.exports = User;
