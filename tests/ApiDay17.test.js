const { test, expect } = require('@playwright/test');
const axios = require('axios');
const request = require('supertest');

test('Get method ', async () => {
const response = await request('https://jsonplaceholder.typicode.com') 
.get('/users/1')


expect(response.status).toBe(200);
expect(response.body.id).toBe(1);
expect(response.body.name).toBeDefined();


});

test('post Request',async () => {
    const response = await request('https://jsonplaceholder.typicode.com')  
    .post('/users')
    .send({ name: 'TEST USER2', email: 'user2@gmail.com' })

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBeDefined();

});

test('patch request', async () => {
    const reponse = await request('https://jsonplaceholder.typicode.com')
    .patch('/users/1')
    .send({ name: 'Updated Name' })

    expect(reponse.status).toBe(200);
    expect(reponse.body.name).toBe('Updated Name');
    expect(reponse.body).toBeDefined(); 

});

test('Delete request', async () => {    

    const response = await request('https://jsonplaceholder.typicode.com')
    .delete('/users/1') 

    expect(response.status).toBe(200);


});

test('get request checking user deleted ' , async () => {
    const response = await request('https://jsonplaceholder.typicode.com')
    .get('/users/1')

    expect(response.status).toBe(200);

});

test('error handling',async () => {
    const response = await request('https://jsonplaceholder.typicode.com')
    .get('/users/9999')

    

    expect(response.status).toBe(404);

});



