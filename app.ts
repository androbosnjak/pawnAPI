import express, { Application } from 'express';

const app: Application = express();

app.listen(3000, () => console.log('API is running on port 3000'));
