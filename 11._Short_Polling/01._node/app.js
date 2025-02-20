import express from "express";

const app = express();

//Define public mappe
app.use(express.static("public"));

const randomNumbers = [1,21251,356,125125]
app.get("/randomnumbers", (req,res) => {
    res.send({data:randomNumbers});
});

app.get("/simulatenewnumbers", (req,res) => {
    const newNumber = getRandomInt(0,100);
    randomNumbers.push(newNumber);

    res.send({data: newNumber});
});

function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const PORT = 8080;
app.listen(PORT, () => console.log('Server is running port', PORT));
