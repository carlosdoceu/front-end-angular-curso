import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';


import { CoursesService } from '../services/courses.service';
import { Course } from '../model/courseModel';

//explicação: dessa função resolver, quando o usuário acessar a rota /course/:id, ele retorna um objeto do tipo course, ou seja, um objeto do tipo course
export const courseResolver: ResolveFn<Observable<Course>> = (route, state,  service: CoursesService = inject(CoursesService)) => {//service é o serviço de cursos que é injetado pelo angular para resolver as rotas do tipo course (resolve o objeto do tipo course)
  // a linha acima significa que o serviço de cursos é injetado pelo angular para resolver as rotas do tipo course

  if (route.params?.['id']){//se o parâmetro id existir, então ele é uma rota válida
    return service.loadById(route.params['id']);//retorna o objeto do tipo course
  }
  return of({_id: '', name: '', category: '', lessons:[]});//se o parâmetro id não existir, retorna um objeto vazio
};
