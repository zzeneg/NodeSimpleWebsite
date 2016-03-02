import {Component, View} from 'angular2/core';
import {UserService} from './../../services/userService';

@Component({
    selector: 'header-widget',
})

@View({
	templateUrl: '/app/views/shared/header.html',
})

export class Header { 
	public user: Models.IUser = null;

	constructor(private _userService: UserService) {
		_userService.currentUser.subscribe(user => this.user = user);
	}
}