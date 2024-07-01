import { Injectable } from '@angular/core';
import { Course } from '../model/courseModel';
import { HttpClient } from '@angular/common/http';
import { delay, first, take, tap } from 'rxjs/operators'; // Certifique-se de importar corretamente

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses'; // Caminho correto

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      // take(1),//assim que o servidor me enviar uma resposta, encerra a conexão
      first(), // interessado apenas a primeira resposta
      delay(1000), // espera 1 segundo
      tap(courses => console.log(courses))
    );
   }


   save(course:Partial<Course>){ // course é um objeto parcial, não é uma instância de Course , ou seja, posso aceitar um objeto parcial desde que ele tenha um dos campos do model
     return this.httpClient.post<Course>(this.API+'/create', course).pipe(
      first() // interessado apenas a primeira resposta
     );
   }

   loadById(id:string){
    return this.httpClient.get<Course>(`${this.API}/buscarcurso/${id}`)
     }
}
