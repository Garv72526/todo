const express = require("express")
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())
//as raw data is sent from front-end and express does not know how to interpret the body of the request
//when we use post we get data from front end which goes to the body of request and we need that data in json format
// express needs a way to parse the json into javascript object (so it can work wiht the data easily)

let todos = []

app.post("/todos/create", function (req, res) {
    const todo = req.body.todo
    const id = parseInt(req.body.id)
    if (!id) {
        return res.send("Id cannot be empty")
    }
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            return res.send("Todo already exits with id " + id)
        }
    }

    if (!todo || todo == "") {
        res.send("Todo cannot be empty")
    }

    const newTodo = { title: todo, id: id }
    todos.push(newTodo)

    res.send("Todo added successfully")
    console.log(req.body)
})

app.get("/todos/read/all", function (req, res) {//The frontend sends a GET request to localhost:3000/todos/read/all.
    if (todos.length == 0) {
        return res.send("No todo found")
    }
    res.send(todos)
})

app.get("/todos/read/:id", function (req, res) {
    const todoId = parseInt(req.params.id)//params-to get id from url(.get-gets data from url )
    let todo = null;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == todoId) {
            todo = todos[i]
            break;
        }
    }
    if (!todo) {
        return res.send("todo not found with id " + todoId)
    }

    res.send(todo)

})

app.put("/todos/update/:id", function (req, res) {//put request to update todo
    const todo = req.body.todo;
    const todoId = parseInt(req.params.id)
    if (!todo || todo == "") {
        res.send("Todo cannot be empty")
    }
    let updated = false;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == todoId) {
            todos[i].title = todo;
            updated = true
        }
    }
    if (!updated) {
        return res.send("Todo not found with id " + todoId)
    }

    res.send("Todo updated successfully " + todoId)
})


app.delete("/todos/delete/:id", function (req, res) {
    const todoId = req.params.id
    let deleted = false;
    const tempTodos = []

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == todoId) {
            deleted = true;

        }
        else {

            tempTodos.push(todos[i]);
        }
    }

    if (!deleted) {
        return res.send("Todo not found with id " + todoId)
    }

    todos = tempTodos;
    res.send("Todo deleted successfully with id " + todoId)
})


app.delete("/todos/deleteAll", function (req, res) {
    todos = []
    res.send("All todos deleted successfully")
})


app.listen(3000);