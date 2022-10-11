/*
설치
  - node -v
  - npm -v

npm init -y
  - 현재 프로젝트를 약술한다.

비단 Server에만 사용하는 것이 아니고, 모바일앱(react-native), 데스크탑앱(Electron) 에도 사용한다.
  - Electron
    - node.js + chromium
  - react-native

서버 예시
  - 기본적인 test용 server 내장
  - Express.js를 통해 HTTP로 서버JS메서드 호출가능 -> REST API 제작가능
  - Vue.js / React / Angular로 비동기 웹사이트 제작가능

*/

// 모듈
// require 메소드로 지정한 파일의 module.exports객체에 접근할 수 있다.
const { name1, name2 } = require("./module-ex"); // .js 확장자는 생략 가능하다.
console.log(name1, name2);