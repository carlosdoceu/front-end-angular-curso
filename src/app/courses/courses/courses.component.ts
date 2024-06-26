import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, catchError, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses$:Observable<Course[]>;
  displayedColumns= ['name','category'];//colunas que serão exibidas

  // coursesService: CoursesService;


  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService ){
    //
    // this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list().pipe(
      catchError( error =>{
        this.onError('Erro ao carregar cursos')
       return of([])
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


}
