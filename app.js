const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const blogRoutes = require("./routes/blogRoutes")

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

app.get("/about", (req, resp) => {
    resp.render("about", {title: "About"});
});

// Blog routes
app.use("/blogs", blogRoutes);

app.use( (req, resp) => {
    resp.render("404", {title: "404"});
});
