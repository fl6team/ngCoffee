// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock('7KoVexTTOhoChnqLdWoL4NvtaVFNnv0L', 'comanche.eu.auth0.com', {});
  userProfile: Object;

  constructor(public router: Router) {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    this
      .router
      .events
      .filter(event => event instanceof NavigationStart)
      .filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
      .subscribe(() => {
        this.lock.resumeAuth(window.location.hash, (error, authResult) => {
          if (error) return console.log(error);
          // Fetch profile information
          this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
              // Handle error
              alert(error);
              return;
            }

            localStorage.setItem('profile', JSON.stringify(profile));
            this.userProfile = profile;
          });
          localStorage.setItem('id_token', authResult.idToken);
          this.router.navigate(['/']);
        });
      });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    this.userProfile = undefined;
  }
}
