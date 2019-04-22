import request from 'supertest';
import server from './server';
const agent = request.agent(server);

beforeAll(async () => {
  console.log('Jest starting!');
});

afterAll(() => {
  server.close();
  console.log('server closed!');
});

describe('basic test for koa', () => {
  test('Hello world works', async (done) => {
    const response = await agent.get('/');
    expect(response.status).toBe(200);
    // await request(server).post();
    let cookieObj = {};
    let setCookie = response.headers['set-cookie'][0];
    setCookie.split(';').forEach(kv => {
      let cookie = kv.indexOf('=') >= 0 ? kv.split('=') : null;
      if (cookie) {
        cookieObj[cookie[0]] = cookie[1];
      }
    });
    let token = cookieObj['csrf'];
    const postRes = await agent.post('/verify')
    .send({
        'csrf': token,
      })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

    expect(postRes.status).toBe(200);
    if (postRes.text === 'success') {
      done();
    }
  });
});
