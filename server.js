const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

// app.post("/", (req, res) => {
//     const mess = req.body;
//     console.log('Received message', mess);
//     res.json({message: 'Message received successful'})
// });

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})

