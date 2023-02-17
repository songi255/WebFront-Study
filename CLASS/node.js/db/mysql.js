const express = require("express");
const { pool } = require("./db"); // db 폴더내의 모든 모듈을 검사해서 pool을 가져오는듯 하다... pool에는 아까 mysql 접속정보를 담았었다.

const app = express();
const PORT = 8080;

const cors = require("cors");
app.use(cors());

/* morgan
    - http 로그를 상세히 보여주는 npm 패키지.
    - npm i morgan
*/

const morgan = require("morgan");
app.use(morgan("dev")); // 이렇게 사용한다. get, post 등 요청 들어올 시 Http Response Status Code, 응답시간 으로 콘솔에 로그를 찍는다.
// 이 코드가 listen 아래에 들어가면 작동하지 않네.

/* Http Response Status Code
    1xx(Information) : 요청을 받았으며 프로세스를 진행하는 상태
      - 100(요청 후 대기중)
    2xx(Success) : 요청을 성공적으로 받았으며 인식했고 진행한 상태
      - 200(요청 성공)
      - 201(생성 완료)
    3xx(Redirection) : 클라이언트가 요청을 마치기 위해 추가동작 필요
      - 301(새위치로 영구적으로 이동)
      - 302(임시이동)
    4xx(Client Error) : 클라이언트 에러
      - 400(잘못된 요청)
      - 401(권한 없음)
      - 404(찾을 수 없음)
    5xx(Server Error) : 서버 측에 에러
      - 500(내부 서버 오류)
      - 503(서버를 사용 할 수 없음)
      - 504(시간 초과)
    
    -> 200, 400, 500 번대를 제일 자주보게 된다.  
*/

// db에 쿼리쳐서 json으로 응답하기
app.get("/api/menus", async (req, res) => { 
  try{
    const data = await pool.query("SELECT * FROM menus"); // mysql2는 promise형식으로 리턴한다. pool.query에 쿼리를 입력한다.
    if (data[0]){
      return res.json(data[0]);
    }
  }
  catch{
    return res.json(error);
  }
});

// post로 메뉴 추가해보기
app.use(express.json()); // client에서 json 형식으로 server에 요청을 보낼 수 있도록 해주는 설정. (이거 쓰기 전에는 그냥 axios로 url로 get 했다.)
// post에서 body데이터를 가져오기 위한 코드이다.
app.post("/api/menu", async (req, res) => {
  try{
    const data = await pool.query(`INSERT INTO menus (menu_name, menu_description) VALUES ("${req.body.menu_name}", "${req.body.menu_description}")` // post 형식으로 요청시 body에 data가 담겨오니, 거기서 형식에 맞게 꺼내고 있다.
    );
    // 혹은 아래와 같이 쿼리칠 수도 있다.
    // const data = await pool.query('INSERT INTO menus (menu_name, menu-description, menu_img_link) VALUES (?, ?, ?)', [req.body.menu_name, req.body.menu_description, req.body.menu_img_link]);
    return res.json(data); // 실행결과를 리턴한다. 뭐가 담겨올까?
    // 몬가.. 몬가 담겨왔다. 쿼리 실행결과가 담겨왔다!!
    // affectedRows:1 같은게 담겨왔는데, 영향받은 row가 1개라는 뜻 -> 제대로 잘 실행된것이다.
  }
  catch(error){
    return res.json(error);
  }
});

/* params, query, body
  params
    - http://localhost:8080/api/menus/1 은 menus의 1번째 데이터를 말한다.
    - 이렇게 들어가는 변수를 param이라고 한다.
    - express에서는 req.params로 받아온다. -> 함수가 아님에 유의!!
  query
    - ?키값=value&키값1=value1 -> key=value 형태로 들어온다.
    - express에서 req.query 로 받는다.
    - postman에서는 params에 설정한다.
  body
    - POST, PATCH 요청에 사용
    - express에서 req.body로 가져온다.
    - Postman : body -> raw 클릭 후 JSON 형식으로 바꾼 후 요청
    - POST, PUT, PATCH에 사용한다.
      - GET, DELETE는 일반적으로 body를 가지지 않는다.
*/
app.get("/api/menus/:id", (req, res) => {
  console.log(req.params); // params에는 뭐가 담겨올까? :id 부분에 요청 온 값을 반환한다!
  // 여기서 id는 고정된 형식이 아니고, param변수 이름을 지정하는 것이다.
  console.log(req.query); // 아무 설정 없어도 req에서 ?로 시작하는 query를 parsing 한다!!!
  console.log(req.body);
  return null;
});

