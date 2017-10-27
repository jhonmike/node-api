import fs from 'fs';
import parser from 'url';
import * as handlerFactory from './handler';

let handlers = {};

export const register = (url, method) => {
  handlers[url] = handlerFactory.createHandler(method);
};

export const route = (req) => {
  const url = parser.parse(req.url, true);
  let handler = handlers[url.pathname];
  if (!handler) handler = missing(req);
  return handler;
};

export const missing = (req) => {
  const url = parser.parse(req.url, true);
  const path = `${__dirname}/public${url.pathname}`;
  try {
    const data = fs.readFileSync(path);
    const mime = req.headers.accepts || 'text/html';
    return handlerFactory.createHandler((req, res) => {
      res.writeHead(200, {'Content-Type': mime});
      res.end(data);
    });
  } catch (e) {
    return handlerFactory.createHandler((req, res) => {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end(`No route registered for ${url.pathname}`);
    });
  }
};
