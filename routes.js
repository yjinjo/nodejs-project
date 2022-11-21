const fs = require('fs');

// app.js를 routes.js로 연결할 수 있어야 한다.
const requestHandler = (req, res) => {
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
    return req.on('end', () => {
      // 위의 chunk들과 상호 작용하기 위해서는 버퍼를 사용해야 한다.
      // 아래의 코드는 새 버퍼를 생성하고, 본문 안에 있는 모든 chunk가 추가될 것이다.
      // 그리고 요청의 본문이 text이므로 들어오는 data도 text이기 때문에 문자열로 전환할 수 있다.
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        // '/' 로 redirect
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

// Node.js에 의해 전역으로 노출된 키워드 혹은 객체로 내보내기 속성이 있어서,
// 아래와 같이 작성하면 module.exports에 저장된다. 노출된 전역 객체이기 때문에 Node.js가 처리할 수 있다.
// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text',
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