// 정적파일 서비스
// image, file 같은 불변파일은 폴더를 지정해서 서비스 할 수 있다. (실습을 위해 public 폴더를 만들었다.)
app.use("/public", express.static("public")); // "/public" 라우터에 접근시 public 폴더를 보여주겠다는 뜻. (/public/pepe.jpg 로 이동 시 사진이 보인다!!)

/* 이미지 업로드
  multer
    - npm i multer
    - 요청을 받아서 정적폴더에 업로드해준다.
    - client는 axios로 파일전송한다.
*/
const multer = require("multer");
const upload = multer({ // multer 정의. 파일저장하는 정보를 정의한 일종의 미들웨어를 만든 것이다.
  storage: multer.diskStorage({ // 저장관련정보
    destination: (req, file, done) => { // 파일 저장 경로지정
      done(null, "public/"); // req객체에서 옵션을 받고, file은 파일 자체를 의미하고, done은 실제 저장을 수행하는 작성된콜백을 넘겨받는구나.
    },
    filename: (req, file, done) => { // 저장될 파일이름 지정
      done(null, file.originalname); // 마찬가지로, 이름지정이 필요하면 req에서 넘겨받겠네.
    }
  }),

  limits: { fileSize: 5 * 1024 * 1024 } // 파일 업로드 사이즈 제한
});

// multer 라우팅
app.post('/api/file', upload.single('inputTagName'), (req, res) => { // 파일 업로드는 반드시 post만 가능하다!!
  // req, res 처리하기 전에 upload 요청을 집어넣었다. 이렇게 하면 해당 부분을 먼저 진행 후 다음으로 넘겨준다.
  // upload.single('inputTagName') -> multer 정의에 따라 업로드한다. inputName은 form의 input태그의 name이 들어간다. -> 즉, 프론트에서 input으로 프로필사진을 받았으면
  // tagName을 profileImg로 설정하면 여기서 single('profileImg')로 받는것이다. input이 여러개일때도 분류할 수 있는것이다!!

  // single은 파일 하나 올린거고, 여러개면 array로 올린다.
  // single은 req.file에, array는 req.files에 담겨온다.
  return res.json(req.file); // file에는 어떤게 담겨있을까? 실제 파일이름, mime타입, 사이즈, 요청받은 form input태그 name.. 등등 다양한 내용이 담겨온다.

  // test -> postman에서 body - form-data에 single에 넣어줬던 키(inputTagName)로 파일을 보내본다. (실제 form에서 전송하면 key에 inputTag의 name이 담긴다.)

  //postman 파일 업로드 이슈
  // setting ->  Allow reading files outside working directory 를 ON 해 주고, user폴더의 Postman Agent 폴더명을 Postman으로 바꿔주면 된다.
});


app.listen(PORT, () => console.log("접속대기 성공"));


/* 최종 api서버 배포
  1. node_modules를 전부 지운다.
  2. ssh접속하여 node.js 설치한다.
    - curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
      - 멀까..
    - sudo apt update
    - sudo apt install -y nodejs
    - 버전체크
      - node -v
      - npm -v
  3. 작성한 서버를 드래그로 옮긴다.
  4. 프로젝트로 이동 후 sudo npm i (종속패키지 설치)
  5. sudo node index.js
    - nodemon을 사용하지 않는 이유? 운영환경은 자동재시작되면 안된다!!!
  6. postman으로 테스트
  7. 서버 상시 유지
    - MobaXterm 접속 종료하거나, Ctrl + C로 서버를 나가면 서버가 멈춘다.
    - 백그라운드에서 실행할 필요가 있다!
      - sudo nohup node index.js &
        - PID가 log로 찍힌다.
      - 터미널이 닫혀도 백그라운드에서 실행된다!
  8. 백그라운드 실행중인 서버 종료
    - PID 확인
      - ps –ef |grep node
        - 알겠지만.. node와 관련된 프로세스들을 보겠다는 것.
    - 프로세스 종료
      - kill -9 PID
        - kill -9 30991 같이 쓴다.
*/