// 0. 경로를 생략하면 http라는 글로벌 모듈을 찾는다.
const http = require("http");

// 1. 서버 생성
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
});

// 2. listen은 Node.js가 스크립트를 바로 종료하지 않고 계속 실행되면서 듣도록 한다.
// 매개변수에는 Port Number가 들어간다.
server.listen(3000);
