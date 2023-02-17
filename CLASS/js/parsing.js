// 대부분 문자열 파싱은 겹친다.
// indexOf(찾을내용, 시작인덱스), subString(substr은 deprecate되었다.), replace(/regex/g, "to"), split, concat(+와 동일) 등등..
// insert는 없다. substring 이용한 함수로 정의해서 사용하자. erase도 마찬가지.
// * regex : // -> 맨 처음 하나만 찾음 //g -> 모두 찾음. //i -> 대소문자 무시


// 그 외, substring, slice(배열사용도 가능, 인덱스 역전시켰을때의 결과가 다름), splice(배열에만 사용가능. 끝인덱스도 포함. 배열 자체를 변경함)

//화살표함수 특징 : this가 상위객체(외부)를 가리킴. {}로 감싸지 않으면 자동 return 

console.dir({}); // console.log보다 자세한 정보를 표시한다.(크롬)

//prototype : 상속기반. __proto__로 부모에 접근할 수 있다.

//class : 프로토타입으로 구현할 수 있기 때문에, 애매하다. (syntax sugar라는 말도 있고...)
class Human extends Object{
    constructor(){ // 생성자

    }
    
    //콤마가 없다.
    
    Hi(){ // 메서드

    }
}

// 순회
const arr = [1, 2, 3];
//매개변수를 3개까지 받을 수 있다.
arr.forEach((element, index, array)=>{console.log(element, index, array)});
arr.some(v => v % 2 == 1); // 사실 매개변수는 3개 위와 같다. 요소 중 1개라도 만족하면 true이다.
arr.every(v => v < 6); // 먼지 알겠제??
arr.find(v => v < 3); // 찾은 가장 첫번째 "요소"가 반환된다. 인덱스가 반환되는 것이 아니다!
arr.findIndex(v => v < 3); // 얘가 index 반환한다.
arr.map(e => e); // forEach와 같다. 다른점은 콜백의 반환값들을 arr에 모은다. (내가 알고있는 mapping 이 맞다.)
arr.filter(e => e % 2 == 1); // mapReduce이지만, 원본배열을 수정할수도 있네...
arr.reduce((acc, cur, index, arr) => {
    acc.push(cur * 2);
    return acc; // 항상 return 값이 있어야 한다는 걸 명심하자!
}, []); // acc는 숫자, 배열, 객체 전부 가능함. 이 초기값을 2번째 인자로 넘겨줄 수 있는데, 생략도 가능함.
// 2번째 인자가 acc 초기값이 됨. 생략하면 첫번째 값을 넣겠지?


// callback 함수의 의미 2가지
// 1. 이벤트 발생 시 호출되는 예약함수
// 2. 일반 함수의 Parameter로 등록되는 함수

// 성능확인하기
var t = performance.now(); // 이걸로 타임스탭프 찍어서 성능측정가능하다!!!

// 확인해보면 map > for > foreach 순서로 성능이 안좋다. 그래서 나중에는 map만 쓴다.

// destructing 문법
const abc = {
    name: "김건국",
    age: 30
}
var { name, age } = abc; // 이렇게 원하는 프로퍼티만 빼내는 것.
//객체의 경우 순서가 있기 때문에 프로퍼티 이름과 변수명이 대응되어야 한다.

// 배열의 경우 순서가 있기때문에 변수명을 마음대로 지을 수 있다.
let [ one, two ] = arr; // 배열은 []로 적어야 한다..

// spread
const def = { // 객체 스프레드
    ...abc, // abc의 모든 프로퍼티를 가져와서 펼친다.
    gender: "M"
}
const arrSpread = [...arr, 2, 3]; // 배열 스프레드

// rest문법
var { name, ...rest } = abc; // 앞서 추출한 요소 외 나머지 모두를 "객체는 객체에", "배열은 배열에" 저장한다.

// 비동기
console.log(Date.now()); // 원래 sleep 같은건 Date.now로 블로킹한다.
setTimeout(() => { // 비동기 함수. 스레드를 새로 생성하는 듯.
    // 콜백
}, 1000); // ms단위 타임아웃.
// 아무리 setTimeout 호출 후 시간이 지났더라도, 모든 동기코드가 끝난 후 기준으로 실행된다.

//callback hell = 비동기함수 호출순서를 보장하기 위해 비동기안에서 비동기호출을 반복하다가 코드가 더러워지는 것.
// 콜백 단점 1. 콜백지옥, 2. 비동기함수사용했음에도 동기함수처럼 느림. 3. 에러처리가 없음

// Promise -> 비동기 callback hell 방지
// 1. 콜백패턴이 아님
// 2. 성공과 실패로 나눠 결과를 받음.

