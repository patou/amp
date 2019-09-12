import * as functions from 'firebase-functions';

function onSendEmail(req, res) {
  console.log(`Email sent to ${req.query.email}`);
  res.status = 200
  res.body = `Email sent to ${req.query.email}`
}
export const sendEmail = functions.https.onRequest(onSendEmail);