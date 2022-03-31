import { Injectable } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';

@Injectable()
export class CustomDateAdapter extends LuxonDateAdapter {

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    return ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  }

  getFirstDayOfWeek(): number {
    return 1;
  }
}
