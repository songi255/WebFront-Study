// Flow, Rescript, Kotlin, Typescript 등의 대안이 있다.

// Typescript 외에 다른 건 크게 관심없으니, 관심이 생기면 알아보자. https://ko.reactjs.org/docs/static-type-checking.html

// create react app 에서 바로 설정하기
//  - npx create-react-app my-app --template typescript <- 만들때 부터 적용
//  - npm install --save typescript @types/node @types/react @types/react-dom @types/jest <- 존재하는 create react app 에 적용

// jsx 처럼 tsx 로 사용할 수 있다. 물론 js 도 ts 로 쓴다.


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 쓸 일 있을까 싶지만, 만약 create react app 을 사용하지 않는다면
//  - npm install --save-dev typescript : typescript 설치

//  - "scripts": {
//      "build": "tsc",
//    }, package.json 에 추가.

// npx tsc --init -> tsconfig.json 제작
// 컴파일러에게 무엇을 해야할 지 설정하는 파일인 tsconfig.json 을 만든다.
// https://www.typescriptlang.org/docs/handbook/tsconfig-json.html 다양한 컴파일러 설정

// "compilerOptions": {
//    "rootDir": "src",
//    "outDir": "build"
//  },
// 간단하게 2 옵션 정도만 알아봤다.
// https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json
// 위 링크에 starter 같은 tsconfig.json 을 제공한다.

// 일반적으로 생성된 JavaScript를 소스 관리하지 않는다.
// build 폴더를 .gitignore 에 추가하자.


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 다른 패키지에 사용 시, 선언 파일에 의존한다.
// 라이브러리에 대한 선언파일이 있다면 해당하는 JavaScript 라이브러리를 사용할 수 있다.

// 선언을 가져오는 3가지 방법
// 1. Bundled - 라이브러리가 자신의 선언 파일을 번들. 걍 사용하면 되는 개꿀 상태이다.
//   - 확인법 : 프로젝트 내 index.d.ts 파일이 있거나 / package.json 에 typings / types 필드 아래에 정의
// 2. DefinitelyTyped - 없을 때. Microsoft와 오픈소스 기여자들에 의해 관리되는 크라우드 소스 - (예를 들어 React는 자체 선언 파일을 번들하지 않지만, 여기서 다운받아 사용가능 npm i --save-dev @types/react).
// 3. Local Declarations : 번들도 안되있고 DefinitelyTyped 에도 없을 때.
//   - declarations.d.ts 파일을 sourse 디렉토리의 루트에 생성
//   - declare module 'querystring' {
//        export function stringify(val: object): string;
//        export function parse(val: string): object;
//     } 간단한 선언 예시.