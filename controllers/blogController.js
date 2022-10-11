const Blog = require("../models/blogs");

const blog_index = (req, resp) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        resp.render("blogs/index", {title: "All blogs", blogs: result });
    })
    .catch((err) => {
        console.log(err)
    })
}

const blog_details = (req, resp) => {
    const id = req.params.id;

    Blog.findById(id)
    .then(result => {
        resp.render("blogs/details", {title: "Blog details", blog: result})
    })
    .catch(err => {
        resp.status(404).render("404", {title: "Blogs not found" });
    })
}

const blog_create_get = (req, resp) => {
    resp.render("blogs/create", {title: "Create a new blog"});
}

const blog_create_post = (req, resp) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        resp.redirect("/blogs");
    })
    .catch((err) => {
        console.log(err);
    })
}

const blog_delete = (req, resp) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        resp.json({ redirect: "/blogs" });
        console.log(result)
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}