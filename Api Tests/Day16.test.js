const {test, expect} = require('@playwright/test');

test ('Api get method' , async ({request}) => {
    const response = await request.get(' https://jsonplaceholder.typicode.com/users/1');

    expect(response.status()).toBe(200);

    response.json();



});
