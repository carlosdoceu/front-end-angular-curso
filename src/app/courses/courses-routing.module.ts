import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { CoursesFormComponent } from './containers/courses-form/courses-form.component';

const routes: Routes = [
  {
    path: '', //path vai ser a raiz da rota
    component: CoursesComponent,
  },
  {
    path: 'new',
    component: CoursesFormComponent,
  },
  {
    path: 'edit/:id', //'id' é uma variável que recebe o id do curso
    component: CoursesFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
