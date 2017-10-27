
import http from 'http';
import config from './config';
import * as router from './router';

router.register('/', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
});

router.register('/page', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello First Page');
});

const server = http.createServer((req, res) => {
  const handler = router.route(req);
  handler.process(req, res);
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running on http://${config.hostname}:${config.port}/`);
});
