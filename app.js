// 0. 경로를 생략하면 http라는 글로벌 모듈을 찾는다.
const http = require("http");

// 1. 서버 생성
const server = http.createServer((req, res) => {
  // 응답에 header를 붙이고, 응답의 일부가 될 컨텐츠 유형은 HTML이라는 일련의 메타 정보를 전달
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

// 2. listen은 Node.js가 스크립트를 바로 종료하지 않고 계속 실행되면서 듣도록 한다.
// 매개변수에는 Port Number가 들어간다.
server.listen(3000);
