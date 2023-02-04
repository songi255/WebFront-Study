/* Component Code 의 load 를 연기할 수 있다.
    매개변수 'load' 는 Promise 나 then() 을 가진 thenable 을 반환하는 함수이다.
        - 'load' 의 return Promise 를 이용해 rendering 을 시도하기 전까지는 'load' 를 호출하지 않는다. (진짜 Promise 그 자체다.)
        - 한번 load 되면 캐싱되어, 2번이상 load 되는 일은 없다.
*/

import { lazy } from "react";

// import MarkdownPreview from './MarkdownPreview.js'; 대신 사용하는 것이다.
const MarkdownPreview = lazy(() => import("./MarkdownPreview.js"));
