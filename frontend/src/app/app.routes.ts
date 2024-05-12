import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/groups',
    pathMatch: 'full'
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
  }
];
