import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { Month } from './month.interface';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-custom-date-picker-header',
  templateUrl: './custom-date-picker-header.component.html',
  styleUrls: ['./custom-date-picker-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDatePickerHeaderComponent implements OnInit {

  public months: Month[];
  public years: number[];

  constructor(
    public calendar: MatCalendar<any>,
    private dateAdapter: DateAdapter<DateTime>
  ) {
    this.months = dateAdapter.getMonthNames('long')
      .map((name, idx) => ({ id: idx + 1, name }));
    this.years = this.getStandardYears();
  }

  ngOnInit() {}

  previousClick() {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1);
  }

  nextClick() {
    this.calendar.activeDate = this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1);
  }

  getStandardYears() {
    const startTime = DateTime.now().minus({ year: 5 }).year;
    const endTime = DateTime.now().plus({ year: 4 }).year;
    const years: number[] = [];
    for (let i = startTime; i < endTime; ++i) {
      years.push(i);
    }
    return years;
  }

  changeMonth(month) {
    this.calendar.activeDate = this.calendar.activeDate.set({ month });
  }

  changeYear(year) {
    this.calendar.activeDate = this.calendar.activeDate.set({ year });
  }

}
