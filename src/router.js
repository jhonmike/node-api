import fs from 'fs';
import parser from 'url';
import handlerFactory from './handler';

const handlers = {};

export const register = (url, method) => {
  handlers[url] = handlerFactory(method);
};

export const missing = (req) => {
  const url = parser.parse(req.url, true);
  const path = `${__dirname}/public${url.pathname}`;
  try {
    const data = fs.readFileSync(path);
    const mime = req.headers.accepts || 'text/html';
    return handlerFactory((req, res) => {
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  } catch (e) {
    return handlerFactory((req, res) => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`No route registered for ${url.pathname}`);
    });
  }
};

export const route = (req) => {
  const url = parser.parse(req.url, true);
  let handler = handlers[url.pathname];
  if (!handler) handler = missing(req);
  return handler;
};
