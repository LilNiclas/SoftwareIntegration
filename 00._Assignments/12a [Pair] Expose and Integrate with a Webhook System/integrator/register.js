// integrator/register.js
import fetch from 'node-fetch';

const EXPOSEE_URL = 'https://18e2-87-49-45-233.ngrok-free.app/register';

async function registerWebhook() {
    try {
        const response = await fetch(EXPOSEE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: 'http://localhost:4000/webhook',
                event: 'ping'
            })
        });

        const data = await response.json();
        console.log('Registration Response:', data);
    } catch (error) {
        console.error('Error registering webhook:', error);
    }
}

registerWebhook();