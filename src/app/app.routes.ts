import { Routes } from '@angular/router';

export enum APP_ROUTES {
  FEATURES = 'features',
}

export const routes: Routes = [
    {
        path: APP_ROUTES.FEATURES,
        loadChildren: () => import('./features/features.routes').then((m) => m.authRoutes),
    },
    {
        path: '**',
        redirectTo: APP_ROUTES.FEATURES,
    },
    {
        path: '',
        pathMatch: 'full',
    }
];
