import { Injectable } from '@angular/core';
import { AuthComponent } from '../service/auth/auth.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  getAuthComponent(): Observable<any[]>{
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
  }
}
