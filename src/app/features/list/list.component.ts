import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from "@angular/material/button"
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog"

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <h2 mat-dialog-title>Deletar Produto</h2>
  <mat-dialog-content>
    Tem certeza que quer prosseguir com a deleção?
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="onNo()">Não</button>
    <button mat-raised-button collor="accent" (click)="onConfirm()" cdkFocusInitial>Sim</button>
  </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {

  matDialogRef = inject(MatDialogRef);

  onNo(){
    this.matDialogRef.close(false);
  }

  onConfirm(){
    this.matDialogRef.close(true);
  }

}


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: Product[] = [];

  productsService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  onEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }

  onDelete(product: Product){
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .subscribe((answer: boolean) =>{
      console.log('afterClosed', answer);
    });
  }

}
