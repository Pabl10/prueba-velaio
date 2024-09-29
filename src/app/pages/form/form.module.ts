import { NgModule } from '@angular/core';

import { FormRoutingModule } from './form-routing.module';

import { FormComponent } from './form.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';



@NgModule({
  imports: [
    FormRoutingModule,
    CommonModule, 
    ReactiveFormsModule, 
    NzFormModule, 
    NzInputModule, 
    NzButtonModule, 
    NzDatePickerModule, 
    HttpClientModule,
    NzAlertModule,
    NzIconModule,
    NzToolTipModule
  ],
  declarations: [FormComponent],
  exports: [FormComponent]
})
export class FormModule { }
