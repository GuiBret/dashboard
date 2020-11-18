import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
