/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/sequelize/sequelize.d.ts" />

class Models {

	public static userModel;

	public static init(db) {
	    var sequelize = require('sequelize');

	    this.userModel = db.define('User', {
	        email : sequelize.STRING,
	        password : sequelize.STRING
	    });

	    db.sync();
	}
}

export = Models;

