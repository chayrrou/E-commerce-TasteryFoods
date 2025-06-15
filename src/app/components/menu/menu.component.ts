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
  foodsBackup!: Food[];
  filteredFoods!: Food[];
  allCategories: string[] = ['All', 'Pizza', 'Pasta', 'Salade', 'Dessert', 'Drink', 'Vegan','Soupe'];
  activeCategory: string = 'All';
  
  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      value => {
        this.lesFoods = value 
        this.foodsBackup = value
        this.filteredFoods = value;
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

   filterByCategory(category: string) {
    this.activeCategory = category;
    if (category === 'All') {
      this.filteredFoods = this.lesFoods;
    } else {
      this.filteredFoods = this.lesFoods.filter(food => 
        food.type?.toLowerCase() === category.toLowerCase()
      );
    }
  }
  // Méthode optionnelle pour extraire les catégories dynamiquement
  // private extractCategories() {
  //   const categories = new Set<string>(['All']);
  //   this.lesFoods.forEach(food => {
  //     if (food.type) {
  //       categories.add(food.type);
  //     }
  //   });
  //   this.allCategories = Array.from(categories);
  // }

}
