import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerValue } from './date-picker-value.interface';
import { DEFINED_DATES, DefinedDateTypes } from './defined-dates.type';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatePickerComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {

  public definedDates = [...DEFINED_DATES];

  public selectedFrom: DateTime | null;
  public selectedTo: DateTime | null;

  public period: string = null;

  public opened = false;

  public onChange: (val: DatePickerValue) => void;
  public onTouch: () => void;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.selectedFrom = DateTime.now().startOf('day');
    this.selectedTo = DateTime.now().endOf('day');
  }

  ngOnInit() {}

  public registerOnChange(fn: (val: DatePickerValue) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(value: DatePickerValue): void {
    this.selectedFrom = value?.from || DateTime.now().startOf('day');
    this.selectedTo = value?.to || DateTime.now().endOf('day');
    if (!value) {
      this.reset();
    } else {
      this.updatePeriodView();
    }
    this.cdr.markForCheck();
  }

  public selectDefinedDate(dateType: DefinedDateTypes) {
    const now = DateTime.now();
    switch (dateType) {
      case 'today': {
        this.selectedFrom = now.startOf('day');
        this.selectedTo = now.endOf('day');
        break;
      }
      case 'yesterday': {
        this.selectedFrom = now.minus({ day: 1 }).startOf('day');
        this.selectedTo = now.minus({ day: 1 }).endOf('day');
        break;
      }
      case 'this-week': {
        this.selectedFrom = now.startOf('week');
        this.selectedTo = now.endOf('day');
        break;
      }
      case 'last-week': {
        this.selectedFrom = now.minus({ week: 1 }).startOf('week');
        this.selectedTo = now.minus({ week: 1 }).endOf('week');
        break;
      }
      case 'this-month': {
        this.selectedFrom = now.startOf('month');
        this.selectedTo = now.endOf('day');
        break;
      }
      case 'last-month': {
        this.selectedFrom = now.minus({ month: 1 }).startOf('month');
        this.selectedTo = now.minus({ month: 1 }).endOf('month');
        break;
      }
    }
  }

  reset(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.selectedFrom = DateTime.now().startOf('day');
    this.selectedTo = DateTime.now().endOf('day');
    this.period = null;
    this.opened = false;
    this.onChange({ from: this.selectedFrom, to: this.selectedTo });
  }

  apply() {
    this.updatePeriodView();
    this.opened = false;
    this.onChange({ from: this.selectedFrom, to: this.selectedTo });
  }

  updatePeriodView() {
    const from = this.selectedFrom.toFormat('dd.MM.yy');
    const to = this.selectedTo.toFormat('dd.MM.yy');
    this.period = `${from} – ${to}`;
  }

}
