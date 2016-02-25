import User from './../app/models/user';

export default class Database {
	private static instance;

	public static init(dbName: string) {
		var sequelize = require('sequelize');

		this.instance = new sequelize(dbName, null, null, {
			dialect: "sqlite",
			port: 3306,
			storage: 'test.sqlite'
		});

		User.define(this.instance);

		this.instance.sync();
	}
}



