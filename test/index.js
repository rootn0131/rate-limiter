import assert from 'assert';
import request from 'superagent';

describe('Request', () => {
  describe('loading express', () => {
    let server;
    beforeEach(() => {
      delete require.cache[require.resolve('./server/server')];
      server = require('./server/server');
    });
    afterEach((done) => {
      server.close(done);
    });
    it('responds to /', (done) => {
      request
        .get('127.0.0.1:3000')
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
    it('404 everything else', (done) => {
      request
        .get('127.0.0.1:3000/foo')
        .end((err, res) => {
          console.log(res.status);
          assert.equal(res.status, 404);
          done();
        });
    });
    it('all 10 requests should succeed', (done) => {
      let i = 0;
      const sendRequest = () => {
        request
          .get('127.0.0.1:3000')
          .end((err, res) => {
            if (res.status === 429) {
              assert.equal(res.status, 200);
              done();
            } else {
              if (++i >= 10) {
                done();
              } else {
                setTimeout(sendRequest, 100);
              }
            }
          });
      };
      sendRequest();
    });
    it('should fail on 11th attempt', (done) => {
      let i = 0;
      const sendRequest = () => {
        request
          .get('127.0.0.1:3000')
          .end((err, res) => {
            if (res.status === 429) {
              assert.equal(i, 11);
              done();
            } else {
              if (++i > 11) {
                done(new Error('over 11 times already'));
              } else {
                setTimeout(sendRequest, 10);
              }
            }
          });
      };
      sendRequest();
    });
  });
});
