import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  categoryForm!: FormGroup;
  isEditMode = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCategorieComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', category?: Category }
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data.mode === 'edit';

    this.categoryForm = this.fb.group({
      name: [this.data.category?.name || '', [Validators.required, Validators.maxLength(50)]],
    });

    if (this.isEditMode && this.data.category) {
      this.categoryForm.patchValue(this.data.category);
    }
  }

   onSubmit(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
