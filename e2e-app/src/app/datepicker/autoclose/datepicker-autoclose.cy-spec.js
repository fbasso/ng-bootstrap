/// <reference types="Cypress" />
// import { Key } from 'protractor';
import { DatepickerAutoClosePage } from './datepicker-autoclose.cy-po';
import { openUrl, sendKey } from '../../tools.cy-po';

describe('Datepicker Autoclose', () => {
  let page = new DatepickerAutoClosePage();

  // beforeAll(() => page = new DatepickerAutoClosePage());

  const expectDatepickerToBeOpen = (message) => {
    page.getDatepicker().should('exist');
    page.getOpenStatus().should('have.text', 'open');
  };

  const expectDatepickerToBeClosed = (message) => {
    page.getDatepicker().should('not.exist');
    page.getOpenStatus().should('have.text', 'closed')
  };

  const openDatepicker = (message) => {
    page.openDatepicker();
    expectDatepickerToBeOpen(message);
  };

  const closeDatepicker = (message) => {
    page.closeDatepicker();
    expectDatepickerToBeClosed(message);
  };

  for (let displayMonths of [1, 2]) {
    describe(`displayMonths = ${displayMonths}`, () => {

      const DATE_SELECT = new Date(2018, 7, 1);
      const DATE_OUTSIDE_BEFORE = new Date(2018, 6, 31);
      const DATE_OUTSIDE_AFTER = displayMonths === 1 ? new Date(2018, 6, 31) : new Date(2018, 9, 1);

      beforeEach(() => {
        openUrl('datepicker/autoclose');
        page.selectDisplayMonths(displayMonths);
      });

      it(`should not close when right clicking`, () => {
        page.selectAutoClose('true');

        openDatepicker(`Opening datepicker for right clicks`);

        page.getDayElement(DATE_SELECT).rightclick();
        expectDatepickerToBeOpen(`Datepicker should NOT be closed on right click inside`);

        page.rightClickOutside();
        expectDatepickerToBeOpen(`Datepicker should NOT be closed on right click outside`);
      });

      it(`should work when autoClose === true`, () => {
        page.selectAutoClose('true');

        // escape
        openDatepicker(`Opening datepicker for escape`);
        sendKey('{esc}');
        expectDatepickerToBeClosed(`Datepicker should be closed on ESC`);

        // outside click
        openDatepicker(`Opening datepicker for outside click`);
        page.clickOutside();
        expectDatepickerToBeClosed(`Datepicker should be closed on outside click`);

        // date selection
        openDatepicker(`Opening datepicker for date selection`);
        page.getDayElement(DATE_SELECT).click();
        expectDatepickerToBeClosed(`Datepicker should be closed on date selection`);

        // outside days click -> month before
        openDatepicker(`Opening datepicker for outside days click -> month before`);
        page.getDayElement(DATE_OUTSIDE_BEFORE).click();
        expectDatepickerToBeClosed(`Datepicker should be closed on outside day click`);

        // outside days click -> month after
        openDatepicker(`Opening datepicker for outside days click -> month after`);
        page.getDayElement(DATE_OUTSIDE_AFTER).click();
        expectDatepickerToBeClosed(`Datepicker should be closed on outside day click`);
      });
    });
  }
});
