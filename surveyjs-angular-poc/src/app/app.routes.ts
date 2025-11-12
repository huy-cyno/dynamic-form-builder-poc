import { Routes } from '@angular/router';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';

export const routes: Routes = [
  { path: '', component: FormListComponent },
  { path: 'form', component: FormRendererComponent },
  { path: '**', redirectTo: '' }
];
