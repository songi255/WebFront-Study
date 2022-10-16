/* JS는 싱글스레드인데 어떻게 concurrency를 지원할까? -> Event loop가 한다.
    JS 엔진은 call stack과 heap으로 나뉜다. 즉, 엔진은 단순히 코드를 평가/실행 할 뿐, 나머지 모든 동작은 런타임이 담당한다
    즉, 싱글스레드인건 JS 엔진인거고, 브라우저(+ Node.js 같은 런타임)는 따로 event loop를 가진다. 그래서 비동기동작이 가능하다.
        - 참고로 브라우저는 렌더링엔진, WebAPI를 제공한다.
            - WebAPI : DOM API, Timer, Ajax같은 비동기처리를 포함한다. 즉 WebAPI가 비동기동작을 담당한다.

    task queue = event queue = callback queue
        - 비동기함수 콜백을 일시적으로 보관

    Micro Task queue
        - Promise 후속처리메서드 콜백이 일시적으로 보관

    event loop
        - call stack이 비면 task queue에서 FIFO로 하나씩 실행
        -> 무슨말이냐면, 모든 동기코드가 끝나야 비동기코드가 실행된다는 뜻이다.
*/

//JSON 직렬화
const obj = {
    name: 'Lee',
    age: 20,
    alive: true,
    hobby: ['traveling', 'tennis']
};
const json = JSON.stringify(obj); // 공백, 줄바꿈은 모두 제거되어있다.
const prettyJson = JSON.stringify(obj, null, 2); // 줄바꿈, 들여쓰기 적용된 형태로 바꾼다.

// replacer로 직렬화요소 고르기
function filter(key, value) {
    return typeof value === 'number' ? undefined : value; // filter가 undefined를 반환하면 직렬화에서 제외된다.
}
const filteredJson = Json.stringify(obj, filter, 2); // number 타입인 age를 제외하고 모두 직렬화된다.
const arrayJson = Json.stringify([{}, {}, {}]); // 배열도 JSON 직렬화 가능하다. (알고있자나?)

// JSON 역직렬화
const parsed = JSON.parse(json); // 배열이었던 경우 배열로 변환된다.


// Ajax : Asynchronous JS and XML
//  - Web API인 XMLHttpRequest를 기반으로 동작한다.
//  - 이제부터 비동기 통신의 발전과정을 볼 것이다. 참고로 결론은 Axios 써라... vs fetch 써라... 둘중 하나가 될 것이다.

// XMLHttpRequest
// HTTP 요청전송을 위한 객체이다. 브라우저의 WebAPI 이다.

// 생성
let xhr = new XMLHttpRequest();

// 아래로 중요한 것들은 **을 붙이겠음.

// 프로퍼티
xhr.readyState; // ** 요청의 현재 상태
/* 
0 : UNSENT
1 : OPENED
2 : HEADERS_RECEIVED
3 : LOADING
4 : DONE
*/
xhr.status; // ** 응답상태코드 (200 같은)
xhr.statusText; // ** 메시지로 나타냄. (ex: "OK")
xhr.responseType; // ** ex) document, json, text, blob, arraybuffer
xhr.response; // ** response body. Type에 따라 타입이 다르다.
xhr.responseText; // response 의 응답받은 쌩 문자열

// 이벤트 핸들러
xhr.onreadystatechange; // ** readyState 값이 변경된 경우
xhr.onloadstart; // 요청에 대한 응답이 시작
xhr.onprogress; // 요청에 대한 응답을 받는 중에 주기적으로 발생
xhr.onabort; // abort()에 의해 요청중단된 경우
xhr.onerror; // ** 요청에 에러 발생
xhr.onload; // ** 요청 성공적 완료
xhr.ontimeout; // 요청시간 초과
xhr.onloadend; // 요청 완료. 성공 또는 실패시 발생

