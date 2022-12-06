import { Injectable } from '@angular/core';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList : Food[] = [];

  constructor() {
    
  }

  addToCart (foodDetails: Food) {
    this.cartList.push(foodDetails)
    // console.log(foodDetails)
  }

  removeItem (itemId: number) {
    const index = this.cartList.findIndex(item => item.id === itemId);
    const x = this.cartList.splice(index, 1);
  }
  
}
