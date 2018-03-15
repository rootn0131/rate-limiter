import assert from 'assert';
import request from 'superagent';

describe('Request', () => {
  describe('at 0.1 sec interval', () => {
    it('all requests should succeed', () => {
      let i = 0;
      const sendRequest = () => {
        request
          .get('127.0.0.1:3000')
          .end((err, res) => {
            console.log(res.status);
          });
        if (++i < 20) {
          setTimeout(sendRequest, 100);
        } else {
          done();
        }
      };
      sendRequest();
    });
  });
});
