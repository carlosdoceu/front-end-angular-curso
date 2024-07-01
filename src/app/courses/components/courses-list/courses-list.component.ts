import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from '@angular/core';
import { Course } from '../../model/courseModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['_id', 'name', 'category', 'acoes']; //colunas que serão exibidas

  constructor() {}

  ngOnInit(): void {}

  // Explicação da função OnAdd: quando o usuário clica no botão "Adicionar curso", ele é redirecionado para a página de cadastro de cursos
  // O parâmetro "relativeTo" é usado para que o componente possa acessar o parâmetro da rota anterior
  // assim sendo ele pega a rota atual e redireciona para a nova rota sem ter que por /courses/new
  OnAdd() {
    this.add.emit(true); //emite um evento para que o componente de lista de cursos possa redirecionar para a página de cadastro de cursos
  }

  OnEdit(course:Course) {
    this.edit.emit(course);
  }

}
