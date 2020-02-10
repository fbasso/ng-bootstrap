import {DatepickerAutoClosePage} from './datepicker-autoclose.tc-po';
import {baseUrl} from "../../tools.tc-po";
import {t} from 'testcafe';

const page = new DatepickerAutoClosePage();

const expectDatepickerToBeClosed = async(t, message: string) => {
  await t.expect(page.getDatepicker().exists).notOk();
  await t.expect(page.getOpenStatus().textContent).eql('closed', message);
};

for (let displayMonths of[1, 2]) {
  fixture `Datepicker Autoclose displayMonths = ${displayMonths}`.page `${baseUrl}/datepicker/autoclose`.beforeEach(
      async t => { await page.selectDisplayMonths(displayMonths); });

  const DATE_SELECT = new Date(2018, 7, 1);
  const DATE_OUTSIDE_BEFORE = new Date(2018, 6, 31);
  const DATE_OUTSIDE_AFTER = displayMonths === 1 ? new Date(2018, 6, 31) : new Date(2018, 9, 1);

  test(`should not close when right clicking`, async t => {
    await page.selectAutoClose('true');
    await page.openDatepicker();
    await page.rightClickOnDay(DATE_SELECT);
    await page.expectDatepickerToBeOpen(`Datepicker should NOT be closed on right click inside`);
    await page.rightClickOutside();
    await page.expectDatepickerToBeOpen(`Datepicker should NOT be closed on right click outside`);
  });

  test(`should work when autoClose === true`, async() => {
    await page.selectAutoClose('true');

    // escape
    await page.openDatepicker();
    await t.pressKey('esc');
    await expectDatepickerToBeClosed(t, `Datepicker should be closed on ESC`);

    // outside click
    await page.openDatepicker();
    await page.clickOutside();
    await expectDatepickerToBeClosed(t, `Datepicker should be closed on outside click`);

    // date selection
    await page.openDatepicker();
    await page.clickOnDay(DATE_SELECT);
    await expectDatepickerToBeClosed(t, `Datepicker should be closed on date selection`);

    // outside days click -> month before
    await page.openDatepicker();
    await page.clickOnDay(DATE_OUTSIDE_BEFORE);
    await expectDatepickerToBeClosed(t, `Datepicker should be closed on outside day click`);

    // outside days click -> month after
    await page.openDatepicker();
    await page.clickOnDay(DATE_OUTSIDE_AFTER);
    await expectDatepickerToBeClosed(t, `Datepicker should be closed on outside day click`);
  });
}
