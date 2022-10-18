import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiclientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  //establecer la URL Base para consumir la API
  // apiURL = 'https://jsonplaceholder.typicode.com';
 apiURL='https://nancyb3a.github.io/Test/usuarios_PGY4121_03.json';

  constructor(private http: HttpClient) { }

  getJson(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }

}
