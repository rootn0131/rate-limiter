# Rate Limiter

expressjs rate limiting middleware

* limits requests from the same IP within a set time period to a set amount, sends 429 status when exceeded
* sets X-RateLimit-Remaining to the remaining available requests
* sets X-RateLimit-Reset to the time when the rate limit is 0

## installation

`npm install rootn0131/rate-limiter`

## useage

`app.use(rateLimiter({ param, client }));`

## API

`var rateLimiter = require('rate-limiter')`

### rateLimiter({ param, client })

#### param

an object `{ MAXreq, timeRange }`

##### Maxreq

the number of requests you wish to limit to withing the time range

##### timeRange(s)

the time range you wish to count the amount of requests, note that the time is in `seconds`

#### client

the redis database client invoked by `const client = redis.createClient();`

## testing

`npm test`