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
    subject: `${type} AMP`,
    text: 'This is the text content. To see dynamic emails sent from amp@todo.patou.dev in Gmail, whitelist amp@todo.patou.dev in Gmail Settings > General > Dynamic email > Developer settings.',
    'amp-html': ampEmail(type),
    html: 'This is the <b>HTML content</b>. To see dynamic emails sent from amp@todo.patou.dev in Gmail, whitelist amp@todo.patou.dev in Gmail Settings > General > Dynamic email > Developer settings.',
    'o:dkim': true,
  }
  await mg.messages().send(data);
  console.log(`Email sent`);
  res.status(200).send({message: `Email sent to ${email}`, type, email});
}
export const sendEmail = functions.https.onRequest(onSendEmail);