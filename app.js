const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

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
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))

// Routes
app.get("/", (req, resp) => {
    resp.redirect("/blogs");
});

app.post("/blogs", (req, resp) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        resp.redirect("/blogs");
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get("/about", (req, resp) => {
    resp.render("about", {title: "About"});
});

// Blog routes
app.get("/blogs", (req, resp) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        resp.render("index", {title: "All blogs", blogs: result });
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get("/blogs/create", (req, resp) => {
    resp.render("create", {title: "Create a new blog"});
});

app.use( (req, resp) => {
    resp.render("404", {title: "404"});
});
