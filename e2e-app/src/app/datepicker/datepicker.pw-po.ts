/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />

import {joinSelectors} from '../tools.pw-po';

const dpSelector = 'ngb-datepicker';
const dpInputSelector = 'input[ngbDatepicker]';
const toggleSelector = '#toggle';


export class DatepickerPage {
  getDatepicker(selector = 'ngb-datepicker') { return dpSelector; }

  getDatepickerInput(selector = 'input[ngbDatepicker]') { return dpInputSelector; }

  getToggle() { return toggleSelector; }

  getDayElement(date: Date, datepicker = this.getDatepicker()) {
    const ariaLabel = date.toLocaleString('en', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    return `div.ngb-dp-day[aria-label="${ariaLabel}"]`;
  }

  async clickOnDay(date: Date, datepicker = this.getDatepicker()) {
    await page.click(this.getDayElement(date, datepicker));
  }

  async rightClickOnDay(date: Date, datepicker = this.getDatepicker()) {
    await page.click(this.getDayElement(date, datepicker), {button: 'right'});
  }

  getWeekdayElements() { return joinSelectors(this.getDatepicker(), 'div.ngb-dp-weekday') }

  getToday() { return this.getDayElement(new Date()); }

  getPrevMonthArrow() { return joinSelectors(this.getDatepicker(), 'button[aria-label="Previous month"]') }

  getMonthSelect() { return joinSelectors(this.getDatepicker(), `select[aria-label="Select month"]`); }

  getYearSelect() { return joinSelectors(this.getDatepicker(), `select[aria-label="Select year"]`); }

  getNextMonthArrow() { return joinSelectors(this.getDatepicker(), `button[aria-label="Next month"]`); }

  async openDatepicker() {
    await page.click(this.getToggle());
    expect(await page.waitForSelector(this.getDatepicker())).not.toBe(null);
  }
}
