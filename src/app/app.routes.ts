import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { inject } from '@angular/core';
import { CreateComponent } from './features/create/create.component';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
    {
    path: '',
    component: ListComponent
},
{
    path: 'create-product',
    loadComponent: () => import ('./features/create/create.component').then(
        (m) => m.CreateComponent
    ),
},
{
    path: 'edit-product/:id',
    resolve: {
        product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const service = inject(ProductsService);
            return service.getOne(route.paramMap.get('id') as string);            
        },
    },
    loadComponent: () => import('./features/edit/edit.component').then(
        (m) => m.EditComponent
    ),
},
{
    path: 'product-details/:id',
    resolve: {
        product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const service = inject(ProductsService);
            return service.getOne(route.paramMap.get('id') as string);            
        },
    },
    loadComponent: () => import('./features/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
    ),
}
];
