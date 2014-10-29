/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/sequelize/sequelize.d.ts" />

export var instance;

export function init(dbName: string, userName: string, password: string) {
    var sequelize = require('sequelize');

    instance = new sequelize(dbName, userName, password, {
        dialect: "mysql",
        port:    3306
    });
    instance
        .authenticate( )
        .complete((err) => {
            if (!!err) {
                console.log('Unable to connect to the database:', err);
            } else {
                console.log('Connection has been established successfully.');
            }
        });
}


