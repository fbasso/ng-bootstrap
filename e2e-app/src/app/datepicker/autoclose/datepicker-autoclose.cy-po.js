import { DatepickerPage } from '../datepicker.cy-po';

export class DatepickerAutoClosePage extends DatepickerPage {
  getOpenStatus() { return cy.get('#open-status'); }

  closeDatepicker() { cy.get('#close').click(); }

  clickOutside() { cy.get('#outside-button').click(); }

  rightClickOutside() { cy.get('#outside-button').rightclick(); }

  selectAutoClose(type) {
    cy.get('#autoclose-dropdown').click();
    cy.get(`#autoclose-${type}`).click();
  }

  selectDisplayMonths(displayMonths) {
    cy.get('#displayMonths-dropdown').click();
    cy.get(`#displayMonths-${displayMonths}`).click();
  }

  openDatepicker() {
    cy.get('#selectDate').click();
    super.openDatepicker();
  }
}
