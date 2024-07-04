import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule} from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ProductsService } from '../../shared/services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  productsService = inject(ProductsService);
  snackBar = inject(MatSnackBar);

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
    image: new FormControl<string>('', {
      nonNullable:true,
      validators: Validators.required 
    }),
  });

  onSubmit(){
    this.productsService.create({
      name: this.form.controls.name.value,
      price: this.form.controls.price.value,
      description: this.form.controls.description.value,
      image: this.form.controls.image.value
    })
    .subscribe(() => {
      this.snackBar.open('Produto Salvo!','', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });    
  }

}
