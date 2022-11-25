import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/model/contact';
const URL ="http://localhost:2000/contact";
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  getContacts():Observable<Contact[]>{
        return this.http.get<Contact[]>(URL);
  }
  addContact(c: Contact):Observable<Contact>{
    return this.http.post<Contact>(URL,c);
  }
}
