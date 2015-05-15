/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/sequelize/sequelize.d.ts" />

export var instance;

export function init(dbName: string) {
    var sequelize = require('sequelize');

    instance = new sequelize(dbName, null, null, {
        dialect: "sqlite",
        port:    3306,
        storage: 'test.sqlite'
    });
}


