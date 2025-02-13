import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

import {
  acceptSignUpTnC,
  chooseHearAboutUsField,
  denySignUpCookieConsent,
  fillSignUpCompany,
  fillSignUpCountry,
  fillSignUpEmail,
  fillSignUpName,
  fillSignUpPassword
} from './helpers/sign-up';

test.describe('when user does not accept terms and conditions', () => {
  test('user is shown the alert to accept TnC', async ({ page }) => {
    await page.goto('/users/sign_up');
    await denySignUpCookieConsent(page);

    await fillSignUpEmail(page);
    await fillSignUpPassword(page);

    await page.getByRole('button', { name: 'Try for free' }).click();

    await expect(page.getByText('Please accept the Terms and Conditions to continue.')).toBeVisible();
  });
});

test.describe('when user inputs are not valid', () => {
  test('user inputs non work email', async ({ page }) => {
    await page.goto('/users/sign_up');
    await denySignUpCookieConsent(page);

    await fillSignUpEmail(page, 'test@gmail.com');
    await page.getByRole('button', { name: 'Try for free' }).click();

    await expect(page.getByText('Please provide your work email.')).toBeVisible();
  });

  test('user inputs invalid email', async ({ page }) => {
    await page.goto('/users/sign_up');
    await denySignUpCookieConsent(page);

    await fillSignUpEmail(page, 'test');
    await page.getByRole('button', { name: 'Try for free' }).click();

    await expect(page.getByText('Please correct the e-mail address.')).toBeVisible();
  });
})

test.describe('when user accepts terms and conditions', () => {
  test('user can register with country as Sweden', async ({ page }) => {
    await page.goto('/users/sign_up');
    await denySignUpCookieConsent(page);

    await fillSignUpEmail(page);
    await fillSignUpPassword(page);
    await acceptSignUpTnC(page);
    await page.getByRole('button', { name: 'Try for free' }).click();

    await expect(page.getByText('Step 2/3')).toBeVisible();

    await fillSignUpName(page, faker.person.firstName(), faker.person.lastName());
    await page.getByRole('button', { name: 'Next step' }).click();

    await expect(page.getByText('Step 3/3')).toBeVisible();

    await fillSignUpCompany(page, faker.company.name());
    await fillSignUpCountry(page, 'Sweden');
    await chooseHearAboutUsField(page, /Search Engine/);

    await page.getByRole('button', { name: 'Create an account' }).click();

    await expect(page.getByText('Great! Now please verify your email')).toBeVisible();
  });
});