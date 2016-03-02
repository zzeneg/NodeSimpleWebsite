import {Component, View} from 'angular2/core';
import {AuthService} from './../../services/authService';
import {UserService} from './../../services/userService';

@Component({
    selector: 'login-widget',
})

@View({
	templateUrl: '/app/views/auth/login.html',
})

export class Login {
	public email: string;
	public password: string;
	public rememberMe: boolean;

	constructor(private _authService: AuthService, private _userService: UserService) { }

	public onSubmit() {
		console.log('LOGIN_SUBMIT')
		this._authService.login(this.email, this.password).subscribe(user => this._userService.setCurrentUser(user));
	}
}