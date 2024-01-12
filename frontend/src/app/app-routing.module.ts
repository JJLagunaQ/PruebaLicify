import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'project',
    component: ProjectListComponent
  },
  {
    path: 'project/create',
    component: ProjectFormComponent
  },
  {
    path: 'project/edit/:id',
    component: ProjectFormComponent
  },
  {
    path: 'project/apply/:id',
    component: ProjectFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
