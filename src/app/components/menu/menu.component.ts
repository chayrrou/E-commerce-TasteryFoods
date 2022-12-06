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
  foodsBackup !: Food[];
  
  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      value => {
        this.lesFoods = value 
        this.foodsBackup = value
      }
    )
  }
  onSearch(textInput: string) {
    if (textInput === "") {
      this.lesFoods = this.foodsBackup
    } else {
    this.lesFoods = this.lesFoods.filter(food => {
      const foodCode = `${food.name} ${food.type} ${food.price}`.toLocaleLowerCase()
      const result = foodCode.match(textInput.toLowerCase());
      return result?.length;
    })
  }}

}
