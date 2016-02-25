import * as sequelize from 'sequelize';

interface IUserInstance extends sequelize.Instance<Models.IUser>, Models.IUser { }

interface IUserModel extends sequelize.Model<IUserInstance, Models.IUser> {
	//conformValueToType: (attrType: string, originalValue: any) => Promise<IUserInstance>;
}

export default class User {

	id: number;
	email: string;
	password: string;
	twitterId: string;
	twitterToken: string;
	twitterUserName: string;
	twitterDisplayName: string;

	public static userModel: IUserModel;

	public save(): Promise<IUserInstance> {
		return User.userModel.create(this);
	}

	public static define(db: sequelize.Sequelize) {
		User.userModel = <IUserModel>db.define<IUserInstance, Models.IUser>('User', {
			'id': { 'type': sequelize.INTEGER(20).UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true },
			'email': { 'type': sequelize.STRING(128) },
			'password': { 'type': sequelize.STRING(128) },
			'twitterId': { 'type': sequelize.STRING(128) },
			'twitterToken': { 'type': sequelize.STRING(128) },
			'twitterUserName': { 'type': sequelize.STRING(128) },
			'twitterDisplayName': { 'type': sequelize.STRING(128) },
			// 'Type': {
			// 	'type': sequelize.ENUM('Boolean', 'Date', 'DateTime', 'Enumeration', 'Float', 'Integer', 'JSON',
			// 		'RichText', 'String', 'Text')
			// },
			// 'DefaultValue': {
			// 	'type': sequelize.BLOB, get:
			// 		function(named) {
			// 			var type = this.getDataValue('Type');
			// 			var value = this.getDataValue(named);
			// 			return sequelize.models['Attribute'].conformValueToType(type, value);
			// 		}
			// },
			// 'CreatedBy': { 'type': sequelize.INTEGER(20).UNSIGNED },
			// 'Created': { 'type': sequelize.DATE }
		},
			{
				tableName: 'Users',
				timestamps: false,
				// getterMethods:
				// {
				// },
				// classMethods:
				// {
				// 	conformValueToType: (attrType, originalValue) => {
				// 		if (originalValue === null || originalValue === undefined)
				// 			return originalValue;
				// 		var valueAsStr = originalValue.toString();
				// 		if (attrType === 'Boolean')
				// 			return valueAsStr === 'true';
				// 		if (attrType === 'Integer')
				// 			return parseInt(valueAsStr, 10);
				// 		if (attrType === 'Float') {
				// 			if (valueAsStr === '')
				// 				return 0.0;
				// 			return parseFloat(valueAsStr);
				// 		}
				// 		return valueAsStr;
				// 	}
				// }
			});
	}
}

