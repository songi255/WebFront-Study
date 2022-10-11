/* 하나하나 알아보자. 여기선 Webpack, Babel, ESLint 를 알아볼 것이다. 이후 Typescript도 추가하려면 추가하자.
    evergreen browser
        - 웹 표준을 준수하기 위해 지속적으로 자동 업데이트를 지원하는 모던 브라우저.
        - 이게 아닌 브라우저를 위해서 Babel 같은 트랜스파일러로 일괄 다운그레이드를 해주지만.. 난 IE는 지원하고싶지 않네.
    ES6+ : ES6 이상버전을 의미
    ES.NEXT : 제안사양을 의미
    그래서 ES6+/ES.NEXT 개발환경을 구축한다고 말한다. 이를 위해 아래 tool 들을 추천한다.

    0. 프로젝트 시작 전, package.json은 꼭 만들고 시작한다. npm init -y
    1. Babel
        - transpiler. 낮은 버전에서도 코드가 돌아가게 바꿔준다.
        - 설치
            - npm install --save-dev @babel/core @babel/cli
        - babel 프리셋 설치
            - babel이 제공하는 플러그인들을 설치하는 것이다.
            - 개발 환경에 따라 작동내용이 다르니..(IE를 쓴다, 파폭 xx버전을 쓴다.. 등등)
            - 우선, .browserslistrc 파일에 Browserslist 형식으로 상세히 설정한다. 생략해도 된다. 기본값으로 설정된다.
                - Browserslist는 뭘까? 직접적으로는 쓰이지 않고 다른 도구들에서 사용되기 위해 존재한다. 브라우저에 따라 옵셔닝하기 위한 것이다.
                - 간단한 쿼리문들로 이루어져있다. 잠시 적어보면..
                - not dead -> 지원끝난 브라우저들은 쓰지 않겠다
                - not ie <= 10 : ie 10버전 이하는 지원하지 않겠다.
                - ie 6-9 : ie 6-9 까지 지원하겠다.
                - last 2 Chrome versions : 크롬 가장 최신 2버전을 지원하겠다.
                - last 2 versions : 모든 브라우저 최신 2번째까지 지원하겠다.
                -  > %2 : 사용율 2%이상 브라우저(통계)만 지원하겠다.
                - > %2 in KR : 한국에서.. 아시아같은 경우 in alt-AS
                - not dead and last 2 versions : 이렇게 and, or 사용가능하다.
                - 각각의 조건은 줄바꿈으로 적으면 된다.
                - 혹은, package.json 안에 적어줘도 된다. 권장하는 방법이라고 하네.
                    - "browserslist": [
                        "> 1%”,
                        "last 2 versions",
                        “not ie <= 10”
                      ] 이렇게 배열로..
                - 이후, npx browserslist 명령어로 이 쿼리에 맞는 브라우저들을 나열하여 검증할 수 있다.
            - 이제 npm install --save-dev @babel/preset-env 로 프리셋을 설치한다.
        - root 폴더에 babel.config.json 을 만들고, {"presets": ["@babel/preset-env"]} 작성한다.
            - preset-env를 사용하겠다는 의미이다.
        - 트랜스파일링
            - 명령어를 사용할 수도 있지만, 매번 그렇게 하는건 번거러우므로 npm scripts에 Babel CLI 명령어를 등록해서 사용한다.
            - package.json에 "scripts": {"build": "babel scr/js -w -d dist/js"} 를 추가한다.
                - src/js 폴더의 모든 js파일을 트랜스파일링해서 dist/js폴더에 저장하겠다는 뜻이다.
                - -w : --watch의 축약형. 타깃폴더의 변경 감지해서 자동 트랜스파일링한다.
                - -d : --out-dir의 축약형. 타깃폴더를 지정하겠다는 뜻. 존재하지 않으면 자동생성한다.
            - 이후 npm run build 하여 트랜스파일링 실행한다.
        - 제안사양의 경우, 별도 플러그인이 필요하다.
            - babel 홈페이지 접속 후, 해당 사양을 검색한다.(예를들어, 클래스필드경우 class field 라고 치면 된다.)
            - 해당 플러그인을 재설치하면 된다. (예시로, npm i --save-dev @babel/plugin-proposal-class-properties)
                - 추가로, babel.config.json에 "plugins": ["@babel/plugin-proposal-class-properties"]를 추가한다.
            - 다시 npm run build 한다.
    2. Webpack
        - module Bundler
        - 의존관계의 Js, CSS, image등 리소스까지! 하나 또는 여러개의 파일로 번들링하는 번들러이다.
        - 하나의 파일로 번들링되므로 별도의 모듈로더가 필요없다. html에서 script를 여러번쓰지도 않아도 된다.
        - babel로 먼저 트랜스파일링 한 후 webpack이 실행되도록 설정하는 구조이다.
        - 설치
            - npm install --save-dev webpack webpack-cli
            - npm install --save-dev babel-loader -> babel과 연동하기 위한 것.
            - 이제 package.json의 scripts-build 를 webpack -w 로 바꿔준다. 바벨로더때문에 webpack만 실행해도 된다.
            - root에 webpack.config.js 생성한다. webpack 실행 시 참조하는 설정파일이다.
                - 내용은 이 파일 아래에 작성해두겠다.
        - 트랜스파일링 + 번들링 : npm run build
    3. babel-polyfill -> 이젠 굳이 필요없을듯하다.
        - Promise, Object.assign, Array.from 등은 ES5로 바꿔도 대체제가 없어 남아있다. 이 나머지를 수정해주는 기능이다.
        - npm install @babel/polyfill
            - @babel-polyfill은 개발환경에서만 사용하는것이 아니라 실제 운영환경에서도 사용해야 한다.
            - 따라서 개발용의존성으로 설치하는 --save-dev를 지정하지 않는 것이다.
                - save dev 옵션을 사용하면, devDependency에 추가된다. 즉, 실제 제품에는 필요하지 않고, 개발과정에서만 필요한 경우 이렇게 설치한다.
                - -d 로 축약할 수 있다.
        - webpack.config.js파일의 entry의 선두에 '@babel/polyfill'을 추가한다.
    4. TypeScript
        - 설치
        - npm install -g typescript
        - tsc -v (버전확인)
        - 타입스크립트는 .ts 파일이다.
    5. ESLint
        - lint 도구로, 문법적으로 수정할 부분을 제안하고 실수에 대해 에러를 띄운다.
        - npm i -d eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-html
            - eslint-config-airbnb-base
                - Airbnb의 style guide를 eslint의 설정 파일인 .eslintrc.json에 확장해 주는 플러그인(React 관련 플러그인 미포함)
            - eslint-plugin-import
                - ES6+ import/export 지원 플러그인
            - eslint-plugin-html
                - HTML 파일에 포함된 인라인 자바스크립트 지원 플러그인
        - VS Code ESLint extension 추가
            - Code - 기본설정 - 설정 - setting.json에 "eslint.validate": ["html", "javascript"] 추가
        - root에 .eslintrc.json 추가
            - 필요에 따라 내용작성.. 아래에 예시
    6. Prettier
        - 코드를 이쁘게 format하는 도구이다. Lint 도구가 아니다!
        - prettier-vscode 익스텐션설치
            - 사실 이것만 써도 되지만 cli 사용할 경우를 대비해 설치하자
        - npm i -d --save-exact prettier
        - root에 .prettierrc.json 작성
            - {
                "singleQuote": true,
                "bracketSpacing": true,
                "bracketSameLine": true,
                "arrowParens": "avoid",
                "printWidth": 120
              }
            - 자세한 내용은 https://prettier.io/docs/en/configuration.html 참고.
        - npm install --save-dev eslint-config-prettier : 충돌방지
        - eslintrc.json 수정 -> "extends": ["airbnb-base", "prettier"]
        - autofix -> 파일 저장과 함께 포멧팅하기
            - code - 기본설정 - 설정 - settings.json에 다음 추가
            -   // ESLint
                "eslint.validate": [
                    "html",
                    "javascript",
                    "javascriptreact",
                    "typescript",
                    "typescriptreact"
                ],
                "eslint.alwaysShowStatus": true,
                /////////////////////////////
                // Prettier
                // 수정 후 저장할 때 prettier로 자동 스타일링
                "editor.formatOnSave": true,
                // 수정 후 저장할 때 eslint로 autofix 실행 (ex. let => const)
                "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
                "editor.defaultFormatter": "esbenp.prettier-vscode",
            
ESLINT 8번부터 추가필요!!

*/

