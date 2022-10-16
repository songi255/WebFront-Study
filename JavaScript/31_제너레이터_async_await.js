/* Generator(ES6)
    코드 실행을 일시중지했다가 필요시점에 재개할 수 있는 특수함수이다.
        - 함수 호출자에게 함수 실행제어권을 양도할 수 있다.
            - 일반함수는 호출 시 제어권이 함수에 넘어가지만, generator는 caller에게 yield(양도) 할 수 있다.
        - caller와 status를 주고받을 수 있다.
        - generator 호출 시 generator 객체를 반환한다.
            - 즉, 호출 시 함수코드 실행이 아니라, 이터러블/이터레이터 인 generator 객체를 반환한다.
*/

// function* 로 선언, 1개 이상의 yield 표현식을 포함한다.
function* getDecFunc(){
    yield 3; // yield는 next와 상호작용한다고 보면 된다. 무슨말이냐면..
    // 1번째 next() 호출 시 yield 3; 실행. 3이 return 된다.
    const x = yield 2; // 2번재 next() 실행. 여기서 x에 2가 할당되는 것이 아니다. 2는 next() 호출 시 반환되는 값이다.
    
    // 3번째 next(10) 호출. 이때 next()에 인자로 준 값이 [yield 2;] 표현식의 결과가 되어, 밑에서 10을 줬으니 x에 10이 할당된다.
    const y = yield (x + 10); // 그럼 반환은? [yield (x + 10);]이니 20이 반환된다.

    // 4번째 next(20) 호출. 이때 위에서 아직 할당받지 못한 y가 20을 받는다. 마지막 return 에서 30을 반환한다.
    return x + y; // generator의 return 반환값은 일반적인 의미가 없고, 마지막 next를 호출하기 위한 종료의 의미를 가진다.

    // 결론. 할당 순서가 약간 다르다. yield로 할당 시, 한줄이 한번에 처리되는 것이 아니고, 2번의 next()가 실행되어야 한다는 점,
    // 할당은 2번째 next()에서 이루어진다는 점. 꼭 주의하자!!!!!
}

// 메서드로 선언시 *가 앞에 붙는다. 즉, *의 위치는 function 과 name 사이라면 어디든 상관없다.
const obj = {
    * genObjMethod(){
        yield 1;
    }
}

// arrow function으로 정의할 수 없다.
// const genArrowFunc = * () => { yield 1; } // 불가능..
// new 도 불가능하다.

// 사용법 (이터러블/이터레이터인 이유)
// return과 throw를 가지고 있는 점이 다르다.
const generator = getDecFunc();

console.log(generator.next()); // {value: 3, done: false} -> 이건 걍 이터레이터 사용법이다. yield 까지만 실행 후 result 객체를 반환한다.
console.log(generator.return('End!')); // {value: "End!", done: true} -> 전달 받은 값으로 result 객체를 반환한다.
console.log(generator.throw('Error!')); // {value: undefined, done: true} -> 전달받은 값으로, generator 내에 Error를 발생시키고, result객체에는 undefined 와 done: true를 담는다.
// 즉, throw 쓰기 위해 기본 함수에 try catch가 필요하다.

// generator의 next()는 또 다른점이, 인수를 전달할 수 있다. 작동과정은 위에 설명해놨다. 순서가 약간 이상하기 때문에 주의할 필요가 있다.
generator.next(); // 첫번째 yield에서 x에 할당하고 있지만, 실질적인 할당은 2번째 next에서 실행된다.
generator.next(10); // 여기서 2번째 yield를 반환하지만, 그 전에 먼저 1번째 yield 문에서의 할당을 시행한다. -> 약간, 대입문 = 의 실행순서를 생각해보면.. 맞는것도 같고..
generator.next(20); // return도 종료의미의 yield로 쓰인다.
// 여하튼, 이처럼 next와 yield를 통해 caller와 상태를 주고받을 수 있다. next()로 값을 밀어넣으면서 yield 반환값으로 상태를 받아온다.
// 이런 특성을 이용해서 비동기처리를 동기처리처럼 구현할 수 있다.

