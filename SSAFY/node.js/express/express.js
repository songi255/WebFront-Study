/*
  global install
    - package.json 이 위치한 프로젝트 디렉터리 외에도 어떤 경로에서든 패키지 호출 가능
    - 커맨드라인에서 실행하는 프로그램은 전역설치가 기본

  nodemon
    - nodemon 은 코드가 수정되면 자동으로 서버를 재시작 (서버판 live server)
    - npm install --location=global nodemon
      -> 씨벌.. 이거 안되면 npm i -g nodemon 해도 똑같다.
    - npm list --location=global --depth=0
      - 전역 패키지 확인
  실행 : nodemon index.js
  종료 : Ctrl + C

*/

/*
  express
    - node.js의 대표적인 프레임워크
    - http와 Connect 컴포넌트를 기반으로 만들어짐
    - Node.js의 API들을 단순화
    - 쉬운 확장성
  
  express vs nginx
    - nginx는 단순 웹서버이다. front에서 간단하게 사용가능하고, 동적요청의 경우 WAS에 넘긴다.
    - express는 WAS이다. 응답에 로직이 필요한 경우 사용한다.
  
  설치
    - package.json 이 위치한 경로로 이동 후,
    - npm install express -> install의 약어인 i를 써서 npm i express 해도 된다.
    - 설치된 의미
      - node_modules
        - 실제 설치된 패키지
      - package.json
        - 명세서      
        - 프로젝트 정보 및 빌드 방식
        - 필요한 패키지 목록 정리
      - package-lock.json
        - 상세 명세서
        - 각 패키지 별 정확한 버전명이 명시 되어 있음
        - 협업시엔 이 파일까지 공유한다.
    설치 후 package.json에 dependency가 추가될 것이다.
    
  공유할때는 node_modules 지우고 보낸다고 해다. 그러면 받은 입장에서, 어떻게 의존모듈을 만들까?
    -> npm i 하면 자동설치된다. package.json에 모두 적혀있기 때문이다.

  참고 : dependency 확인
    - npm list --depth=0
      -> 현재 프로젝트 내 dependency는 express 하나이다.
    - npm list --depth=1
      -> express의 dependencies들이 출력된다.
*/

// 간단한 샘플코드
const express = require("express");
const app = express();
const PORT = 8080;

const cors = require("cors");
app.use(cors()); // 이렇게만 하면 모든 접속을 허용하는 것이다. 추가 옵션 부여해서 제어하는 것도 가능하다.

app.get("/api/info", (req, res) => { // 사용자가 api/info로 GET http 요청을 보내면 json 형태로 응답. request, resonese객체를 의미한다.(프로미스같은게 아님..)
  return res.json({ // response 객체 안의 json메서드이다.
    name: "jony",
    job: "tutor"
  });
});

app.listen(PORT, () => console.log(`this server listening on ${PORT}`)); // 두번째 파라미터는 listen 성공 시 실행됨.

// express server의 실행 -> nodemon ./express.js
// http://localhost:8080/api/info 접속 시 json으로 응답됨. (chrome extension - json formatter 설치하면 쉽게 확인가능)
// 이렇게 활용되는 서버를 API 서버라고 한다. DB 접속 후 결과를 JSON Format으로 리턴.

/* 이렇게 express 서버가 실행되면 axios를 통해 데이터를 가져올 수 있다. 그런데 live server로 axios 코드를 켜면 CORS 때문에 안될것이다.
   CORS (Cross-Origin Resource Sharing) Policy
    - IP 뿐만 아니라 PORT 까지 일치해야만 리소스 공유 가능하다는 정책
    - live server 는5500 인데 express는 8080이기 때문. (axios에서 8080으로 요청했으나 소용없다!)
    - 북한이나 중국에서 내 웹서버에 요청을 한다면, 신뢰할 수 있는가? 서버 개발자는 통신을 허용할 범위를 정해야 한다!
    - express 에서  CORS 패키지 설치, 특정 IP및 포트를 개방시켜주면 된다.
    - 설치 : npm i cors
*/

// route
// 파일로 응답
app.get("/", (req, res) => {
  // sendFile -> 파일전송시 사용. 절대경로로만 동작한다.
  return res.sendFile(__dirname + "/views/index.html");
  // __dirname : 현재 기기에서 작동중인 서버의 경로를 의미 (.js가 있는 경로겠네)
});

app.get("/login", (req, res) => {
  return res.sendFile(__dirname + "/views/login.html");
});

app.get("/whoami", (req, res) => {
  return res.sendFile(__dirname + "/views/whoami.html");
});

//json 응답
const infos = [
  {
    name: "나나", 
    age: 12
  },
  {
    name: "유진", 
    age: 8
  },
  {
    name: "재범", 
    age: 40
  }
]
app.get("/infos", (req, res) => {
  return res.json(infos);
});

// 도전문제!
app.get("/infos/names", (req, res) => {
  return res.json(infos.map(e => e.name));
});
app.get("/infos/ages", (req, res) => {
  return res.json(infos.map(e => e.age));
});
for(let i = 0; i < 3; i++){
  app.get(`/infos/${i}`, (req, res) => {
    return res.json(infos[i]);
  });
}

