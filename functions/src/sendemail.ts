import * as functions from 'firebase-functions';
import * as mailgun from 'mailgun-js';
import { ampEmail } from './amp';

const config = functions.config().mailgun;
const mailgunOptions: mailgun.ConstructorParams = config ? {apiKey: functions.config().mailgun.key || 'demo', domain: 'todo.patou.dev', host: "api.eu.mailgun.net"}
: { apiKey: 'demo', testMode: true , domain: 'todo.patou.dev', host: "api.eu.mailgun.net"};
const mg = mailgun(mailgunOptions);
async function getOptions(type: string, email: string): Promise<any> {
  if (type ==='todo') {
      return {
        email,
        todos: [
          {
          "completed": false,
          "title": "Projet firebase 2",
          "id": "-Lo2R30njrYZSVWD6-_W"
          },
          {
          "completed": true,
          "title": "Test AMP Email",
          "id": "-LpTnXHGYoDDU8rZOUKv"
          },
        ]
      }
  }
  return { email }
}

async function onSendEmail(req: functions.Request, res: functions.Response) {
  const type = req.query.type || 'todo'
  const email = req.query.email || 'patoudss.amp@gmail.com'
  const options = await getOptions(type, email);
  const data : mailgun.messages.SendData = {
    from: 'Todo Amp <amp@todo.patou.dev>',
    to: req.query.email,
    subject: `${type} AMP`,
    text: ampEmail(type, 'txt', options),
    'amp-html': ampEmail(type, 'amp', options),
    html: ampEmail(type, 'html', options),
    'o:dkim': true,
  }
  await mg.messages().send(data);
  console.log(`Email sent`);
  res.status(200).send({message: `Email sent to ${email}`, type, email});
}
export const sendEmail = functions.https.onRequest(onSendEmail);