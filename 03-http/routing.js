const http = require('http');

const server = http.createServer((request, response) => {

  switch (request.url) {
    case '/':
      response.end('Hello');
      break;
    case '/favicon.ico':
      response.end('Favicon not found')
      break;
  }
});

server.listen(8080, () => console.log('Listening on port 8080'));
