import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomDatePickerHeaderComponent } from './calendar/custom-date-picker-header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { C2mButtonModule } from 'c2m-ui';

@NgModule({
  declarations: [
    DatePickerComponent,
    CustomDatePickerHeaderComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    C2mButtonModule
  ],
  exports: [
    DatePickerComponent,
    CustomDatePickerHeaderComponent,
    CalendarComponent
  ],
  entryComponents: [
    CustomDatePickerHeaderComponent
  ]
})
export class DatePickerModule { }
