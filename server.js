const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//setting up view template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname));

// Middleware to serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.render("index");
})


// app.set("views",path.join(__dirname, "/pages"));

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})

