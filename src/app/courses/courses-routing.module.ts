import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { CoursesFormComponent } from './containers/courses-form/courses-form.component';
import { courseResolver } from './guards/course.resolver';

const routes: Routes = [
  {
    path: '', //path vai ser a raiz da rota
    component: CoursesComponent,
  },
  {
    path: 'new',
    component: CoursesFormComponent,resolve: {course: courseResolver} //siginifica que o objeto do tipo course será injetado pelo angular para resolver as rotas do tipo course
  },
  {
    path: 'edit/:id', //'id' é uma variável que recebe o id do curso
    component: CoursesFormComponent, resolve: {course: courseResolver},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
