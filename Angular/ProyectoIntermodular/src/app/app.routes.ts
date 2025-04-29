import { Routes } from '@angular/router';
import { MainInitiativesInfoComponent } from './components/main-initiatives-info/main-initiatives-info.component';
import { MainInitiativesFormComponent } from './components/main-initiatives-form/main-initiatives-form.component';
import { MainPrincipalComponent } from './components/main-principal/main-principal.component';
import { ProfesorFormComponent } from './components/profesor-form/profesor-form.component';
import { EntidadexteriorFormComponent } from './components/entidadexterior-form/entidadexterior-form.component';
import { AsignaturaFormComponent } from './components/asignatura-form/asignatura-form.component';

export const routes: Routes = [
    {path: 'initiatives-info', component: MainInitiativesInfoComponent},
    {path: 'initiatives-form', component: MainInitiativesFormComponent},
    {path: 'initiatives-form/:id', component: MainInitiativesFormComponent},
    {path: 'profesor-form', component: ProfesorFormComponent},
    {path: 'entidadexterior-form', component: EntidadexteriorFormComponent},
    {path: 'asignatura-form', component: AsignaturaFormComponent},
    {path: 'main', component: MainPrincipalComponent},
];
