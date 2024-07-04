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

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  snackBar = inject(MatSnackBar);
  productsService = inject(ProductsService);
  router = inject(Router);
  product: Product = inject(ActivatedRoute).snapshot.data['product'];

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
    image: new FormControl<string>(this.product.image, {
      nonNullable:true,
      validators: Validators.required 
    }),
  });

  onSubmit(){
    this.productsService.update(this.product.id, {
      name: this.form.controls.name.value,
      price: this.form.controls.price.value,
      description: this.form.controls.description.value,
      image: this.form.controls.image.value
    })
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
