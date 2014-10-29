/// <reference path="../../typings/node/node.d.ts" />

var Sequelize = require('sequelize');
var sequelize = new Sequelize('test', 'node', 'passw0rd', {
    dialect: "mysql",
    port:    3306
});

sequelize
    .authenticate( )
    .complete((err) => {
        if (!!err) {
            console.log('Unable to connect to the database:', err);
        } else {
            console.log('Connection has been established successfully.');
        }
    });

module.exports = sequelize;
