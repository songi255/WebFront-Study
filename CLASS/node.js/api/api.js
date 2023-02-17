/* API
    - Application Programming Interface
    - 인터페이스를 소스코드 형태로 구현한 것

  REST API(Representational State Transfer)
    - 아키텍처
    - 자원을 이름으로 구분 / 자원의 상태를 주고 받는 모든 것
    - 일반적으로 REST라 하면 HTTP를 통해 CRUD를 실행하는 API
    - JSP 같은 환경은 백과 프론트가 혼재되어있고, form을 통한 GET, POST만 사용가능하다.
      - 이럴때는 REST API를 사용하지 않는다.
      - 이럴때는 애매한건 POST로 사용해야 한다.

  HTTP request method
    - GET
      - 데이터 읽거나 검색에 사용
      - 캐싱 가능
    - POST
      - 새로운 리소스 생성
    - PUT
      - 전체 데이터 변경 및 갱신
      - ex) 회원정보 수정, 게시글 수정
    - PATCH
      - 일부 데이터 변경
    - DELETE
      - 리소스 삭제에 사용
    
  RESTful API
  - REST 원리를 따르는 시스템
  예시로 어떻게 설계해야 하는지 볼까??
    - 유저 정보관련 설계
      - 유저 전체 정보 조회
        - GET /users/all-get
        -> GET /users
      - 유저 등록
        - POST /users/adduser
        -> POST /users
      - 특정 유저 조회 
        - GET /users/:id/get-information
        -> GET users/:id
      - 특정 유저 수정
        - PATCH /users/:id/update
        -> PATCH users/:id
      - 특정 유저 삭제
        - DELETE /users/:id/delete
        -> DELETE users/:id
  
  핵심은 뭘까? -> 대상에 대한 행동은 모두 HTTP REQUEST METHOD로 표시한다!
    - 행동과 리소스를 구별해서 설계하는것이 핵심이다.
    - 리소스 : 유저
    - 행동: 조회(GET), 등록(POST), 수정(PATCH), 삭제(DELETE)

  
*/
