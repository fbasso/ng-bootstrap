import {Selector, t} from 'testcafe';
import {openUrl} from '../../tools.tc-po';
import {expectFocused} from '../../tools.tc-po';

import {DropdownPage} from "../dropdown.tc-po";

export class DropdownFocusPage extends DropdownPage {
  async focusToggle() {
    await t.click(Selector('#before'));
    await t.pressKey('tab');
    await expectFocused(t, await this.getDropdownToggle(), `dropdown should be focused`);
  }

  getDropdownItem(item: number) { return Selector(`#item-${item}`); }

  async selectContainer(container: string) { await t.click(Selector(`#container-${container}`)); }

  async selectWithItems(withItems: boolean) { await t.click(Selector(`#items-${withItems}`)); }
}
