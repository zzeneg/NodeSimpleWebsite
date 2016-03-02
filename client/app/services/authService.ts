import {Injectable} from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class AuthService {

	private loginUrl = '/api/auth/login';
	private currentUserUrl = '/api/auth';

	constructor(private http: Http) { }

	public login(email: string, password: string): Observable<Models.IUser> {
		let body = JSON.stringify({ email, password });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.loginUrl, body, options)
			.map(res => <Models.IUser>res.json())
			.catch(this.handleError)
	}

	public getCurrentUser(): Observable<Models.IUser> {
		return this.http.get(this.currentUserUrl)
			.map(res => <Models.IUser>res.json())
			.catch(this.handleError)
	}

	private handleError(error: Response) {
		// in a real world app, we may send the error to some remote logging infrastructure
		// instead of just logging it to the console
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}