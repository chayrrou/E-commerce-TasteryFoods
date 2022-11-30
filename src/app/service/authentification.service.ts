import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

const URL = 'http://localhost:4000/users';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http : HttpClient) { }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(URL);
  }
}
