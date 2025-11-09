const express = require('express');
const logger = require('morgan');
const parser = require('body-parser');
const xss = require('xss-clean');
const cors = require('./cors');
const Database = require('./db');
const routes = require('../api/router');

class Server {
  app = null;
  db = null;

  constructor() {
    this.app = express();
    this.db = new Database();
    this.prepareApp();
    this.setupRouter();
  }

  prepareApp() {
    this.app.set('port', process.env.SERVER_PORT || 3000);
    this.app.use(cors);
    this.app.use(xss());
    this.app.use(express.json());
    this.app.use(logger('dev'));
    this.app.use(parser.urlencoded({ extended: false }));
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server listening on port ' + this.app.get('port'));
    });
  }

  setupRouter() {
    this.app.use('/api', routes);
  }
}

module.exports = Server;
