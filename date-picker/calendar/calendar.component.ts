import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CustomDatePickerHeaderComponent } from './custom-date-picker-header.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from '../custom-date-adapter.class';
import { C2M_DATE_FORMATS } from '../date-formats.const';
import { DateTime } from 'luxon';
import { MatCalendar } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: C2M_DATE_FORMATS }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  public activeDate: DateTime;

  @ViewChild(MatCalendar, { static: false }) calendar: MatCalendar<DateTime>;

  @Input() set selected(date: DateTime){
    this.activeDate = date;
    setTimeout(() => this.calendar._goToDateInView(date, 'month'));
  };
  @Output() dateSelect = new EventEmitter<DateTime>();
  @Input() maxDate: DateTime;
  @Input() minDate: DateTime;
  customHeader = CustomDatePickerHeaderComponent;

  constructor() { }

  ngOnInit() {}

  changeSelectedDate(date: DateTime) {
    this.selected = date;
    this.dateSelect.emit(date);
  }

}
