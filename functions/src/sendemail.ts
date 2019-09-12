import * as functions from 'firebase-functions';
import * as mailgun from 'mailgun-js';

const mg = mailgun({apiKey: functions.config().mailgun.key, domain: 'todo.patou.dev', host: "api.eu.mailgun.net"});

async function onSendEmail(req: functions.Request, res: functions.Response) {
  const data = {
    from: 'Todo Amp <amp@todo.patou.dev>',
    to: req.query.email,
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
  };
  await mg.messages().send(data);
  console.log(`Email sent to ${req.query.email}`);
  res.status(200).send(`Email sent to ${req.query.email}`);
}
export const sendEmail = functions.https.onRequest(onSendEmail);