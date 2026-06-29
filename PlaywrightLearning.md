
1️⃣ What is Playwright?
Playwright is a browser automation library. It:

Opens real browsers (Chrome, Firefox, Safari)
Clicks buttons, fills forms, navigates pages
Takes screenshots, records videos
Runs tests in parallel across multiple browsers
This is what SDETs use daily.


const {test , expect } = require ('@playwright/test');

test('login Test, async ({pahe})=> { 

// page object = yourinterface to the browser

await page.goto('https://saucedemo.com');
  await page.fill('#username', 'standard_user');
  await page.click('#login-button');
  await expect(page).toHaveURL('/inventory.html');
 
});

2️⃣ Playwright Test File Structure 

// day8.js
const { test, expect } = require('@playwright/test');

// test() = define a test
// async ({ page }) = page object represents the browser
test('My First Test', async ({ page }) => {
  
  // Navigate to URL
  await page.goto('https://saucedemo.com');
  
  // Take screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Assert page title
  await expect(page).toHaveTitle('Swag Labs');
});


3️⃣ Running Playwright Tests

# Run all tests
npx playwright test

# Run specific file
npx playwright test day8.js

# Run in headed mode (see browser)
npx playwright test --headed

# Run with debug
npx playwright test --debug


4️⃣ Locators — How to Find Elements

// Different ways to find elements
await page.getByRole('button', { name: 'Submit' });      // Best - semantic
await page.getByText('Click me');                        // By visible text
await page.getByPlaceholder('Enter email');              // By placeholder
await page.getByLabel('Username');                       // By label
await page.locator('#username');                         // CSS selector
await page.locator('xpath=//button[text()="Login"]');    // XPath

5️⃣ Basic Actions

// Navigate
await page.goto('https://saucedemo.com');

// Fill input
await page.fill('#username', 'standard_user');

// Click button
await page.click('#login-button');

// Type (slower, more human-like)
await page.type('#password', 'secret_sauce');

// Press key
await page.press('#search', 'Enter');

// Hover
await page.hover('.menu');

// Drag and drop
await page.dragAndDrop('#drag-source', '#drop-target');


6️⃣ Assertions — Verify Behavior

// URL assertion
await expect(page).toHaveURL('https://saucedemo.com/inventory.html');

// Text assertion
await expect(page.locator('h1')).toHaveText('Products');

// Visibility assertion
await expect(page.locator('.success-message')).toBeVisible();

// Element count
await expect(page.locator('.product')).toHaveCount(6);

// Attribute assertion
await expect(page.locator('#submit')).toHaveAttribute('disabled', 'true');

7️⃣ Real SDET Example — Login Test

const { test, expect } = require('@playwright/test');

test('Valid Login', async ({ page }) => {
  // Navigate
  await page.goto('https://saucedemo.com');
  
  // Fill form
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  
  // Click login
  await page.click('#login-button');
  
  // Assert success
  await expect(page).toHaveURL('https://saucedemo.com/inventory.html');
  await expect(page.locator('.inventory_list')).toBeVisible();
});


| HTML     | Role     |
| -------- | -------- |
| button   | button   |
| input    | textbox  |
| checkbox | checkbox |
| radio    | radio    |
| link     | link     |
| select   | combobox |
| textarea | textbox  |


css locator 

1. .login-buton
2. #username 
3. [type="submit"]
4. [xpath=//button]


# Day 9

1️⃣ Locator Strategies — Deep Dive

const { test, expect } = require('@playwright/test');

test('Locator strategies', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  // ✅ BEST - Semantic/Accessible locators
  await page.getByRole('button', { name: 'Login' });
  await page.getByRole('textbox', { name: 'Username' });
  await page.getByLabel('Password');
  await page.getByPlaceholder('Enter password');
  await page.getByText('Swag Labs');
  
  // ⚠️ OK - CSS selectors (but fragile)
  await page.locator('#user-name');
  await page.locator('.login-button');
  await page.locator('[data-testid="submit"]');
  
  // ❌ LAST RESORT - XPath (very slow)
  await page.locator('xpath=//button[text()="Login"]');
});

