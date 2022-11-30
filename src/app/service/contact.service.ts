import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact';
const URL = 'http://localhost:3000/contacts';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient ) { }
  getContacts():Observable<Contact[]>{
    return this.http.get<Contact[]>(URL);
  }
  addContacts(c:Contact):Observable<Contact>{
    return this.http.post<Contact>(URL, c)
  }
}
