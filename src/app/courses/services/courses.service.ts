import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, take, tap } from 'rxjs/operators'; // Certifique-se de importar corretamente

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'assets/courses.json'; // Caminho correto

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      // take(1),//assim que o servidor me enviar uma resposta, encerra a conexão
      first(), // interessado apenas a primeira resposta
      delay(5000), // espera 1 segundo
      tap(courses => console.log(courses))
    );
   }
}
