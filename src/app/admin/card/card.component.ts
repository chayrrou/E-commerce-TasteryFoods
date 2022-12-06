import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from 'src/app/model/food';
import { FoodService } from 'src/app/service/food.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  lesTypes:string[]=["Pizza", "Pasta", "Chicken", "Humberger","Salade","Soupe"];
  cardForm !: FormGroup;
  Foods !: Food[]; 
  actionBtn : String ="Add Product"
  constructor(private fb : FormBuilder,
              @Inject (MAT_DIALOG_DATA) public editData :any,
               private foodService : FoodService) { }

  ngOnInit(): void {
    this.cardForm = this.fb.nonNullable.group({
      id :[0],
      image : [''],
      name : ['',Validators.required],
      type : ['',Validators.required],
      ingredients :['',Validators.required],
      price : [0,Validators.required]
    })

    this.foodService.getFoods().subscribe(
      value => this.Foods = value
    )

    if(this.editData){
      this.actionBtn = "Update";
      this.cardForm.controls['id'].setValue(this.editData.id);
      this.cardForm.controls['image'].setValue(this.editData.image);
      this.cardForm.controls['name'].setValue(this.editData.name);
      this.cardForm.controls['type'].setValue(this.editData.type);
      this.cardForm.controls['ingredients'].setValue(this.editData.ingredients);
      this.cardForm.controls['price'].setValue(this.editData.price);
    }
   
  }

  onAddProduct(){
    if (!this.editData){
      this.foodService.addFoods(this.cardForm.value).subscribe(
        value => {
          this.Foods.push(value);
          location.reload();
        }
      )
    }
  }

  updateProduct(){
    this.foodService.updateFoods(this.editData.id, this.cardForm.value).subscribe(
      value => {
        location.reload()
      }
    )
  }

 

}