// 프로토타입 메서드
xhr.open('GET', '/users'); // ** HTTP 요청 초기화. open(method, url, [async여부 : 기본값 true])
xhr.send(); // ** 요청 전송. 데이터를 담을 수 있다.
xhr.abort(); // ** 이미 전송된 요청 중단
xhr.setRequestHeader(); // ** 헤더값 설정
xhr.getResponseHeader(); // 요청헤더값을 문자열로 변환

// 정적 프로퍼티
XMLHttpRequest.UNSENT; // 0. open() 이전
XMLHttpRequest.OPENED; // 1. open() 이후
XMLHttpRequest.HEADERS_RECEIVED; // 2. send() 이후
XMLHttpRequest.LOADING; // 3. 서버 응답 중(응답데이터 미완성)
XMLHttpRequest.DONE; // 4. 서버응답 완료.

// 실제 요청절차
xhr = new XMLHttpRequest(); // 객체 생성
xhr.open('GET', '/users'); // 요청 초기화
xhr.setRequestHeader('content-type', 'application/json'); // 요청헤더 설정. 반드시 open() 이후에 호출해야 한다.
/* 자주 사용되는 헤더
    - MIME타입 : Content-type
        - 내가 요청할 때 줄 Type을 설정하는 것이다.
        - text
            - text/plain
            - text/html
            - text/css
            - text/javascript
        - application
            - application/json
            - application/x-www-form-urlencode
        - multipart
            - multipart/formed-data
    - Accept
        - 서버가 응답할 Type을 설정하는 것
        - setRequestHeader('accept', 'type') 하면 된다.
        - 생략 시 "* / *" 로 설정된다. (주석때메 띄워썻다.)
*/
xhr.send(); // 전송
xhr.send(JSON.stringify(obj)); // 데이터 담아 전송. GET인 경우 무시된다. 즉, 이건 body에 담기는 정보이다.


// 응답처리 -> handler로 한다.
xhr.onreadystatechange = () => {
    if (xhr.readyState != XMLHttpRequest.DONE) return; // 완료되지 않았으면 무시
    
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response)); // 성공 (status 200)
    } else {
        console.error('Error', xhr.status, xhr.statusText); // 오류처리
    }
}

// 아니면 애초에 load를 캐치해도 된다. (예외처리는 안되겠지) 이 경우에는 readyState는 확인할 필요가 없다. (하지만 status는 확인해야 한다.)


// Promise : 비동기처리의 callback hell을 막기위해 탄생(ES6) - ECMA 표준 빌트인객체이다.
//  - callback hell은 가독성도 나쁘지만 에러처리도 곤란하고, 여러개의 비동기처리 한번에 처리하는데도 한계가 있다.
//  - 예시로, get(url, success_callback, fail_callback) 형태의 경우, 성공할 때마다 다음 get을 실행하거나 하면... 중첩에 중첩.. 끔찍하다.
//  - 또한, setTimeOut을 try-catch로 감싼들, 적용될 리 만무하다.
const promise = new Promise((resolve, reject) => {
    if (condition){
        resolve('~~~'); // 성공 시 호출
    } else {
        reject('~~~'); //실패 시 호출
    }
});

// Promise는 비동기처리 진행상태 state를 갖는다.
//  - pending : 아직 수행되지 않은 상태 -> 생성직후 기본상태이다.
//  - fulfilled : 수행성공 -> resolve 호출 시 변경
//  - rejected : 실패() -> reject 호출 시 변경
//  - 성공이든 실패든, 수행 완료시 settled 상태라고 한다.
//  - 일단 settled가 되면, 다른 상태로는 변할 수 없다.
//  - 브라우저에서 출력해보면, [[PromiseStatus]], [[PromiseValue]] 가 존재하는 것을 볼 수 있다.

// Promise 후속 메서드
// 모든 후속 메서드는 Promise를 반환한다.
promise.then(
    result => console.log(result), // 첫번째 callback은 resolve() 되었을 때 실행된다.
    e => console.error(e) // 두번째는 reject() 되었을 때 실행된다.
    ); // 반환역시 promise로 한다. 다만, 위에서 준 callback은 프로미스를 반환하지 않는데, 이런 경우 암묵적으로 그 값을 resolve 또는 reject하여 반환한다.

