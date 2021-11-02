const _ = require('lodash');

const user = {
  name: 'John',
  age: 23,
  language: 'english',
};

_.unset(user, 'age');

console.log(user);
