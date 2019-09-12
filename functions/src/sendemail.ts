import * as functions from 'firebase-functions';

function onSendEmail(req: functions.Request, res: functions.Response) {
  console.log(`Email sent to ${req.query.email}`);
  res.status = 200
  res.body = `Email sent to ${req.query.email}`
}
export const sendEmail = functions.https.onRequest(onSendEmail);