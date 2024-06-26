import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';




@NgModule({
  // declarações dos componentes
  declarations: [
    ErrorDialogComponent,
    CategoryPipe

  ],
  // importações dos módulos
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
   exports: [
    ErrorDialogComponent,
    CategoryPipe

   ]
})
export class SharedModule { }
