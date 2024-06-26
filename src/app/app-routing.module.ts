import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { CoursesModule } from './courses/courses.module';

const routes: Routes = [
  /**pathMatch:'full' vai analisar toda a url para fazer o redirecionamento */
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses',
    loadChildren:()=> import('./courses/courses.module').then(m=>CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
