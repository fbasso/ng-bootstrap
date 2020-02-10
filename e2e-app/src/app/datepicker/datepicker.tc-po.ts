import {Selector, t} from 'testcafe';

const dpSelector = Selector('ngb-datepicker');
const dpInputSelector = Selector('input[ngbDatepicker]');
const toggleSelector = Selector('#toggle');


export class DatepickerPage {
  getDatepicker(selector = 'ngb-datepicker') { return dpSelector; }

  getDatepickerInput(selector = 'input[ngbDatepicker]') { return dpInputSelector; }

  getToggle() { return toggleSelector; }

  getDayElement(date: Date, datepicker = this.getDatepicker()) {
    const ariaLabel = date.toLocaleString('en', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
    return Selector(`div.ngb-dp-day[aria-label="${ariaLabel}"]`);
  }

  async clickOnDay(date: Date, datepicker = this.getDatepicker()) {
    await t.click(this.getDayElement(date, datepicker));
  }

  async rightClickOnDay(date: Date, datepicker = this.getDatepicker()) {
    await t.rightClick(this.getDayElement(date, datepicker));
  }

  getWeekdayElements() { return this.getDatepicker().find('div.ngb-dp-weekday'); }

  getToday() { return this.getDayElement(new Date()); }

  getPrevMonthArrow() { return this.getDatepicker().find(`button[aria-label="Previous month"]`); }

  getMonthSelect() { return this.getDatepicker().find(`select[aria-label="Select month"]`); }

  getYearSelect() { return this.getDatepicker().find(`select[aria-label="Select year"]`); }

  getNextMonthArrow() { return this.getDatepicker().find(`button[aria-label="Next month"]`); }

  async openDatepicker() {
    await t.click(this.getToggle());
    await t.expect(await this.getDatepicker().exists).ok(`Datepicker should be present on the page`);
  }
}
