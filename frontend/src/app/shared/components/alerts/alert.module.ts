import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { MatIcon } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MatIcon, MatButtonModule],
  exports: [AlertComponent]
})
export class AlertModule {}
