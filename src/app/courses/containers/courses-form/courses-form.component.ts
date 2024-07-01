import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
    name: [''],
    category: [''],
  });

  ngOnInit(): void {
    const course:Course = this.ActivatedRoute.snapshot.data['course'];
    // console.log(course);
    this.form.setValue({ // seta os valores do form com os valores do objeto course
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }



  onBack() {
    this.location.back();
  }

  onError() {
    this.snackBar.open('Erro', 'close', { duration: 3000 });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => {
        this.onBack();
      },

      (error) => {
        this.onError();
      }
    );
  }

  onSuccess() {
    this.snackBar.open('Curso salvo com sucesso', 'close', { duration: 3000 });
    this.onBack();
  }
}
