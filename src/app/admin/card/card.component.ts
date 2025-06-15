import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food } from 'src/app/model/food';
import { FoodService } from 'src/app/service/food.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  lesTypes: string[] = ["Pizza", "Pasta", "Chicken", "Humberger", "Salade", "Soupe"];
  cardForm!: FormGroup;
  actionBtn: string = "Add Product";
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private dialogRef: MatDialogRef<CardComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Food
  ) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      image: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // string number validation
    });

    if (this.editData) {
      this.actionBtn = "Update";
      // Patch form fields (price en string, pas number)
      this.cardForm.patchValue({
        image: this.editData.image,
        name: this.editData.name,
        type: this.editData.type,
        ingredients: this.editData.ingredients,
        price: this.editData.price.toString(),
      });
    }
  }

  onAddProduct() {
  if (!this.editData && this.cardForm.valid) {
    // Crée un objet Food simple
    const foodData= {
      name: this.cardForm.get('name')?.value ?? '',
      type: this.cardForm.get('type')?.value ?? '',
      ingredients: this.cardForm.get('ingredients')?.value ?? '',
      price: this.cardForm.get('price')?.value.toString(),
      image: 'assets/images/' + (this.selectedFile?.name ?? 'default.jpg'),
    };

    this.foodService.addFoods(foodData).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}


  updateProduct() {
    if (this.cardForm.valid && this.editData) {
      // Ici on envoie l'objet Food sans image car updateFoods attend Food, pas FormData
      const updatedFood: Food = {
        id: this.editData.id,
        image: this.cardForm.get('image')?.value ?? this.editData.image,
        name: this.cardForm.get('name')?.value,
        type: this.cardForm.get('type')?.value,
        ingredients: this.cardForm.get('ingredients')?.value,
        price: this.cardForm.get('price')?.value.toString()
      };

      this.foodService.updateFoods(Number(this.editData.id), updatedFood).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onSubmit() {
    this.editData ? this.updateProduct() : this.onAddProduct();
  }

  imagePreviewUrl: string | ArrayBuffer | null = null;

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result;

      // On stocke le nom du fichier comme valeur du champ image
      this.cardForm.patchValue({
        image: file.name
      });
    };
    reader.readAsDataURL(file); // lit le fichier comme DataURL
  }
}

}
