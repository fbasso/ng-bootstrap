import {Selector, t} from 'testcafe';
import {openUrl} from '../../tools.tc-po';

import {DatepickerPage} from "../datepicker.tc-po";

const statusSelector = Selector('#open-status');

export class DatepickerAutoClosePage extends DatepickerPage {
  async loadThePage() {
    await openUrl('datepicker/autoclose');
    await t.expect(Selector('h3').textContent).contains('Datepicker autoclose tests closed');
  }

  getOpenStatus() { return statusSelector; }

  async closeDatepicker() { await t.click('#close'); }

  async clickOutside() { await t.click('#outside-button'); }

  async rightClickOutside() { await t.rightClick('#outside-button'); }

  async selectAutoClose(type: string) {
    await t.click('#autoclose-dropdown');
    await t.click(`#autoclose-${type}`);
  }

  async selectDisplayMonths(displayMonths: number) {
    await t.click('#displayMonths-dropdown');
    await t.click(`#displayMonths-${displayMonths}`);
  }

  async openDatepicker() {
    await t.click('#selectDate');
    await super.openDatepicker();
  }

  async expectDatepickerToBeOpen(message) {
    await t.expect(await this.getDatepicker().exists).ok(message);
    await t.expect(await this.getOpenStatus().textContent).eql('open', message);
  }
}