Locator Priority:

getByRole — Best, semantic, accessible
getByLabel, getByText, getByPlaceholder — Good
CSS selectors — OK but breaks if HTML changes
XPath — Avoid, slow and brittle



2️⃣ Waiting & Timeouts


test('Waiting for elements', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  // Playwright waits automatically (up to 30 seconds default)
  // No need for sleep() or manual waits
  
  // Fill waits for element to be ready
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  
  // Click waits for element to be clickable
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Assert waits for condition (30 seconds default)
  await expect(page).toHaveURL('/inventory.html');
  
  // Custom timeout if needed
  await expect(page.locator('.success-message')).toBeVisible({ timeout: 5000 });
});


Never use:

// ❌ BAD - creates flaky tests
await page.waitForTimeout(2000);  // hardcoded wait


3️⃣ Handling Multiple Elements  

test('Working with multiple elements', async ({ page }) => {
  await page.goto('https://saucedemo.com/inventory.html');
  
  // Get all products
  const products = page.locator('.inventory_item');
  
  // Count them
  const count = await products.count();
  console.log(`Found ${count} products`);
  
  // Get first product
  const firstProduct = products.first();
  
  // Get last product
  const lastProduct = products.last();
  
  // Get nth product (index 0-based)
  const secondProduct = products.nth(1);
  
  // Loop through all
  for (let i = 0; i < count; i++) {
    const product = products.nth(i);
    const name = await product.locator('.inventory_item_name').textContent();
    console.log(`Product ${i + 1}: ${name}`);
  }
});


4️⃣ Error Handling & Validation

test('Error handling in tests', async ({ page }) => {
  await page.goto('https://saucedemo.com');
  
  // Fill with wrong credentials
  await page.getByRole('textbox', { name: 'Username' }).fill('invalid_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrong_pass');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Assert error appears
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Epic sadface');
  
  // Try again with correct credentials
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Assert success
  await expect(page).toHaveURL('/inventory.html');
});



5️⃣ Advanced Assertions

test('Assertions - comprehensive', async ({ page }) => {
  await page.goto('https://saucedemo.com/inventory.html');
  
  // Element existence and visibility
  await expect(page.locator('.inventory_list')).toBeVisible();
  await expect(page.locator('.nonexistent')).not.toBeVisible();
  
  // Text assertions
  await expect(page.locator('h2')).toHaveText('Products');
  await expect(page.locator('h2')).toContainText('Product');
  
  // URL assertions
  await expect(page).toHaveURL('https://saucedemo.com/inventory.html');
  await expect(page).toHaveURL(/inventory/);  // regex
  
  // Attribute assertions
  const button = page.getByRole('button', { name: 'Add to cart' }).first();
  await expect(button).toHaveAttribute('id', /btn_add_to_cart_sauce-labs-backpack/);
  
  // Count assertions
  const products = page.locator('.inventory_item');
  await expect(products).toHaveCount(6);
  
  // Class assertions
  await expect(button).toHaveClass(/btn/);
  
  // Disabled/Enabled
  await expect(page.getByRole('button', { name: 'Disabled Button' })).toBeDisabled();
});



  6️⃣ Test Data & Variables

  test('Using test data', async ({ page }) => {
  const testData = {
    username: 'standard_user',
    password: 'secret_sauce',
    invalidUsername: 'invalid_user',
    invalidPassword: 'wrong_pass'
  };
  
  // Login with valid data
  await page.goto('https://saucedemo.com');
  await page.getByRole('textbox', { name: 'Username' }).fill(testData.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(testData.password);
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Verify landing page
  await expect(page).toHaveURL('/inventory.html');
  
  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  
  // Verify back to login
  await expect(page).toHaveURL('https://saucedemo.com/');
});