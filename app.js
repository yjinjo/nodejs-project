// 0. 경로를 생략하면 http라는 글로벌 모듈을 찾는다.
const http = require('http');
const fs = require('fs');

// 1. 서버 생성
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    // '/' 로 redirect
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

// 2. listen은 Node.js가 스크립트를 바로 종료하지 않고 계속 실행되면서 듣도록 한다.
// 매개변수에는 Port Number가 들어간다.
server.listen(3000);
