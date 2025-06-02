import express from 'express';
import fs from 'fs';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const WEBHOOK_FILE = './webhooks.json';

app.use(bodyParser.json());

// Utility to read and write webhook storage
const loadWebhooks = () => {
    if (fs.existsSync(WEBHOOK_FILE)) {
        const data = fs.readFileSync(WEBHOOK_FILE);
        return JSON.parse(data);
    }
    return [];
};

const saveWebhooks = (webhooks) => {
    fs.writeFileSync(WEBHOOK_FILE, JSON.stringify(webhooks, null, 2));
};

app.post('/register', (req, res) => {
    const { url, event } = req.body;
    if (!url || !event) {
        return res.status(400).json({ error: 'Both url and event are required.' });
    }
    const webhooks = loadWebhooks();
    webhooks.push({ url, event });
    saveWebhooks(webhooks);
    res.json({ message: 'Webhook registered successfully.' });
});

app.post('/unregister', (req, res) => {
    const { url, event } = req.body;
    if (!url || !event) {
        return res.status(400).json({ error: 'Both url and event are required.' });
    }
    const webhooks = loadWebhooks().filter(hook => hook.url !== url || hook.event !== event);
    saveWebhooks(webhooks);
    res.json({ message: 'Webhook unregistered successfully.' });
});

//Ping all registered webhooks
app.post('/ping', (req, res) => {
    const webhooks = loadWebhooks();
    webhooks.forEach(hook => {
        fetch(hook.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: 'ping', message: 'Webhook test successful' })
        }).catch(console.error);
    });
    res.json({ message: 'Ping sent to all registered webhooks.' });
});

app.listen(PORT, () => {
    console.log(`Exposee server running on http://localhost:${PORT}`);
});
