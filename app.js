const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs")

const app = express();

// Connect to mongodb
const dbURI = "mongodb+srv://node-ninja:node1234@nodecourse.poszrnv.mongodb.net/node-tutor?retryWrites=true&w=majority"
mongoose.connect(dbURI)
.then((result) => app.listen(4000, 
    console.log("Server started on port 4000")
))
.catch((err) => console.log(err))
app.set("view engine", "ejs")

// Middleware and static files
app.use(express.static("public"))
app.use(morgan("dev"))


app.get("/", (req, resp) => {
    const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur"},
        {title: "How to fight demons", snippet: "Lorem ipsum dolor sit amet consectetur"}
    ];

    resp.render("index", {title: "Home", blogs});
});


app.get("/about", (req, resp) => {
    resp.render("about", {title: "About"});
});

app.get("/blogs/create", (req, resp) => {
    resp.render("create", {title: "Create a new blog"});
});

app.use( (req, resp) => {
    resp.render("404", {title: "404"});
});