// webpack.config.js 에 들어가는 내용
// https://webpack.js.org/configuration 에서 확인할 수 있다.
const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/js')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        Plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    mode: 'development'
}

// 위 코드는.. 다시 한번 검색해볼 필요가 있을 듯 하다.


// eslintrc.json에 들어갈 내용. 자세한 내용은 https://eslint.org/docs/latest/user-guide/configuring 참고.
/*
{
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es2022": true
  },
  "globals": { "_": true },
  "plugins": ["import", "html"],
  "extends": "airbnb-base",
  "rules": {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    // "no-var": "off",
    "no-console": "warn",
    "no-plusplus": "off",
    "no-shadow": "off",
    "vars-on-top": "off",
    "no-underscore-dangle": "off", // var _foo;
    "comma-dangle": "off",
    "func-names": "off", // setTimeout(function () {}, 0);
    "prefer-template": "off",
    "no-nested-ternary": "off",
    "max-classes-per-file": "off",
    "consistent-return": "off",
    "no-restricted-syntax": ["off", "ForOfStatement"], // disallow specified syntax(ex. WithStatement)
    "prefer-arrow-callback": "error", // Require using arrow functions for callbacks
    "require-await": "error",
    "arrow-parens": ["error", "as-needed"], // a => {}
    "no-param-reassign": ["error", { "props": false }],
    "no-unused-expressions": ["error", {
      "allowTernary": true,      // a || b
      "allowShortCircuit": true, // a ? b : 0
      "allowTaggedTemplates": true
    }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "max-len": ["error", {
      "code": 120,
      "ignoreComments": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }] // prettier의 printWidth 옵션 대신 사용
  }
}
*/







