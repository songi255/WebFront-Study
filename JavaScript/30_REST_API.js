/* REpresentational State Transfer
    HTTP 1.0/1.1의 참여자이자 Apache HTTP 서버 프로젝트 공동 설립자인 RoyFielding의 논문에서 2000년에 처음 소개. -> 2000년에 나왔다는건 매우 중요한 듯 하다.
    당시 웹이 HTTP를 제대로 사용하지 못하고 있기에, 장점을 최대한 활용할 수 있는 Architecture로써 REST를 소개하게 되었다.

    REST의 기본원칙을 성실히 지킨 서비스를 "RESTful" 이라고 표현한다.
        1. URI는 resource를 표현해야 한다. -> 따라서 동사같은거 넣지말고 명사로 표현한다.
        2. 행위는 요청 method로 표현한다.

    REST는 self-descriptiveness (자체표현구조)로 구성되어, rest api 만으로 http 요청내용을 이해할 수 있다.

    구성 3요소
        - resource 자원
            - url(엔드포인트)로 표현
        - verb 행위
            - resource에 대한 행위
            - HTTP 요청메서드로 표현
        - representation 표현
            - verb에 대한 행위
            - 페이로드로 표현

    JSON Server 를 통한 REST API 실습
        1. JSON Server 설치    
            - mkdir json-server-exam && json-server-exam
            - npm init -y
            - npm install json-server --save-dev
        2. db.json 파일 생성. (내용은 자유롭게)
        3. JSON Server 실행
            - json-server --watch db.json
                - 3000번 포트 기본값으로 사용함
                - port 변경 시 --port 5000 같이 옵션주면 됨
            - 위 실행문을 package.json의 scripts에 "start": ~~~~ 로 추가하면 편함.
        4. json-server-exam (root 폴더) 안에 public 폴더를 만들고 그 안에 index.html를 넣으면 브라우저에서 포트번호로 접근할 수 있다!
*/

// REST CRUD 예제
const xhr = new XMLHttpRequest();

// GET : 값 가져오기
xhr.open('GET', '/todos/1');
xhr.send();

// POST : 새로운 todo 생성
xhr.open('POST', '/todos');
xhr.setRequestHeader('content-type', 'application/json'); // 헤더설정
xhr.send(JSON.stringify({id: 4, content: 'Angular', completed: false})); // 페이로드

// PUT : 특정 리소스를 전체단위로 교체
xhr.open('PUT', '/todos/4');
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringify({id: 4, content: 'Angular', completed: false}));

// PATCH : 특정 리소스의 일부만 수정
xhr.open('PATCH', '/todos/4');
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(JSON.stringify({completed: false})); // 변경할 내용만 페이로드에 담았다.

// DELETE
xhr.open('DELETE', '/todos/4');
xhr.send();

