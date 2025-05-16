const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        username: "Rahul Kumar",
        content: "I love coding",
    },
    {
        username: "Ajay Singh",
        content: "I like mountains",
    },
    {
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

app.post("/posts", (req, res) => {
    let { username, content} = req.body;
    posts.push({username,content});
    res.redirect("/posts");
})

app.get("/", (req, res) => {
    res.send("Server working well!");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});