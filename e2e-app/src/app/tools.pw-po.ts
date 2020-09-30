/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />

export const baseUrl = 'http://localhost:4200/#';

export const joinSelectors =
    (...selectors) => {
      return selectors.join(' >> ');
    }

const getActiveElement =
    () => {
      return page.evaluateHandle(() => document.activeElement);
    }

/**
 * Expects provided element to be focused
 *
 * @param el element to check
 * @param message to display in case of error
 */
export const expectFocused = async(el, message) => {
  const activeElement = await getActiveElement();
  expect(activeElement).toBe(el);
};

/**
 * Reopens internal URL by navigating to home url and then to desired one
 */
let hasBeenLoaded = false;
export const openUrl = async(url: string) => {
  if (hasBeenLoaded) {
    await page.click(`#navigate-home`);
    await page.click(`#navigate-${url.replace('/', '-')}`);
  } else {
    await page.goto(`${baseUrl}/${url}`);
    hasBeenLoaded = true;
  }
};
