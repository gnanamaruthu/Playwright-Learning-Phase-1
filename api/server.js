const express = require('express');
require('dotenv').config();
const orderRoutes = require('./routes/orders');

const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});