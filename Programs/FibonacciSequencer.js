const R = require('ramda');

const fibonacci = R.memoizeWith(R.identity, n => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2));

console.log(fibonacci(420)); // 2.662710205480733e+87
