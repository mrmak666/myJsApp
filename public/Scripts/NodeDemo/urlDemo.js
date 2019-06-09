const url=require('url');

const myURL=new URL('http://mykoko.com:8000/hello.html?id=100&status=active');

console.log(myURL.href);

console.log(myURL.host);
console.log(myURL.hostname);

console.log(myURL.pathname);

console.log(myURL.search);

console.log(myURL.searchParams);

// Add Param
myURL.searchParams.append('abc','123');

// loop in param

myURL.searchParams.forEach((value,name)=> console.log('key: ' + name + ', value:' + value))