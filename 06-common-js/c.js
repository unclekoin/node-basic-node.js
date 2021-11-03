exports.pow = function (a, n) {
  return a ** n;
}

exports.dev = function (a, b) {
  return a / b;
}

// console.log(module.exports === exports) // true

/*
es6 modules analogue:
export function  pow(a, n) {
  return a ** n;
}

export function dev (a, b) {
  return a / b;
}
*/