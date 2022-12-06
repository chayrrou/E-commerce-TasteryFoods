import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Food } from 'src/app/model/food';
import { FoodService } from 'src/app/service/food.service';
import {MatDialog} from '@angular/material/dialog';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CardComponent } from '../card/card.component';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  lesFoods !: Food[];
  cardForm !: FormGroup;

  displayedColumns: string[] = ['id', 'image', 'name','type','ingredients', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb:FormBuilder, 
              private foodService : FoodService,
              private dialog: MatDialog,
              private authentificationService : AuthentificationService) { }

  ngOnInit(): void {
    this.foodService.getFoods().subscribe(
      (value) =>{
        this.lesFoods = value;
        this.dataSource = new MatTableDataSource(this.lesFoods);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } 
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm() {
    const dialogRef = this.dialog.open(CardComponent,{
      width: "30%"
    });
  }

  onEditProduct(row : any){
      this.dialog.open(CardComponent, {
        width: "30%",
        data : row
      })    
  }
  onDeleteProduct = (id : number)=>{
    this.foodService.deleteFoods(id).subscribe(value => {
      this.lesFoods = this.lesFoods.filter(elt =>elt.id !== id)
      this.dataSource.data = this.lesFoods
    })
  }
 

}