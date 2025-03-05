import { Routes } from '@angular/router';
import { MainInitiativesInfoComponent } from './components/main-initiatives-info/main-initiatives-info.component';
import { MainInitiativesFormComponent } from './components/main-initiatives-form/main-initiatives-form.component';

export const routes: Routes = [
    {path: 'initiatives-info', component: MainInitiativesInfoComponent},
    {path: 'initiatives-form', component: MainInitiativesFormComponent}
];
