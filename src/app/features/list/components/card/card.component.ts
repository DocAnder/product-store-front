import { Component, input, computed, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  product = input.required<Product>();

  @Output() edit = new EventEmitter();

  productName = computed(() => this.product().name)
  productPrice = computed(() => this.product().price)

  onEdit() {
    this.edit.emit();
  }

}
