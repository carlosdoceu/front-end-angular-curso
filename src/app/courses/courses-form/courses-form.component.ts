import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit(): void {}

  onCancel() {
    this.router.navigate(['/courses']);

  }

  onError(){
    this.snackBar.open('Erro', 'close', { duration: 3000 });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => console.log(result),
      (error) => this.onError());
  }
}
