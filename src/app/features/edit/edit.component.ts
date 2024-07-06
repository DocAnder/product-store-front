import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  snackBar = inject(MatSnackBar);
  productsService = inject(ProductsService);
  router = inject(Router);
  product: Product = inject(ActivatedRoute).snapshot.data['product'];
  selectedFile!: File;
  fileWhasSelected = false

  form = new FormGroup({
    name: new FormControl<string>(this.product.name, {
      nonNullable:true,
      validators: Validators.required 
    }),
    price: new FormControl<string>(this.product.price, {
      nonNullable:true,
      validators: Validators.required 
    }),
    description: new FormControl<string>(this.product.description, {
      nonNullable:true,
      validators: Validators.required 
    }),
    image: new FormControl<File | null>(this.product.image, {
      nonNullable:true,
      validators: Validators.required 
    }),
  });

  onFileChange(event: any) {
    console.log('evento acionado trouxe o valor de ' + this.fileWhasSelected);      
    if (event.target.files.length > 0) {            
      this.fileWhasSelected = true;      
      console.log('o if do arquivo passou e agora é ' + this.fileWhasSelected);
      this.selectedFile = event.target.files[0];      
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('name', this.form.controls.name.value)
    formData.append('price', this.form.controls.price.value)
    formData.append('description', this.form.controls.description.value)
    if(this.fileWhasSelected){
      formData.append('image', this.selectedFile);
    }    
    this.productsService.updateProductWithImage(this.product.id, formData)
    .subscribe(() => {
      this.snackBar.open('Produto Editado!','', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigateByUrl('/');
    });    
  }

}
