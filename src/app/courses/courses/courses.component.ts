import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses$:Observable<Course[]>;
  displayedColumns= ['name','category'];//colunas que serão exibidas

  // coursesService: CoursesService;


  constructor(private coursesService: CoursesService ){
    //
    // this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list().pipe(
      catchError( error =>{
        console.log(error);
       return of([]);
      })
    );//chamada do serviço

  }
  ngOnInit(): void {

  }



}
