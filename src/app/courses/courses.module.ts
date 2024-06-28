import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { CoursesFormComponent } from './courses-form/courses-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoursesComponent, CoursesFormComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class CoursesModule {}
