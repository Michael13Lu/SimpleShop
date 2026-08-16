import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/pages/product-list-page/product-list-page').then(
        (m) => m.ProductListPage
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/pages/product-detail-page/product-detail-page').then(
        (m) => m.ProductDetailPage
      ),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/pages/cart-page/cart-page').then((m) => m.CartPage),
  },
  { path: '**', redirectTo: '' },
];
