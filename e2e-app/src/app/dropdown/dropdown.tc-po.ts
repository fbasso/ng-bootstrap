import {Selector, t} from 'testcafe';

export class DropdownPage {
  getDropdown(dropDownSelector = '') { return Selector(`${dropDownSelector}[ngbDropdown]`); }

  getDropdownMenu(dropDownMenuSelector = 'div') { return Selector(`${dropDownMenuSelector}[ngbdropdownmenu]`); }

  getDropdownToggle(toggleSelector = 'button') { return Selector(`${toggleSelector}[ngbDropdownToggle]`); }

  getDropdownMenuParent(dropdownMenu) { return dropdownMenu.parent(); }

  getBodyContainers() { return Selector('body > div.dropdown,body > div.dropup'); }

  async open(dropdown) {
    await dropdown.find(`button[ngbDropdownToggle]`).click();
    expect(await this.isOpened(dropdown)).toBeTruthy(`Dropdown should have been opened`);
  }

  async close(dropdown) {
    await dropdown.find(`button[ngbDropdownToggle]`).click();
    expect(await this.isOpened(dropdown)).toBeFalsy(`Dropdown should have been closed`);
  }

  async isOpened(dropdown) {
    const classNames = await dropdown.getAttribute('class');
    return classNames.includes('show');
  }
}
