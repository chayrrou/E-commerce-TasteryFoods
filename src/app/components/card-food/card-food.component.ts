import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/model/food';
import { CartService } from 'src/app/service/cart.service';
import { FoodService } from 'src/app/service/food.service';


@Component({
  selector: 'app-card-food',
  templateUrl: './card-food.component.html',
  styleUrls: ['./card-food.component.css']
})
export class CardFoodComponent implements OnInit {

  foodDetails !: Food | any;
  foodId:string = '0'
  isDisabled: boolean = false
  constructor(private activatedRoute:ActivatedRoute, private foodService : FoodService, private cartService: CartService) { }

  ngOnInit(): void {
    this.foodId = this.activatedRoute.snapshot.params['id'];
    this.foodService.getFoodsById(this.foodId).subscribe(
      (value) => {
        this.foodDetails = value;
        const isItemInCartList = this.cartService.cartList.find(item => item.id === this.foodDetails.id);
        this.isDisabled = isItemInCartList ? true : false;
      }
    );
  }

  addCartItem () {
    this.cartService.addToCart(this.foodDetails);
    this.isDisabled = true;
  }

}
