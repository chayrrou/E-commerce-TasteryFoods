import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

 const URL = 'http://localhost:4000/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
      return this.http.get<Category[]>(URL);
  }
   
    addCategory(c:Category):Observable<Category>{
      return this.http.post<Category>(URL, c);
    }
    updateCategory(id:number,c:Category){
      return this.http.put<Category>(URL+"/"+id ,c)
    }
    deleteCatgeory(id: number): Observable<void> {
      return this.http.delete<void>(`${URL}/${id}`);
    }
  
}
