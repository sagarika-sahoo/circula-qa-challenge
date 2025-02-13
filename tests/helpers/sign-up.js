import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export const denySignUpCookieConsent = async (page) => {
  const cookieDeny = page.getByTestId('uc-deny-all-button');
  await cookieDeny.click();
}

export const acceptSignUpTnC = async (page) => {
  const tos = page.getByRole('checkbox', { name: /I agree to the/ });

  // Click on Label as the checkbox element is hidden and we want to simulate user click
  await page.locator('label').filter({ hasText: /I agree to the Terms/ }).click({ force: true, position: { x: 0, y: 0 } });

  // verify the hidden checkbox is checked
  await expect(tos).toBeChecked();
}

export const fillTextBox = async (page, name, value) => {
  const textbox = page.getByRole('textbox', { name });
  await textbox.fill(value);
  return textbox;
}

export const fillSignUpEmail = async (page, email = `test+${faker.string.alphanumeric(5)}@circula.com`) => {
  await fillTextBox(page, 'Work email', email || defaultEmail);
}

export const fillSignUpPassword = async (page, password = 'test-password1') => {
  await fillTextBox(page, /Password/, password);
}

export const fillSignUpName = async (page, firstName, lastName) => {
  await fillTextBox(page, 'First name', firstName);
  await fillTextBox(page, 'Last name', lastName);
}

export const fillSignUpCompany = async (page, companyName) => {
  await fillTextBox(page, 'Company name', companyName);
}

export const fillSignUpCountry = async (page, country) => {
  const textbox = await page.getByRole('combobox', { name: 'Where’s your company' });

  await textbox.fill(country);
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await expect(textbox).toHaveValue(country);
}

export const chooseHearAboutUsField = async (page, value) => {
  const hdyhau = page.getByRole('button', { name: 'Choose channel' });
  await hdyhau.click();
  await page.getByText(value).click();
}