var promise = new Promise((resolve, reject) => {
    resolve("성공"); // 성공하면 promiseResult에 "성공" 이 담긴다.
    reject("실패"); // 실패 시 갱신.
    // 이렇게 promise 하나 안에서 분기를 나눠도 되고, 성공만 받거나 실패만 받는 promise를 각각 정의해도 된다.
}); // 안에 들어가는 함수는 executor 라고 한다.

var promiseFail = new Promise(null, reject => { reject("실패") }); //이런식으로 앞 인자가 없으면 명시적 null로 넣어줄 수 있다.
// 근데 사실 이렇게 사용하지는 않고 catch로 처리한다.

/* [[promiseState]] : 상태 대표적으로 3개
    - "pending" : 대기
    - "fulfilled" : 성공
    - "rejected" : 실패
   [[promiseResult]] : 결과값 담음
*/

// promise 체이닝. 1. promise가 만들어지면서 줬던 콜백함수가 실행된다.
// 2. 성공하면 resolve, 실패하면 reject가 실행되면서 promiseState와 Result가 업데이트될거이다. 그리고 resolve(), reject()에 넣은 결과값을 반환.
// 3. 그렇게 업데이트된 promise에 then, catch 등을 호출하면 이 상태에 따라 실행여부가 결정됨.
// 4. 분기에 따라 then, catch 등에 들어갔다면 계산된 result를 넘기는거고, 다시 콜백함수를 제공해서 처리를 할 수 있다. 이때 콜백의 매개변수는 함수가 아니고, 성공시 값과 실패시 값이다.
// 5. 제일 마지막에 최종 result를 받아서 처리할 수 있다.
promise.then((result, error) => { //성공시의 메서드. then을 계속 체이닝 해서 순차실행을 할 수 있다.
    console.log(result);
    return result + 1; // return 값이 다음 프로미스의 result에 저장된다.
}).catch(error => { // 오류가 발생하면 catch로 간다. reject 하나만 받는것이 특징.

}).finally(() => { // 무조건 실행

});

// 예제

var promise = new Promise((res, rej) => {
    setTimeout(() => {
        res("치킨"); // 3초뒤 
    }, 3000);
})

promise.then((result, error) => { // 여기 두 인자는 성공result, 실패 result이다.
    console.log(result); // 치킨이 
})

new Promise(resolve => {
    resolve(0);
}).then(result => result + 1)
  .then(result => result * 2)
  .then(result => result + 1)
  .then(result => result * 2)
  .then(result => console.log(result));

// 함수에서 promise반환하거나 하는 경우.. then 사용하면 순서가 바뀌어도 동작하게된다. 그러면 코드흐름을 해친다.

// async / await
// 애초에 promise를 쉽게 사용하기 위해 도입되었다.(ES8)
// promise 사용할 때 function 에서 promise를 return 하는 형식으로 많이 사용하기 때문.
async function homework(){
    //async 키워드가 붙으면 내부적으로 promise 객체로 구성된다.

    { //어떤 비동기작업블럭~~
        const a = await 1; // 무조건 await 가 끝나야지만 아랫줄이 실행
        // async 내에서만 동작한다.
    }
    console.log(a);
}
homework().then(); // promise 객체로 구성되기 때문에 then 도 사용할 수 있다. 

// 즉, async 키워드가 붙으면 비동기함수로 동작하고, await 키워드는 비동기함수의 완료를 기다린다.

// 비동기 프로그래밍은 호출순서를 바꾸는것이고, 멀티쓰레드는 동시에 진행하는 것.

// ajax
// XMLHttpRequest - 구식, 옛날.
// 1. 생성 2. 열기 3. 보내기
const request = new XMLHttpRequest(); // 생성
request.open("GET", "https://jsonplaceholder.typicode.com/todos/"); // 열기
request.send();
request.onreadystatechange = function (){
    console.log(request.readyState);
    //옛날.
    if(request.readyState === request.DONE) { // 데이터가 다 왔으면. (4랑 같은 값이다.)
        console.log(request.response);
    }else{
        console.log(request.responseText);
    }
};
console.log(request);
//readyState
//0 : request 초기화되지 않음 
//1 : 서버와 연결이 성사된 loading
//2 : 서버가 request를 받은 loaded
//3 : request를 처리중인 interactive
//4 : 완료단계 (request에 대한 요청이 끝났고, 응답을 준비한다.)

// fetch API
//   - XMLHttpRequest에서 발전
//   - Promise 형태로 반환
fetch("https://jsonplaceholder.typicode.com/todos/").then(result => result.json()).then(result => console.log(result));
// axios API
//   - Vue/React에서도 권고 라이브러리로 지정
//   - Promise 형태 리턴
//axios unpkg CDN 복사 후 가져온 다음 사용.
//axios.get("url").then(res => res.data); // 애초에 json으로 오기 때문에 추가적으로 json() 해줄 필요가 없다. 


