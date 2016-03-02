/// <reference path="../../../server/models/models.d.ts" />

import {Injectable} from 'angular2/core';
import {AuthService} from './authService';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class UserService {
	private _currentUserObserver: any = null;

	public currentUser: Observable<Models.IUser> = null;

	constructor(private _authService: AuthService) {
		this.currentUser = new Observable(observer => this._currentUserObserver = observer);
		this._authService.getCurrentUser().subscribe(user => this._currentUserObserver.next(user));
	}

	public setCurrentUser(user: Models.IUser) {
		this._currentUserObserver.next(user);
	}
}