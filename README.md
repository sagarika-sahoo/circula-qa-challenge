# Circula test - Sagarika Sahoo

`https://circula-qa-challenge.vercel.app` is defined as `baseUrl` in [playwright.config.js](playwright.config.js). Allowing easy access to site within the tests.

There are [helpers](tests/helpers/sign-up.js) for signup page form elements to allow reusability of functions in different tests.

## Prerequisite

- node v22 

## Install dependencies

- `npm i`
- `npm run install-deps` - installs playwright browsers and dependencies

## Running the tests

- `npm test` - runs playwright test for (chromium, firefox and webkit browsers)
- `npm run show-report` - show the tests report after successful run
