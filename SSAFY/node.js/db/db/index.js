/* mysql2
  mysql2 부터 promise 방식 사용 가능 / 개편되었음.
    - 설치 : npm i mysql2
*/

// 이 파일에는 db 접속정보를 저장한다. 다른 모듈에서 해당 정보를 끌어 와 접속하면 된다.

// mysql2의 createPool을 사용한다.
const mysql = require("mysql2/promise");

// db 접속정보인 pool 객체를 작성
const pool = mysql.createPool({
  host: "3.39.193.111", // aws 주소
  user: "user",
  password: "1234",
  database: "jony",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = { pool }; // 접속정보를 pool 객체로 만들고, 그걸 exports에 담았다.