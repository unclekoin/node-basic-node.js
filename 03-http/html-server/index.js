const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
  const pathToHtmlFile = path.join(__dirname, 'index.html');

  fs.readFile(pathToHtmlFile, 'utf-8', (err, file) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    response.end(file);
  });
});

server.listen(8080, () => console.log('Listening on 8080...'));
