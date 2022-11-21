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
    const body = [];
    // on 메서드는 특정 이벤트를 들을 수 있도록 한다.
    // data event는 새 chunk가 읽힐 준비가 될 때 마다 data event가 발생하는 곳에 버퍼가 도움을 준다.
    // 두 번째 인자로는 모든 data event에 실행될 함수를 넣어야한다.
    // 그럼 이제 NodeJS는 요청에 대한 모든 data를 얻을 때까지 아래 arrow function이 실행될 것이다.
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      // 위의 chunk들과 상호 작용하기 위해서는 버퍼를 사용해야 한다.
      // 아래의 코드는 새 버퍼를 생성하고, 본문 안에 있는 모든 chunk가 추가될 것이다.
      // 그리고 요청의 본문이 text이므로 들어오는 data도 text이기 때문에 문자열로 전환할 수 있다.
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });

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
