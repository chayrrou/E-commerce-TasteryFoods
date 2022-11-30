import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/model/food';
import { FoodService } from 'src/app/service/food.service';


@Component({
  selector: 'app-card-food',
  templateUrl: './card-food.component.html',
  styleUrls: ['./card-food.component.css']
})
export class CardFoodComponent implements OnInit {

  foodDetails !: Food | any;
  foodId:string = '0'
  constructor(private activatedRoute:ActivatedRoute, private foodService : FoodService) { }

  ngOnInit(): void {
    this.foodId = this.activatedRoute.snapshot.params['id'];
    this.foodService.getFoodsById(this.foodId).subscribe(
      (value) => this.foodDetails = value
    )
  }
}
