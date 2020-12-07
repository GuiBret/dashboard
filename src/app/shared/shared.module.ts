import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatCheckboxRequiredValidator } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class SharedModule {}
