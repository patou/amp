import * as functions from 'firebase-functions';
import * as mailgun from 'mailgun-js';
import { ampEmail } from './amp';

const config = functions.config().mailgun;
const options: mailgun.ConstructorParams = config ? {apiKey: functions.config().mailgun.key || 'demo', domain: 'todo.patou.dev', host: "api.eu.mailgun.net"}
: { apiKey: 'demo', testMode: true , domain: 'todo.patou.dev', host: "api.eu.mailgun.net"};
const mg = mailgun(options);

async function onSendEmail(req: functions.Request, res: functions.Response) {
  const type = req.query.type || 'todo'
  const email = req.query.email || 'patoudss.amp@gmail.com'
  const data : mailgun.messages.SendData = {
    from: 'Todo Amp <amp@todo.patou.dev>',
    to: req.query.email,
    subject: 'Todo AMP',
    text: 'Text version of the AMP-Email TodoMVC',
    'amp-html': ampEmail(type),
    'o:dkim': true,
  }
  await mg.messages().send(data);
  console.log(`Email sent to ${req.query.email}`);
  res.status(200).send({message: `Email sent to ${email}`, type, email});
}
export const sendEmail = functions.https.onRequest(onSendEmail);