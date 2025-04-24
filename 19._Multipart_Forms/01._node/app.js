import express from 'express';
const app = express();

app.post("/form", (req, req) => {
    console.log(req.body);
    res.send(req.body);
})



const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));