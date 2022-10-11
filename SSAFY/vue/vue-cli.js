/*
  vue-cli
    - Vue.js 개발환경을 설정 도구
    - .vue로 컴포넌트 분리
    - 클라이언트에서 node.js 테스트 서버 사용
  설치
    - npm i @vue/cli -g
    - vetur 확장 프로그램설치! (자동완성, 컬러 하이라이팅) v'E'tur 이다!
    - chrome extension 인 Vue.js devtools 설치
      - vue dom을 볼 수 있음!
  프로젝트 생성
    - vue create .
      - . 입력시 현재 폴더이름 그대로 프로젝트만 설치 
    - vue create main
      - main 폴더를 가진 vue-cli를 설치
      - 요놈으로 진행할듯.
    - Manually Select features 선택
      - spacebar로 선택가능
      - babel, linter, router, vuex 선택
      - 버전은 일단 2로 했음
      - router 히스토리모드 - Y
      - 설정파일 저장위치 -> package.json
      - 현재 설정 저장여부 -> N
    - test server 실행
      - npm run serve
        - 무슨 뜻일까? package.json에 가보면 script에 serve, build, lint, 등등에 매치되는 명령어가 적혀있다.
        - npm run [script] 형태로 작성해서, 미리 정의된 코드를 사용하는 것이다!!
        - 이제 localhost:8080으로 접근할 수 있다. 만약에 이미 사용중이면 8081... 처럼 변경된다.

  프로젝트 구조
    - public에 단 하나의 index.html이 저장되어있다. 이것만 로딩되고 나머지는 js로 실행되는 형식.
    - src가 핵심디렉토리. 전반적인 코드작성을 여기에 한다.
      - assets
        - css, 정적 파일(image)등을 저장
      - components
      - router
      - store
        - Vuex 관련
      - views
        - router 마다 보여질 컴포넌트를 모아둠
      - App.vue
        - 어플리케이션의 최상위 컴포넌트
        - vue-cli 에서는 .vue 파일이 기본 형태로 되어있다.
      - main.js
        - 어플리케이션의 진입점
        - 기본 셋팅 및 라이브러리 셋팅
*/