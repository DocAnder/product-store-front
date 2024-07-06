import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ProductsService } from '../../shared/services/products.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  productsService = inject(ProductsService);
  snackBar = inject(MatSnackBar);
  selectedFile!: File;
  

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable:true,
      validators: Validators.required 
    }),
    price: new FormControl<string>('', {
      nonNullable:true,
      validators: Validators.required 
    }),
    description: new FormControl<string>('', {
      nonNullable:true,
      validators: Validators.required 
    }),
  });

  onFileChange(event: any) {    
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(){
    const formData = new FormData();    
    formData.append('name', this.form.controls.name.value)
    formData.append('price', this.form.controls.price.value)
    formData.append('description', this.form.controls.description.value)
    formData.append('image', this.selectedFile);
    this.productsService.createProductWhitImage(formData)
    .subscribe(() => {
        this.snackBar.open('Produto Salvo!','', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });   
  }

}
