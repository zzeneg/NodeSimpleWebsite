/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/sequelize/sequelize.d.ts" />

class Database {
	public static instance;

	public static init(dbName: string) {
		var sequelize = require('sequelize');

		this.instance = new sequelize(dbName, null, null, {
			dialect: "sqlite",
			port: 3306,
			storage: 'test.sqlite'
		});
	}
}

export = Database;

