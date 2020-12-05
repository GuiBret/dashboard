import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule
  ]
})
export class SharedModule {}
