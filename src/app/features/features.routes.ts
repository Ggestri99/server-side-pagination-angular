import { Routes } from '@angular/router';

export enum FEATURES_ROUTES {
    PRODUCT_LIST = 'product-list',
    PRODUCT_DETAILS = 'product-details',
}

export const authRoutes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: FEATURES_ROUTES.PRODUCT_LIST,
    },
    {
        path: FEATURES_ROUTES.PRODUCT_LIST,
        loadComponent: () => import('./product-list/product-list.component').then((m) => m.ProductListComponent),
    },
    {
        path: FEATURES_ROUTES.PRODUCT_DETAILS,
        loadComponent: () => import('./product-details/product-details.component').then((m) => m.ProductDetailsComponent),
    },
    {
        path: '**',
        redirectTo: FEATURES_ROUTES.PRODUCT_LIST,
    }

] satisfies Routes;
