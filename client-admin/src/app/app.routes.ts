import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { ProductListComponent } from './features/products/pages/product-list/product-list.component';
import { ProductCreateComponent } from './features/products/pages/product-create/product-create.component';
import { ProductEditComponent } from './features/products/pages/product-edit/product-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/new', component: ProductCreateComponent },
      { path: 'products/:id/edit', component: ProductEditComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
