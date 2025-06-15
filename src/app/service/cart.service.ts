import { Injectable } from '@angular/core';
import { Food } from '../model/food';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartList: Cart[] = [];
  private cartListSubject = new BehaviorSubject<Cart[]>([]);
  cartList$ = this.cartListSubject.asObservable();

  get cartList(): Cart[] {
    return this._cartList;
  }

  addToCart(food: Food) {
    const existing = this._cartList.find(item => item.id === food.id);
    if (existing) {
      existing.quantity++;
    } else {
      const cartItem = new Cart(food.id, food.name, food.image, food.price, 1);
      this._cartList.push(cartItem);
    }
    this.cartListSubject.next(this._cartList);
  }

  removeItem(id: number) {
    this._cartList = this._cartList.filter(item => item.id !== id);
    this.cartListSubject.next(this._cartList);
  }

  updateQuantity(id: number, change: number) {
    const item = this._cartList.find(i => i.id === id);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) item.quantity = 1;
      this.cartListSubject.next(this._cartList);
    }
  }

  getTotal(): number {
    return this._cartList.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
}
