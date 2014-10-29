/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/sequelize/sequelize.d.ts" />

export var userModel;

export function init(db) {
    var sequelize = require('sequelize');

    userModel = db.define('User', {
        email : sequelize.STRING,
        password : sequelize.STRING
    });

    db.sync()
        .complete((err) => {
             if (!!err) {
                 console.log('An error occurred while creating the table:', err);
             }
        });
}


