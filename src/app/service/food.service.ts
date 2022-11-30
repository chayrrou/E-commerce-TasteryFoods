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
}
