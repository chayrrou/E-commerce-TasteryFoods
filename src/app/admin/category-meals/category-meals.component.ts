import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/model/category';
import { CategoryServiceService } from 'src/app/service/category-service.service';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';

@Component({
  selector: 'app-category-meals',
  templateUrl: './category-meals.component.html',
  styleUrls: ['./category-meals.component.css']
})
export class CategoryMealsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name','actions'];
  dataSource!: MatTableDataSource<Category>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
      this.categoryService.addCategory(result).subscribe(() => {
        this.loadCategories();
      });
    }
    });
  }

  openEditDialog(category: Category): void {
    const dialogRef = this.dialog.open(AddCategorieComponent, {
      width: '500px',
      data: { mode: 'edit', category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }



  editCategory(category: Category): void {
  const dialogRef = this.dialog.open(AddCategorieComponent, {
    width: '500px',
    data: { mode: 'edit', category }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.categoryService.updateCategory(category.id, result).subscribe(() => {
        this.loadCategories();
      });
    }
  });
}

deleteCategory(id: number): void {
  if (confirm('Are you sure you want to delete this category?')) {
    this.categoryService.deleteCatgeory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}

  

}
