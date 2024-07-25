import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../../model/courseModel';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss'],
})
export class CoursesFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private service: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const course: Course = this.ActivatedRoute.snapshot.data['course'];

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.obterLessons(course))
    });
  }

  onBack() {
    this.location.back();
  }

  onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', 'close', { duration: 3000 });
    this.onBack();
  }

  onError() {
    this.snackBar.open('Erro', 'close', { duration: 3000 });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `O campo deve ter no mínimo ${requiredLength} caracteres`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `O campo deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  private obterLessons(course: Course): FormGroup[] {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeURL: '' }): FormGroup {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, Validators.required],
      youtubeURL: [lesson.youtubeURL]
    });
  }

  getLessonsFormArray(): FormArray {
    return this.form.get('lessons') as FormArray;
  }

  addLessons() {
    this.getLessonsFormArray().push(this.createLesson());
  }
}
