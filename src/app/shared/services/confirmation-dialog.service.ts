import { Component, Injectable, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


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

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  matDialog = inject(MatDialog);

  constructor() { }  

  openDialog(): Observable<boolean>{
    return this.matDialog
    .open(ConfirmationDialogComponent)
    .afterClosed()
  }



}
