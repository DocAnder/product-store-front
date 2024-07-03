import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: any[] = [];

  httpClient = inject(HttpClient);

  ngOnInit() {
    this.httpClient.get<any>('http://127.0.0.1:8000/api/products').subscribe((products) => {
      this.products = products;
    });
  }

}
