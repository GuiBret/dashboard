import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [

  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class SharedModule {}
