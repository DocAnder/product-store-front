import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);

  getAll(){
    return this.httpClient.get<Product[]>('http://127.0.0.1:8000/api/products');
  }

  create(payload: ProductPayload){
    return this.httpClient.post('http://127.0.0.1:8000/api/products', payload);
  }
  
}