// generator 활용
// 앞서 무한 이터러블을 만들어본 적이 있다. 이를 generator로 더 쉽게 만들 수 있다.
const infiniteFibonacci = (function* () {
    let [pre, cur] = [0, 1];

    while (true) {
        [pre, cur] = [cur, pre + cur];
        yield cur;
    }
}()); // wow...

// 비동기 처리에의 활용
const asyncFunc = generatorFunc => { 
    // Closure.
    const generator = generatorFunc(); // generator를 받아서 저장한다.

    // 반환할 함수를 정의한다. 인자를 받아서 generator에 제공한다.
    const onResolved = arg => {
        const result = generator.next(arg); // 인자를 제공. 코드 상 result는 Promise를 담은 result객체 이다.

        return result.done // result객체이므로, done은 즉 모든 yield가 끝났느냐? 를 의미한다.
            ? result.value // 마지막이라면 value(Promise)를 반환.
            : result.value.then(res => onResolved(res)); // 아직이면 결과값(Promise)을 다시 입력해서(체이닝을 위해) 재실행한다..
    };

    return onResolved; // 최종적으로 만들어진 Closure 함수를 반환한다.
};

// 최종적으로 asyncFunc을 generator를 제공하면서 실행한다.
(asyncFunc(function* fetchTodo(){
    const url = '~~~';

    const response = yield fetch(url); // 첫번째 next()에서 fetch가 실행된다. fetch의 결과 Promise를 반환하게 된다. 다음 next() 까지 response에 할당은 되지 않는다.
    const todo = yield response.json(); // 두번째 next(arg)에서 arg에 이전 fetch의 결과 Promise에 담겨온다. 이때 재귀가 .then으로 호출되었으므로 fetch가 완료됨이 보장된다.
    // 즉, response에 값이 잘 담겨있다. 여기서는 json객체로 변환해서 return 한다. 다만 아직 done는 false이다.
    console.log(todo); // 마지막으로 세번째 next(arg)가 실행되면서, todo에 arg가 할당되고, console.log(todo) 까지 도착한다. 여기서 arg는 2번째 next()에서 return 한 json객체이다.
    // 즉, next()를 한번 더 거치게 된다. 최종적으로 done이 true가 되어 result.value를 반환하게 된다.

})()); // onResolved를 즉시 호출해서 첫번째 next()를 실행하게 된다.

// 위의 generator 실행기 예제는 완전하지 않다. async/await 를 사용하면 사용할 필요가 없다.
// 혹~~~~~~~~시라도 generator 실행기가 필요하다면, 직접 구현하기보다 co 라이브러리를 사용하기를 바란다.

// * Node 환경 co 예시
const co = require('co');
co(function* fetchTodo() {
    const response = yield fetch(url);
    const todo = yield response.json();
    confirm.log(todo);
});


// async/await(ES8)
// 위의 모든 내용은 이걸 위해서였다. generator는 장황하고 가독성도 나쁘다.
// Promise 기반으로 동작한다. 하지만 then, catch, finally 를 사용할 필요 없이 동기코드처럼 구현할 수 있다.

async function fetchTodo() { // async/await는 짝꿍이다. await를 사용하기 위해 무조건 async 함수안에 있어야 한다.
    const response = await fetch(url); // 여기서 block 걸린다. 반드시 Promise 앞에서 사용해야 한다.
    const todo = await response.json(); // 여기는 await가 사실상 필요없는거아닌가..
    console.log(todo);

    try { } catch (error) { } // 심지어 안쪽에서 try catch로 예외처리도 할 수 있다.
    // 물론 호출 후 .catch로도 가능하다.

} // 참고로 async 함수는 항상 반환값을 resolve 하는 Promise를 반환한다.
// 그래서 constructor(생성객체를 반환해야 함) 빼고는 모든곳에 사용할 수 있다. 화살표함수건 메서드건..

fetchTodo().then(v => console.log(v)); // 존나게 쉬워졌다.

// 만약 순서가 상관없는 비동기작업들을 실행한다면 await Promise.all([~~~~]) 하면 될 것이다.


