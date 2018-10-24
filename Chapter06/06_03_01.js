const qs = require('qs');

let obj = qs.parse('a=1&b=2');
console.log(JSON.stringify(obj));

let str = qs.stringify(obj);
console.log(str);

str = qs.stringify(JSON.parse('{"a":"1","b":"2"}'));
console.log(str);
