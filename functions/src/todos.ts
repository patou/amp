import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const db = admin.database().ref('todos')

export async function getTodos() {
  const datas = await db.once('value')
  let k;
  const todos = [], obj = datas.val();
  for (k in obj) {
      (obj[k].id=k) && todos.push(obj[k]);
  }
  return datas
}