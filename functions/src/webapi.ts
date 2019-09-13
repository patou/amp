import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as ampCors from '@ampproject/toolbox-cors';
admin.initializeApp(functions.config().firebase);
const app = express();
const main = express();

main.use(ampCors({
    email: true,
  }));
main.use(bodyParser.json());
main.use('/api/v1', app);
// webApi is your functions name, and you will pass main as
// a parameter
export const webApi = functions.https.onRequest(main);

const db = admin.database().ref('todos')

//In this file, we also create CRUD route for the API
// Add new todo
app.post('/todos', async (req, res) => {
    const todo = await db.push(req.body);
    res.status(201).send({...req.body, id: todo.key});
})
// Update new todo
app.patch('/todos/:todoId', async (req, res) => {
    await db.child(req.params.todoId).set(req.body)
    res.status(204).send({...req.body, id: req.params.todoId});
})
app.post('/todos/update', async (req, res) => {
    await db.child(req.body.todoId).child("title").set(req.body.title)
    res.status(204).send({id: req.params.todoId, title: req.body.title});
})
app.put('/todos/:todoId/complete', async (req, res) => {
    await db.child(req.params.todoId).child('completed').set(true)
    res.status(204).send(true);
})
app.post('/todos/complete', async (req, res) => {
    await db.child(req.body.todoId).child('completed').set(true)
    res.status(204).send({ status: true });
})
app.put('/todos/:todoId/cancel', async (req, res) => {
    await db.child(req.params.todoId).child('completed').set(false)
    res.status(204).send(true);
})
app.post('/todos/cancel', async (req, res) => {
    await db.child(req.body.todoId).child('completed').set(false)
    res.status(204).send({ status: true });
})
// View a todo
app.get('/todos/:todoId', async (req, res) => {
    const todo = await db.child(req.params.todoId).once('value')
    res.status(200).send({...todo.val(), id: todo.key})
})
// View all todos
app.get('/todos', async (req, res) => {
    const datas = await db.once('value')
    let k;
    const todos = [], obj = datas.val();
    for (k in obj) {
        (obj[k].id=k) && todos.push(obj[k]);
    }
    res.status(200).send(todos)
})
// Delete a todo
app.delete('/todos/:todoId', async (req, res) => {
    await db.child(req.params.todoId).remove()
    res.status(204).send();
})
app.post('/todos/delete', async (req, res) => {
    await db.child(req.body.todoId).remove()
    res.status(204).send({ status: true });
})
