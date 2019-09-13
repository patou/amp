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
      <style amp4email-boilerplate>body{visibility:hidden}</style>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
      <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
      <style amp-custom>
        /*
         * todomvc.css
         */
        html,
        body {
          margin: 0;
          padding: 0;
        }
        button {
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          font-size: 100%;
          vertical-align: baseline;
          font-family: inherit;
          font-weight: inherit;
          color: inherit;
          -webkit-appearance: none;
          appearance: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        body {
          font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1.4em;
          background: #f5f5f5;
          color: #4d4d4d;
          /* min-width: 230px; */
          /* max-width: 550px; */
          /* margin: 0 auto; */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-weight: 300;
        }
        :focus {
          outline: 0;
        }
        .hidden {
          display: none;
        }
        .todoapp {
          background: #fff;
          margin: 130px 0 40px 0;
          position: relative;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                      0 25px 50px 0 rgba(0, 0, 0, 0.1);
        }
        .todoapp input::-webkit-input-placeholder {
          font-style: italic;
          font-weight: 300;
          color: #e6e6e6;
        }
        .todoapp input::-moz-placeholder {
          font-style: italic;
          font-weight: 300;
          color: #e6e6e6;
        }
        .todoapp input::input-placeholder {
          font-style: italic;
          font-weight: 300;
          color: #e6e6e6;
        }
        .todoapp h1 {
          position: absolute;
          top: -155px;
          width: 100%;
          font-size: 100px;
          font-weight: 100;
          text-align: center;
          color: rgba(175, 47, 47, 0.15);
          -webkit-text-rendering: optimizeLegibility;
          -moz-text-rendering: optimizeLegibility;
          text-rendering: optimizeLegibility;
        }
        .new-todo,
        .edit {
          position: relative;
          margin: 0;
          width: 100%;
          font-size: 24px;
          font-family: inherit;
          font-weight: inherit;
          line-height: 1.4em;
          border: 0;
          color: inherit;
          padding: 6px;
          border: 1px solid #999;
          box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .new-todo {
          padding: 16px 16px 16px 60px;
          border: none;
          background: rgba(0, 0, 0, 0.003);
          box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
        }
        .main {
          position: relative;
          z-index: 2;
          border-top: 1px solid #e6e6e6;
        }
        label[for='toggle-all'] {
          display: none;
        }
        .toggle-all {
          position: absolute;
          top: -55px;
          left: -12px;
          width: 60px;
          height: 34px;
          text-align: center;
          border: none; /* Mobile Safari */
        }
        .toggle-all:before {
          content: '❯';
          font-size: 22px;
          color: #e6e6e6;
          padding: 10px 27px 10px 27px;
        }
        .toggle-all:checked:before {
          color: #737373;
        }
        .todo-list ul {
          margin: 0;
          padding: 0;
          list-style: none;
          position: relative;
        }
        .todo-list .todo {
          position: relative;
          font-size: 24px;
          border-bottom: 1px solid #ededed;
        }
        .todo-list .todo:last-child {
          border-bottom: none;
        }
        .todo-list .todo.editing {
          border-bottom: none;
          padding: 0;
        }
        .todo-list .todo.editing .edit {
          display: block;
          width: 506px;
          padding: 12px 16px;
          margin: 0 0 0 43px;
        }
        .todo-list .todo.editing .view {
          display: none;
        }
        .todo-list .todo .view {
            display: flex;
            align-items: center;
        }
        .todo-list .todo label {
          word-break: break-all;
          padding: 15px 60px 15px 15px;
          display: block;
          line-height: 1.2;
          transition: color 0.4s;
        }
        .todo-list .todo.completed label {
          color: #d9d9d9;
          text-decoration: line-through;
        }
        .todo-list .todo .destroy {
          display: none;
          position: absolute;
          top: 0;
          right: 10px;
          bottom: 0;
          width: 40px;
          height: 40px;
          margin: auto 0;
          font-size: 30px;
          color: #cc9a9a;
          margin-bottom: 11px;
          transition: color 0.2s ease-out;
        }
        .todo-list li .destroy:hover {
          color: #af5b5e;
        }
        .todo-list li .destroy:after {
          content: '×';
        }
        .todo-list li:hover .destroy {
          display: block;
        }
        .todo-list li .edit {
          display: none;
        }
        .todo-list li.editing:last-child {
          margin-bottom: -1px;
        }
        .footer {
          color: #777;
          padding: 10px 15px;
          height: 20px;
          text-align: center;
          border-top: 1px solid #e6e6e6;
        }
        .footer:before {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 50px;
          overflow: hidden;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                      0 8px 0 -3px #f6f6f6,
                      0 9px 1px -3px rgba(0, 0, 0, 0.2),
                      0 16px 0 -6px #f6f6f6,
                      0 17px 2px -6px rgba(0, 0, 0, 0.2);
        }
        .todo-count {
          float: left;
          text-align: left;
        }
        .todo-count strong {
          font-weight: 300;
        }
        .info {
          margin: 65px auto 0;
          color: #bfbfbf;
          font-size: 10px;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
          text-align: center;
        }
        .info p {
          line-height: 1;
        }
        .info a {
          color: inherit;
          text-decoration: none;
          font-weight: 400;
        }
        .info a:hover {
          text-decoration: underline;
        }
        @media (max-width: 430px) {
          .footer {
            height: 50px;
          }
          .filters {
            bottom: 10px;
          }
        }
        .container {
          /* todomvc.css sets these on body but AMP boilerplate overrides body.margin. */
          min-width: 230px;
          max-width: 550px;
          margin: 0 auto;
        }
      </style>
    </head>
    <body>

      <div class="container">
        <section class="todoapp">
            <div><header class="header"><h1>todos</h1><input class="new-todo" placeholder="What needs to be done?" autofocus="true"></header>
          <section class="main">
              <label for="toggle-all"></label>
              <ul class="todo-list">
                <amp-list
                  width="auto"
                  height="600"
                  layout="fixed-height"
                  items="."
                  src="https://todo.patou.dev/api/v1/todos">
                  <template type="amp-mustache">
                <li
                  class="todo{{#completed}} completed{{/completed}}"
                >
                  <div class="view">
                    {{^completed}}
                    <amp-img src="https://todo.patou.dev/img/check.svg"
                    width="40"
                    height="40"
                    alt="Check"
                    noloading></amp-img>{{/completed}}{{#completed}}
                    <amp-img src="https://todo.patou.dev/img/checked.svg"
                    width="40"
                    height="40"
                    alt="Checked"
                    noloading></amp-img>
                    {{/completed}}
                    <label>{{title}}</label>
                    <button class="destroy"></button>
                  </div>
                  <input
                    class="edit"
                    type="text"
                  >
                </li>
                  </template>
               </amp-list>
              </ul>
            </section>
          </div>

        </section>
      </div>

      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://github.com/choumx/">choumx</a> and <a href="http://github.com/kristoferbaxter">kristoferbaxter</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    </body>
    </html>
    `,
  }
  await mg.messages().send(data);
  console.log(`Email sent to ${req.query.email}`);
  res.status(200).send(`Email sent to ${req.query.email}`);
}
export const sendEmail = functions.https.onRequest(onSendEmail);