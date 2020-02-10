/// <reference types="Cypress" />

export class DatepickerPage {
  getDatepicker(selector = 'ngb-datepicker') { return cy.get(selector); }

  getDatepickerInput(selector = 'input[ngbDatepicker]') { return cy.get(selector); }

  getToggle() { return cy.get('#toggle'); }

  getDayElement(date, datepicker = this.getDatepicker()) {
    const ariaLabel = date.toLocaleString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return datepicker.get(`div.ngb-dp-day[aria-label="${ariaLabel}"]`);
  }

  getWeekdayElements() { return this.getDatepicker().get('div.ngb-dp-weekday'); }

  getToday() { return this.getDayElement(new Date()); }

  getPrevMonthArrow() { return this.getDatepicker().get(`button[aria-label="Previous month"]`); }

  getMonthSelect() { return this.getDatepicker().get(`select[aria-label="Select month"]`); }

  getYearSelect() { return this.getDatepicker().get(`select[aria-label="Select year"]`); }

  getNextMonthArrow() { return this.getDatepicker().get(`button[aria-label="Next month"]`); }

  openDatepicker() {
    this.getToggle().click();
    this.getDatepicker(); // Check existance
  }
}
