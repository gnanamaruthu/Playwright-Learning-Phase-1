const { test, expect } = require('@playwright/test');

test('Api get method', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    expect(response.status()).toBe(200);
    const userData = await response.json();
    console.log(userData);
    expect(userData.id).toBe(1);
    expect(userData.name).toBe('Leanne Graham');
});



test('Api post method', async ({ request }) => {

    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
        data: {
            name: 'Test User',
            username: 'testuser',
            email: 'test@example.com'
        }
    });

    expect(response.status()).toBe(201);

    const data = await response.json();

    console.log(data);

    expect(data.id).toBeDefined(); // should have auto generated id 

});


test('Api patch method', async ({ request }) => {  
    
   const response = await request.patch('https://jsonplaceholder.typicode.com/users/1', {
        data: {
            name: 'Updated name'
        }
    });



    expect(response.status()).toBe(200);
   
    const data = await response.json();

    expect(data.name).toBe('Updated name'); 



    });

    test('Api delete method', async ({ request }) => {

        const response = await request.delete('https://jsonplaceholder.typicode.com/users/1');      

        expect(response.status()).toBe(200);

        const data = await response.json(); 

        console.log(data);

        expect(data).toEqual({}); // should return empty object after deletion
    });


test ('Api error handling', async ({ request }) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/users/9999'); // non existing user
    expect(response.status()).toBe(404); // should return 404 for non existing user
});

test('Api error 400 Bad Request - POST invalid data', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
        data: { invalidField: true }
    });
    expect(response.status()).toBe(400);
});



test('Hybrid Test: Create user via API, verify in UI, delete via API', async ({ request, page }) => {
  
  // ===== STEP 1: Create User via API =====
  console.log('Step 1: Creating user via API...');
  
  const createResponse = await request.post(
    'https://jsonplaceholder.typicode.com/users',
    {
      data: {
        name: 'Test User',
        email: 'testuser@example.com',
        username: 'testuser123',
        phone: '555-1234'
      }
    }
  );
  
  // Assert user was created
  expect(createResponse.status()).toBe(201);
  console.log('✓ User created successfully');
  
  // Get the new user data
  const newUser = await createResponse.json();
  const userId = newUser.id;
  console.log(`✓ New user ID: ${userId}`);
  
  
  // ===== STEP 2: Login via UI =====
  console.log('Step 2: Logging in via UI...');
  
  await page.goto('https://example.com/login');
  await page.fill('#email', 'testuser@example.com');
  await page.fill('#password', 'password123');
  await page.click('#login-button');
  
  // Wait for login to complete
  await expect(page).toHaveURL('https://example.com/dashboard');
  console.log('✓ Login successful');
  
  
  // ===== STEP 3: Verify User Data in UI =====
  console.log('Step 3: Verifying user data in UI...');
  
  // Navigate to user profile
  await page.goto(`https://example.com/users/${userId}`);
  
  // Verify all data displays correctly
  await expect(page.locator('h1')).toHaveText('Test User');
  await expect(page.locator('.email')).toHaveText('testuser@example.com');
  await expect(page.locator('.username')).toHaveText('testuser123');
  
  console.log('✓ All user data verified in UI');
  
  
  // ===== STEP 4: Delete User via API =====
  console.log('Step 4: Deleting user via API...');
  
  const deleteResponse = await request.delete(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  
  // Assert deletion was successful
  expect(deleteResponse.status()).toBe(204);
  console.log('✓ User deleted successfully');
  
  // Verify user is gone
  const verifyResponse = await request.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  expect(verifyResponse.status()).toBe(404);
  console.log('✓ Verified user no longer exists');
  
  console.log('\n✅ HYBRID TEST PASSED: API → UI → Cleanup');
});
     

