import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../model/food';
const URL = 'http://localhost:5000/foods';
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
    return res
  }
  addFoods(f:Food):Observable<Food>{
    return this.http.post<Food>(URL, f);
  }
  updateFoods(id:number,f:Food){
    return this.http.put<Food>(URL+"/"+id ,f)
  }
  deleteFoods(id : number){
    return this.http.delete(`${URL}/${id}`);
  }
}
