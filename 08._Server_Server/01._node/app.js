import express from 'express'

const app = express();

app.get("/expressData", (req, res) => { 
    res.send({data:"Express Data Test"})
});
//Use 127.0.0.1 i stedet for localhost. Den virker ikke her.
app.get("/requestFastAPIData", async (req, res) => {
    const response = await fetch("http://127.0.0.1:8000/fastapiData");
    const result = await response.json();
    res.send({data : result.data});
});

app.get("/champ/:name", (req, res) => {
    console.log(req.params.name);
    //res.send({data : `Du er selveste ${req.params.name}`});
    res.send({data : `Niclas er champen`});
});

const PORT = 8080;
app.listen(PORT, () => console.log('Server is running on port: ', PORT)); 