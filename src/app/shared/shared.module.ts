import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';




@NgModule({
  // declarações dos componentes
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent

  ],
  // importações dos módulos
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
   exports: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmationDialogComponent

   ]
})
export class SharedModule { }
