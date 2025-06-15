import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../model/food';
const URL = 'http://localhost:4000/foods';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }
  
  getFoods():Observable<Food[]>{
    return this.http.get<Food[]>(URL);
  }
  getFoodsById(id:string){
    const res = this.http.get(`${URL}/${id}`);
    console.log('from service food : ',res)
    return res
  }
  addFoods(f:Partial<Food>):Observable<Food>{
    return this.http.post<Food>(URL, f);
  }
  updateFoods(id:number,f:Food){
    return this.http.put<Food>(URL+"/"+id ,f)
  }
  deleteFoods(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }



  
}
