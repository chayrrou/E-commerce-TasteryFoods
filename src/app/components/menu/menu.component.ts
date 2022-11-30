import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Food } from 'src/app/model/food';
import { FoodService } from 'src/app/service/food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  lesFoods !: Food[]; 
  
  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      value => this.lesFoods = value
    )
  }

}
