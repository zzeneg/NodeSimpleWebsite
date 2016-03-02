import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app';
import {UserService} from './services/userService';
import {AuthService} from './services/authService';
import 'rxjs/Rx';

bootstrap(AppComponent, [HTTP_PROVIDERS, UserService, AuthService]);
