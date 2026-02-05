const express = require('express');
const path = require('path');
const app = express();

const __path = process.cwd();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0'; // bind to all interfaces so Render (or other cloud) can expose your app

// if ./pair exports an express Router, keep it
const code = require('./pair');

require('events').EventEmitter.defaultMaxListeners = 500;

// Middlewares (put parsers before routes if routes need body parsing)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static assets from /public (optional)
app.use(express.static(path.join(__path, 'public')));

// route mounting
app.use('/code', code);

// use GET handlers (no need for async unless you await inside)
app.get('/pair', (req, res) => {
  res.sendFile(path.join(__path, 'pair.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__path, 'main.html'));
});

app.listen(PORT, HOST, () => {
  // don't print "localhost" — that confuses when running in cloud
  console.log(`මොකක්ද කරන්නෙ පකො වෙන උන්ගෙ base run කරලා පකද බලන්නේ owner of CHAMA OFC Don't Forget To Give Star ‼️\n\nServer running on port ${PORT}`);
});

module.exports = app;
