import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponetsComponent } from './componets/componets.component';
import { ComponentsComponent } from './components/components.component';



@NgModule({
  declarations: [
    ComponetsComponent,
    ComponentsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
