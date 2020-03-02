import {DropdownFocusPage} from './dropdown-focus.tc-po';
import {expectFocused} from '../../tools.tc-po';
import {baseUrl} from "../../tools.tc-po";

const page = new DropdownFocusPage();

let toggle;
let dropdown;

// const containers = ['inline', 'body'];
const containers = ['inline'];
containers.forEach((container) => {
  fixture `Dropdown focus with container '${container}'`.page `${baseUrl}/dropdown/focus`.beforeEach(async t => {
    dropdown = page.getDropdown();
    toggle = page.getDropdownToggle();
  });

  test.only(`should not close when right clicking`, async t => {
    await page.focusToggle();
    await t.pressKey('down');
    await expectFocused(t, toggle, `Toggling element should be focused`);
    await t.expect(await page.isOpened(dropdown)).ok(`Dropdown should be opened on 'ArrowDown' press`);
  });

});
