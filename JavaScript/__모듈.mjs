/* 원래 모듈은 없었다. 이를위해 CommonJS와 AMD 진영으로 나뉘어서, 모듈로더 라이브러리를 사용해야했다.
    이후 사실상 표준인 CommonJS를 채택하여 진화시킨 것이 현재(ES6)의 모듈(ESM)이다.

    브라우저에서 사용 시, <script type="module", src="~~.mjs"> 로 type을 이용해 사용한다. (모듈이 되는 파일을 쓰는게 아니고, 사용파일을 적어주는 것이다.)
      - 이때, 확장자는 js도 되지만, 모듈을 사용함을 명시하기 위해 mjs로 사용하자.
      - mjs에는 strict mode가 적용된다.
      - module scope를 가진다. var또한 전역변수가 아니게 된다.
    
    브라우저는 import, export를 사용하지만, node.js는 module.exports 와 require를 사용한다. 둘은 동시에 사용할 수 없다.
*/

// 브라우저 환경
// export
// 다른모듈에서 사용이 가능하게 하기 위해, 모든 식별자를 공개할 수 있다.
export const pi = Math.PI; 
export function foo(){};// 식별자 이기 떄문에, 함수, 클래스 같은것도 당연히 공개 된다.

export { pi, foo }; //한번에 객체로 묶어 공개할 수도 있다. 선언문마다 붙이는 것 보다 이게 더 편하다.(가독성도 더 좋은 듯 하니 이걸 쓰자.)

export default x => x * x; // 만약, 딱 하나의 값만 export한다면 default로 사용할 수 있다. var, let, const는 사용할 수 없다. 여기선 arrow function을 할당했다. 근데 굳이..?
import arrowF from "./~~.mjs"; // default로 export된 내용은 이렇게 임의의 이름으로 {}없이 바로 가져올 수 있다. 근데 굳이..?

// import
// 아래는 다른 파일에서 실행하는 코드이다.
import {pi as PI, foo} from "./~~.mjs"; // destructuring 으로 원하는 식별자만 가져올 수 있다. as로 다른이름을 사용할 수도 있다.
// ESM의 경우 확장자를 생략할 수 없다.
import * as lib from "./~~.mjs"; // alias를 붙여 디스트럭처링 없이 한번에 그냥 모든 식별자를 가져올 수도 있다.

// 다만, 브라우저 환경에서는 다음이유들로 ESM 보다는 별도의 모듈러(Webpack 같은)를 사용하는것이 일반적이다. 알아만 두라..
//   1. 구형브라우저는 ESM이 미지원이다.
//   2. ESM을 써도 트랜스파일링, 번들링이 필요한건 변함없다.
//   3. 몇가지 이슈가 있을 뿐더러, 지원하지 않는 기능들도 있다.

// 모듈 사용
// <script type="module", src="app.mjs"> 로, 진입점이 되는 js 하나면 설정하면 된다. 나머지는 자동 로드된다.
// 즉, 사용되는 lib.mjs는 태깅할 필요가 없다.


// node.js 환경
var a = 3;
var b = 4;
module.exports = {a, b}; // module.exports를 사용한다.
const {a, b} = require("~~"); // import 대신 require을 쓴다.

// 이 또한 한개만 가져올때 export 를 사용해서 어쩌구.. 있지만 굳이? 걍 이거하나로 쓰고싶네.




