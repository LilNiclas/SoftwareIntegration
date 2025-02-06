import express from 'express';

const app = express();

app.get("/", (req, res) => { 
    res.send({data:"Root route"})
});

app.get("/greetings", (req, res) => { 
    res.send({data:"Minho sucks at Rocket"})
});



const PORT = 8080;
app.listen(PORT, () => console.log('Server is running on port: ', PORT));