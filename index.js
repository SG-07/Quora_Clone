const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Rahul Kumar",
        content: "I love coding",
    },
    {
        id: uuidv4(),
        username: "Ajay Singh",
        content: "I like mountains",
    },
    {
        id: uuidv4(),
        username: "Ravi Gupta",
        content: "I like to travel",
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/posts/:id/delete", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("delete.ejs", { post });
});


app.post("/posts", (req, res) => {
    let { username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContet = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContet;
    res.redirect("/posts");
})

app.delete("/posts/:id/delete", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id); 
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
})

app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit.ejs", { post });
});

app.get("/", (req, res) => {
    res.send("Server working well!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});