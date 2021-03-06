import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as ampCors from '@ampproject/toolbox-cors';
import { db, getTodos } from './todos'

const app = express();
const main = express();

main.use(ampCors({
    email: true,
  }));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded());
main.use('/api/v1', app);
// webApi is your functions name, and you will pass main as
// a parameter
export const webApi = functions.https.onRequest(main);

//In this file, we also create CRUD route for the API
// Add new todo
app.post('/todos', async (req, res) => {
    if (req.body.title) {
        console.log(`create todo ${req.body.title}`)
        const todo = await db.push({ title: req.body.title });
        res.status(201).send({ id: todo.key });
    }
    else {
        res.status(403).send('bad request');
    }
})
// Update new todo
app.patch('/todos/:todoId', async (req, res) => {
    await db.child(req.params.todoId).set(req.body)
    res.status(204).send({...req.body, id: req.params.todoId});
})
app.post('/todos/update', async (req, res) => {
    console.log(`update todo ${req.body.todoId}: ${req.body.newTitle}`)
    await db.child(req.body.todoId).child("title").set(req.body.newTitle)
    res.status(204).send({id: req.params.todoId, title: req.body.title});
})
app.put('/todos/:todoId/complete', async (req, res) => {
    await db.child(req.params.todoId).child('completed').set(true)
    res.status(204).send(true);
})
app.post('/todos/complete', async (req, res) => {
    console.log(`complete todo ${req.body.todoId}`)
    await db.child(req.body.todoId).child('completed').set(true)
    res.status(200).send({id: req.body.todoId, completed: true});
})
app.put('/todos/:todoId/cancel', async (req, res) => {
    await db.child(req.params.todoId).child('completed').set(false)
    res.status(204).send(true);
})
app.post('/todos/cancel', async (req, res) => {
    console.log(`cancel todo ${req.body.todoId}`)
    await db.child(req.body.todoId).child('completed').set(false)
    res.status(200).send({id: req.body.todoId, completed: false});
})
// View a todo
app.get('/todos/:todoId', async (req, res) => {
    const todo = await db.child(req.params.todoId).once('value')
    res.status(200).send({...todo.val(), id: todo.key})
})
// View all todos
app.get('/todos', async (req, res) => {
    const todos = await getTodos()
    res.status(200).send(todos)
})
// Delete a todo
app.delete('/todos/:todoId', async (req, res) => {
    await db.child(req.params.todoId).remove()
    res.status(204).send();
})
app.post('/todos/delete', async (req, res) => {
    console.log(`delete todo ${req.body.todoId}`)
    await db.child(req.body.todoId).remove()
    res.status(204).send('ok');
})
app.post('/form/vote', async (req, res) => {
    console.log(`vote ${req.body.vote} with comment ${req.body.comment}`);
    res.status(200).send({...req.body})
})