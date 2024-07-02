import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Course } from '../../model/courseModel';
import { error } from 'console';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss',
})
export class CoursesFormComponent implements OnInit {
  // form: FormGroup;

  constructor(
    private service: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  form = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    category: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const course: Course = this.ActivatedRoute.snapshot.data['course'];
    // console.log(course);
    this.form.setValue({
      // seta os valores do form com os valores do objeto course
      _id: course._id,
      name: course.name,
      category: course.category,
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
    // significa que o subscribe é uma função que recebe um callback como parametro e não um Observable como parametro como no subscribe(next)
    this.service.save(this.form.value).subscribe({
      next: (result) => {
        this.onSuccess();
      },
      error: (error) => {
        this.onError();
      },
    });

    // this.service.save(this.form.value).subscribe(
    //   (result) => {
    //     this.onBack();
    //   },

    //   (error) => {
    //     this.onError();
    //   }
    // );
  }

  errorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    const fieldCategory = this.form.get('category');

    if(field?.hasError("required")){
      return 'Campo obrigatório';
    }
     if(field?.hasError('minlength')){
      const requiredLength:number = field.errors?field.errors['minlength']['requiredLength'] : 5;
      return `O campo deve ter no mínimo ${requiredLength} caracteres`;
    }
    if(field?.hasError("maxlength")){
      const requiredLength = field.errors? field.errors['maxlength']['requiredLength'] : 5;
      return `O campo deve ter no maximo ${requiredLength} caracteres`;
    }


    return 'Campo inválido';
  }

  updateErrorMessage() {



  }
}
