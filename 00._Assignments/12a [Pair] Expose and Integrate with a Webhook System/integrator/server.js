import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log('Received webhook event:', req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Integrator server running on http://localhost:${PORT}`);
});
