import { CoursesService } from '../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/courseModel';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{


  courses$:Observable<Course[]>;


  // coursesService: CoursesService;


  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,


   ){
    //
    // this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list().pipe(
      catchError( error =>{
        this.onError('Erro ao carregar cursos')
       return of([]) //explicação: se o serviço retornar um erro, retorna um array vazio
      })
    );//chamada do serviço

  }
  ngOnInit(): void {

  }

  onError(errorMsg: string) {
    console.log(errorMsg);
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg

    });
  }

  // Explicação da função OnAdd: quando o usuário clica no botão "Adicionar curso", ele é redirecionado para a página de cadastro de cursos
  // O parâmetro "relativeTo" é usado para que o componente possa acessar o parâmetro da rota anterior
  // assim sendo ele pega a rota atual e redireciona para a nova rota sem ter que por /courses/new
  OnAdd(){
    this.router.navigate(['new'] , {relativeTo: this.route});
  }

  OnEdit(course: Course) {
    this.router.navigate(['edit/' + course._id], {relativeTo: this.route});
    }


}
