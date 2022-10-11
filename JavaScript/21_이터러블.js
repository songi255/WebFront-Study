/* ES6에서 도입된 iteration protocol은 iterable 한 collection을 만들기 위해 정의되었다.
    1. iterable protocol
        - Symbol.iterator를 상속이든 정의든 가지고 있어서, 호출 시 iterator protocol을 준수한 이터레이터를 반환한다.
        - iterable은 for...of 순회, spread, destructuring 가능하다.
    2. iterator protocol     
        - next()를 소유한다.
            - 호출 시 value(any), done(bool) 프로퍼티를 가진, result 객체를 반환한다.
*/

// 이터러블의 확인
typeof obj[Symbol.iterator] === 'function'; // 먼가 애매하긴 하다..
// {}는 이터러블이 아니다.
// 배열, 문자열, Set, Map 등은 이터러블이다.
// 원래 이터러블이 아니면 디스트럭처링 할 수 없지만, 객체는 예외적으로 가능하다.
let obj = { a: 1, b: 2 };
console.log( {...obj} ); // 디스트럭처링 했다.

const array = [1, 2, 3];
console.log(Symbol.iterator in array); // true. 배열은 Array.prototype의 Symbol.iterator를 상속받는다.
for(const item of array){ // for...of 순회 가능하다.
    console.log(item);
}
console.log([...array]); // 스프레드 가능하다.
const [a, ...rest] = array; // 디스트럭처링 할당 대상으로 사용가능하다.

// result 객체
const iterator = [1, 2, 3][Symbol.iterator]();
iterator.next(); // 1
iterator.next(); // 2
iterator.next(); // 3
iterator.next(); // undefined (done이 true가 됨)

// for...of 문
// 이터러블 객체에 사용할 수 있다. 요소를 하나씩 순회한다. 내부적으로는 next를 호출한다.
// for...in은 "프로토타입체인"에 존재하는 [[Enumerable]]인 프로퍼티를 열거한다. (key가 Symbol인 경우 열거되지 않는다.)

// 유사배열객체와는 다르지만, arguments, NodeList, HTMLCollection 은 ES6부터 유사배열이면서 이터러블이다. 그래서 순회가능하다.
// 모든 유사배열객체가 이터러블인것은 아니지만, Array.from 을 사용해서 배열로 쉽게 변환할 수 있다.
// 배열도 마찬가지로 ES6부터 이터러블이 되었다.

// 사용자 정의 이터러블
// 이터레이션 프로토콜만 준수하면 이터러블이 된다. 아래는 예시이다.

const fibonacci = {
    [Symbol.iterator]() { // 애초에 이것부터 클로져였네. 항상 처음부터 시작하는 이터레이터 객체를 반환한다.
        let [pre, cur] = [0, 1];
        const max = 10;

        return { // 객체를 반환함.
            next(){ // next()를 가짐
                [pre, cur] = [cur, pre + cur];
                return { value: cur, done: cur >= max }; // 음.. 매 반복마다 객체를 생성하네.. 성능면으로 생각할 여지가 있겠다.1
            }
        }
    }
}

const arr = [...fibonacci]; // 이터러블이기 때문에 디스트럭처링도 가능하다. [1, 2, 3, 5, 8]

// Closure로 발전시켜보자. 이터러블 그 자체가 아닌, 이터러블을 반환하는 함수로 사용할 수도 있다.
const fibonacci_advanced = function (max){
    let [pre, cur] = [0, 1];
 
    return {
        [Symbol.iterator]() {
            return {
                next(){
                    [pre, cur] = [cur, pre + cur];
                    return { value: cur, done: cur >= max };
                }
            }
        }
    }
}

const arr2 = [...fibonacci_advanced(50)]; // 개신기하네..


// 이터러블이면서 이터레이터인 객체
// next()를 가지고 있으면서, [Symbol.iterator]는 자기 자신을 반환하면 된다.
const iterable_and_iterator = {
    [Symbol.iterator]() { return this; },
    
    next(){
        return {value: any, done: boolean}
    }
}; // 무슨 의미가 있는지는 아직 모르겠다.

// 무한 이터러블과 지연평가
// 위 fibo에서 done을 생략하면 어떻게 될까? 무한을 표현할 수 있다.
for (const num of fibonacci){ // 이터러블은 기본적으로 지연평가된다. 즉, 데이터를 미리 다 만들어놓는게 아니기 때문에 아래처럼 사용이 가능하다.
    if (num > 10000) break;
    console.log(num);
}
const [f1, f2, f3] = fibonacci; // 처음 3개의 요소만 취득한다. 물론 ...rest는 안되겠지.


