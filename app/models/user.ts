/// <reference path="../../typings/node/node.d.ts" />

// load the things we need
var sequelize = require('./../../config/database');
var Sequelize = require('sequelize');

// define the schema for our user model
var User = sequelize.define('User', {
        email        : Sequelize.STRING,
        password     : Sequelize.STRING,
});

sequelize
  .sync({ force: true })
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the table:', err)
     } else {
       console.log('It worked!')
     }
  })

module.exports = User;