promise.catch(e => console.log(e)); // catch는 무조건 reject 시에만 호출된다. 역시 Promise를 반환한다.
promise.then(undefined, e => console.log(e)); // then(undefined, ~~)와 동일하게 작동한다.(내부적으로 호출된다.) 굳이 쓸 이유는 없다.
// catch는 앞선 then() 내부에서 발생한 오류마처도 catch할 수도 있다. 그래서 then(und, ~~)과 다르다!

promise.finally(() => console.log('finally')); // resolve reject 상관없이 무조건 호출. 얘도 Promise를 반환한다.

// 위 3메서드로 결국 프로미스 체이닝이 가능한 것이다.
promise // 실제로는 Promise를 return 하는 function에 이어서 호출하는게 일반적
    .then(({userId}) => promiseGet('~~~')) // resolve만 쓰는게 일반적. catch에서 차피 reject를 잡으므로..
    .catch(err => console.error(err));

// ** 사실 promise도 callback을 사용하므로, async/await를 사용하면 좀 더 직관적이다. 얘도 내부적으로는 promise로 동작한다.

// Promise 정적 메서드
const resolvedPromise = Promise.resolve([1, 2, 3]); // reject()도 있고, 이미 존재하는 객체를 Wrapping 해서 Promise를 생성하기 위해 사용한다.
// 전달받은 값을 resolve() 한다.

Promise.all([request1(), 4, request2(), request3()]) // 여러 프로미스를 병렬처리할 때 사용한다.
    //중간에 4 처럼 프로미스가 아닌객체가 들어왔는데, Promise.resolve()로 래핑한다.
    .then(console.log) // resolve 된 모든 결과를 호출순서대로 (처리순서 X) 배열에 담아 프로미스로 반환한다.
    .catch(console.error); // 하나라도 reject 되면 즉시 종료한다.(가장 먼저 reject된 값이 반환된다.)

// 설명을 돕자면, 아래와 같이 순차적 처리할 필요가 없는 Promise들을 동시에 처리가능하다.
request1()
    .then(data => {
        res.push(data);
        return request2();
    })
    .then(data => {
        res.push(data);
        return request3;
    }); // 이런식으로,, Promise를 연속으로 호출하지만, 굳이 순서가 중요하지도 않고.. 머.. 한번에 처리할 수 있다는 뜻이다.


// Promise.race -> all 이랑 같으나, 가장 먼저 처리된 1개를 resolve 한다.
Promise.race([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 1000)),
    new Promise(resolve => setTimeout(() => resolve(3), 2000))
])
    .then(console.log); // 2

// Promise.allSettled(ES11) -> all 이랑 같으나, 성공여부 상관없이 모두 settled가 되기를 기다린다. 예제는 생략한다.
// 결과배열에는 다음 결과가 프로퍼티로 객체에 담겨있다.
//  - fulfilled -> status와 value
//  - rejected -> status와 reason


// Promise의 후속메서드들은 Task Queue가 아닌 Micro Task Queue에 담겨서 처리된다. (Task Queue보다 우선순위가 높다.)
// 즉, 코드 실행순서는 [[ 동기 -> 프로미스 -> 나머지비동기 ]] 순서이다.


// fetch
// XMLHttpRequest처럼 HTTP 요청하는 Web API 이다. 다른점은 훨씬 간단하고 프로미스(Response 래핑)를 지원한다.
const promise_ = fetch(url)
    .then(response => response.json); // Response 객체에 역직렬화 메서드가 있다. 고맙게도..

// 두번째 인자로 다양한 옵션을 사용할 수 있다.
fetch(url, {
    method: 'POST',
    headers: {'content-Type': 'application/json'},
    body: JSON.stringify(payload)
});








