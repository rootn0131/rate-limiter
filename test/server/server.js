const redis = require('redis');
const express = require('express');
const rateLimiter = require('rate-limiter');

const app = express();

const client = redis.createClient({ db: 2 });


const param = {
  MAXreq: 10,
  timeRange: 10,
};

app.use(rateLimiter({ param, client }));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});


const server = app.listen(3000, () => {
  // console.log('app listening on port 3000!');
});

server.on('close', () => {
  client.flushdb();
});

module.exports = server;

