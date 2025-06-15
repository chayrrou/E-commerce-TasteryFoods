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
  const dialogRef = this.dialog.open(CardComponent, {
    width: "30%"
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.refreshFoods(); // ✅ recharger la liste sans reload
    }
  });
}

onEditProduct(row: any) {
  const dialogRef = this.dialog.open(CardComponent, {
    width: "30%",
    data: row
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.refreshFoods(); // ✅ mise à jour sans reload
    }
  });
}

refreshFoods() {
  this.foodService.getFoods().subscribe(value => {
    this.lesFoods = value;
    this.dataSource.data = this.lesFoods;
  });
}

 onDeleteProduct(id: number): void {
  const confirmDelete = confirm("Voulez-vous vraiment supprimer ce produit ?");

  if (confirmDelete) {
    this.foodService.deleteFoods(id).subscribe({
      next: () => {
        // Mise à jour locale sans appel au serveur supplémentaire
        this.lesFoods = this.lesFoods.filter(food => food.id !== id);
        this.dataSource.data = this.lesFoods;
      },
      error: (err) => {
        console.error("Erreur lors de la suppression :", err);
        alert("Échec de la suppression du produit.");
      }
    });
  }
}

truncateText(text: string, limit: number = 20): string {
  return text.length > limit ? text.substring(0, limit) + '...' : text;
}


 

}