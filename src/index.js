module.exports = (options) => {
  const { param = { MAXreq: 10, timeRange: 10 }, client } = options;
  const { MAXreq, timeRange } = param;
  return (req, res, next) => {
    // console.log(req.ip);
    client.zrange(req.ip, 0, -1, (err, reply) => {
      if (err) throw err;
      const lastRequestTimeDelta = Date.now() - reply[reply.length - 1 - MAXreq];
      const resetTime = new Date(parseInt(reply[reply.length - 1], 10) + timeRange * 1000);
      res.set('X-RateLimit-Reset', resetTime);
      if (reply.length > MAXreq && lastRequestTimeDelta <= timeRange * 1000) {
        res.set('X-RateLimit-Remaining', 0);
        res.sendStatus(429);
      } else {
        const framedRequests = reply.filter(connectionTime => connectionTime > Date.now() - timeRange * 1000);
        res.set('X-RateLimit-Remaining', MAXreq - framedRequests.length);
        client.zadd(req.ip, Date.now(), Date.now());
        next();
      }
    });
  };
};
