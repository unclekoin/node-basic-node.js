const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const pathToDir = path.join(__dirname, './content');

class Watcher extends EventEmitter {
  constructor(pathDir) {
    super();
    this._dir = pathDir;
    this._hash = new Map();
  }

  start() {
    this.stop();
    this._intervalId = setInterval(this.checkDirectory.bind(this), 500);
  }

  stop() {
    clearInterval(this._intervalId);
  }

  checkDirectory() {
    fs.readdir(this._dir, (err, dir) => {
      dir.forEach((fileName) => {
        const pathToFile = path.join(this._dir, fileName);
        fs.readFile(pathToFile, 'utf-8', (err, file) => {
          if (err) {
            console.log('ERROR:', err);
            return;
          }

          const prevState = this._hash.get(pathToFile);
          if (prevState !== file) {
            this.emit('CHANGES', pathToFile);
          }

          this._hash.set(pathToFile, file);
        });
      });
    });
  }
}

const watcher = new Watcher(pathToDir);
watcher.start()

watcher.on('CHANGES', (file) => console.log('CHANGES AT:', file))