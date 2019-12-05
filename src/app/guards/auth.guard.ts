import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth} from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor( public ruta: Router, private aut : AngularFireAuth){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.aut.authState.pipe(map(
      res => {
        if(isNullOrUndefined(res)){
          this.ruta.navigate(['/login'])
            return false;
        }else{
          
          return true;
        }
      }
    ))
    
  }
 
}
export class Nologin implements CanActivate  {
  constructor( public ruta: Router, private aut : AngularFireAuth){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.aut.authState.pipe(map(
      res => {
        if(isNullOrUndefined(res)){
          
            return true;
        }else{
          this.ruta.navigate(['/home'])
          return false;
        }
      }
    ))
    
  }
 
}


