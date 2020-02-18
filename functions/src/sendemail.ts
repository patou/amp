import * as functions from 'firebase-functions';
import * as mailgun from 'mailgun-js';
import { ampEmail } from './amp';
import { getTodos } from './todos';

const config = functions.config().mailgun;
const mailgunOptions: mailgun.ConstructorParams = config ? {apiKey: functions.config().mailgun.key || 'demo', domain: 'todo.patou.dev', host: "api.eu.mailgun.net"}
: { apiKey: 'demo', testMode: true , domain: 'todo.patou.dev', host: "api.eu.mailgun.net"};
const mg = mailgun(mailgunOptions);
async function getOptions(type: string, email: string): Promise<any> {
  if (type === 'todo') {
      const todos = await getTodos()
      return {
        email,
        todos
      }
  }
  return { email }
}

function getSubject(type){
  switch (type) {
    case 'toto': return "My todo list for AMP";
    case 'hello': return "Hello from AMP";
    case 'humeur': return "How have you been at Zenika?";
  }
  return `${type} AMP`
}

async function onSendEmail(req: functions.Request, res: functions.Response) {
  const type = req.query.type || 'todo'
  const email = req.query.email || 'patoudss.amp@gmail.com'
  const options = await getOptions(type, email);
  const data : mailgun.messages.SendData = {
    from: 'Patou Amp <amp@todo.patou.dev>',
    to: req.query.email,
    subject: getSubject(type),
    text: ampEmail(type, 'txt', options),
    'amp-html': ampEmail(type, 'amp', options),
    html: ampEmail(type, 'html', options),
    'o:dkim': true,
  }
  console.log(data)
  await mg.messages().send(data);
  console.log(`Email sent`);
  res.status(200).send({message: `Email sent to ${email}`, type, email});
}
export const sendEmail = functions.https.onRequest(onSendEmail);

async function onTestEmail(req: functions.Request, res: functions.Response) {
  const type = req.query.type || 'todo'
  const format = req.query.format || 'html'
  const email = req.query.email || 'patoudss.amp@gmail.com'
  const options = await getOptions(type, email);
  console.log(options)
  const ret = ampEmail(type, format, options);
  res.status(200).send(ret);
}

export const testEmail = functions.https.onRequest(onTestEmail);