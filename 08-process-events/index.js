const { EventEmitter } = require('events');

console.log(process instanceof EventEmitter); // true

// process.on('uncaughtException', (err) => {
//   console.log(err);
//   console.log('caught!')
// });

// throw 'ERROR!'

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('Did you forget to attach a catch handler for your promise?');
});

Promise.reject();

// process.on('beforeExit', () => {
//   console.log('Let me exit please');
//   setTimeout(() => {
//     console.log('nope');
//   }, 0);
// });

process.on('exit', () => {
  console.log('Process is about to exit!')
})

const start = Date.now()

while (Date.now() - start < 1000) {
  ;
}
