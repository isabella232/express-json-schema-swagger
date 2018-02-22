'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cuid = require('cuid');
const swaggerUi = require('swagger-ui-express');
const { Validator, ValidationError } = require('express-json-validator-middleware');

const todoSchema = require('./todo-schema.json');
const swaggerDoc = require('../dist/swagger.json');

const validator = new Validator({ allErrors: true });
const app = express();

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500);
  res.json({ error });
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.post('/todos', bodyParser.json(), validator.validate({ body: todoSchema }), (req, res) => {
  const todo = {
    id: cuid(),
    ...req.body
  };

  return res.json(todo);
});

app.use(errorHandler);

app.listen(3000, () => console.log('Listening on port 3000'));
