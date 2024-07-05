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

  getOne(id: string){
    return this.httpClient.get<Product>(`http://127.0.0.1:8000/api/products/${id}`);
  }

  create(payload: ProductPayload){
    return this.httpClient.post('http://127.0.0.1:8000/api/products', payload);
  }

  update(id: string, payload: ProductPayload){
    return this.httpClient.put(`http://127.0.0.1:8000/api/products/${id}`, payload);
  }

  delete(id: string){
    // http://127.0.0.1:8000/api/products/3
    return this.httpClient.delete(`http://127.0.0.1:8000/api/products/${id}`);
  }
  
}
