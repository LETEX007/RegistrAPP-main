import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../servicios/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  permiso:any;
  constructor(private router:Router, private storage:StorageService) { } 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth();
  }
  async checkAuth(){
    try {
      this.permiso = JSON.parse(await this.storage.getAuth());
    } catch (error) {
      console.log(error)
    }
    if(!this.permiso){
      console.log('NO TIENE PERMISO');
      this.router.navigate(['login']);
      return false;
    }
    console.log("si tiene permiso")
    return true;
  }

  
}
