const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

router.post("/", (req, resp) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        resp.redirect("/blogs");
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get("/create", (req, resp) => {
    resp.render("create", {title: "Create a new blog"});
});

router.get("/:id", (req, resp) => {
    const id = req.params.id;

    Blog.findById(id)
    .then(result => {
        resp.render("details", {title: "Blog details", blog: result})
    })
    .catch(err => {
        console.log(err);
    })
});

router.delete("/:id", (req, resp) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        resp.json({ redirect: "/blogs" });
        console.log(result)
    })
    .catch(err => {
        console.log(err);
    })
});

router.get("/", (req, resp) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        resp.render("index", {title: "All blogs", blogs: result });
    })
    .catch((err) => {
        console.log(err)
    })
});

module.exports = router