/// <reference path="../../typings/browser.d.ts" />
/// <reference path="../../server/models/models.d.ts" />

import {Component, View} from 'angular2/core';
import {Header} from './views/shared/header';
import {Login} from './views/auth/login';
import {Signup} from './views/auth/signup';
import {UserService} from './services/userService';

@Component({
    selector: 'my-app',
})
@View({
	templateUrl: '/app/app.html',
	directives: [Header, Login, Signup],
})

export class AppComponent {
	public user: Models.IUser = null;

	constructor(private _userService: UserService) {
		_userService.currentUser.subscribe(user => this.user = user);
	}
}
