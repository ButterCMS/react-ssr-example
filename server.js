import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Hello from './hello.js';
import Transmit from 'react-transmit';

function handleRender(req, res) {
  Transmit.renderToString(Hello).then(({reactString, reactData}) => {
    fs.readFile('./index.html', 'utf8', function (err, data) {
      if (err) throw err;

      const document = data.replace(/<div id="app"><\/div>/, `<div id="app"><section role="main" class="react-container"><div>${reactString}</div></section></div>`);
      const output = Transmit.injectIntoMarkup(document, reactData, ['/build/client.js']);

      res.send(document);
    });
  });
}

const app = express();

// Serve built files with static files middleware
app.use('/build', express.static(path.join(__dirname, 'build')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3000);
