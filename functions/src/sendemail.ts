import * as functions from 'firebase-functions';
import * as mailgun from 'mailgun-js';

const mg = mailgun({apiKey: functions.config().mailgun.key, domain: 'todo.patou.dev', host: "api.eu.mailgun.net"});

async function onSendEmail(req: functions.Request, res: functions.Response) {
  const data : mailgun.messages.SendData = {
    from: 'Todo Amp <amp@todo.patou.dev>',
    to: req.query.email,
    subject: 'AMP-EMAIL',
    text: 'Testing some Mailgun awesomness!',
    'amp-html': `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <style amp-custom>
              html, body {
                height: 100%;
                min-height: 300px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #005BD1;
              }
              h1 {
                text-align: center;
              }
            </style>
      </head>

      <body>
        <h1>Hello, AMP4EMAIL world.<br/>⚡</h1>
      </body>
    </html>
    `,
  }
  await mg.messages().send(data);
  console.log(`Email sent to ${req.query.email}`);
  res.status(200).send(`Email sent to ${req.query.email}`);
}
export const sendEmail = functions.https.onRequest(onSendEmail);