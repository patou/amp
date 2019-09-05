import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
admin.initializeApp(functions.config().firebase);
const app = express();
const main = express();
main.use('/api/v1', app);
main.use(bodyParser.json());
// webApi is your functions name, and you will pass main as 
// a parameter
export const webApi = functions.https.onRequest(main);
interface Todo{
    title: string,
    completed: boolean
}

const todos: Todo[] = []
//In this file, we also create CRUD route for the API
// Add new todo
app.post('/todos', async (req, res) => {
    todos.push(req.body);
    res.status(201).send(`Created a new contact: ${req.params.todoId}`);
})
// Update new todo
app.patch('/todos/:todoId', async (req, res) => {
    todos[+req.params.todoId] = req.body
    res.status(204).send(`Update a new todo: ${req.params.todoId}`);
})
// View a todo  
app.get('/todos/:todoId', (req, res) => {
    res.status(200).send(todos[+req.params.todoId])
})
// View all todos
app.get('/todos', (req, res) => {
    res.status(200).send(todos)
})
// Delete a todo 
app.delete('/todos/:todoId', async (req, res) => {
    delete todos[+req.params.todoId]
    res.status(204).send(`todo is deleted: ${req.params.todoId}`);
})