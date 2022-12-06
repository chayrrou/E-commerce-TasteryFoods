import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './service/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthPageAdminGuard implements CanActivate {
  constructor(private route:Router, 
              private authentificationService : AuthentificationService ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.authentificationService.user;
      if(user?.role === "admin")
      return true;
      else {
      return false;
      }
    }
       

  
}
