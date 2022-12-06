import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/model/food';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  cartList!: Food[];
  totalPrice : number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartList = this.cartService.cartList;
    this.totalPrice = this.cartList.reduce((accumalator, item) => {
      console.log(item.price);
      return accumalator + Number(item.price)
    }, 0)
  }

  removeCartItem (itemId: number) {
    this.cartService.removeItem(itemId)
  }

}
