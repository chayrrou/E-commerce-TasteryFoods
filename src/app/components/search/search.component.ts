import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/model/food';
import { FoodService } from 'src/app/service/food.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  lesFoods !: Food[]; 
  constructor(private foodService :FoodService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      data => this.lesFoods = data
    )
  }
  type !: string;
  onSearch(type : string){
    //  return  this.lesFoods.filter((a:any)=>
    // {
    //   if(a.type == type){
        
    //     return a;
    //   }
    // })
  }

}
