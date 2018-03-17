import assert from 'assert';
import request from 'superagent';

describe('Request', () => {
  describe('at 0.1 sec interval', () => {
    it('all requests should succeedd', (done) => {
      let i = 0;
      const sendRequest = () => {
        request
          .get('127.0.0.1:3000')
          .end((err, res) => {
            // console.log(res.status);
            if (res.status === 429) {
              assert.equal(res.status, 200);
              // done();
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
  });
});
