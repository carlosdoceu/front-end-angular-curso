import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss',
})
export class CoursesFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private service: CoursesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {}

  onBack() {
    this.location.back()

  }

  onError(){
    this.snackBar.open('Erro', 'close', { duration: 3000 });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) =>{
        this.onBack();
      },

      (error) =>{
      this.onError();

      });
  }

  onSuccess(){
    this.snackBar.open('Curso salvo com sucesso', 'close', { duration: 3000 });
    this.onBack();
  }
}
