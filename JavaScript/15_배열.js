/*  
  원래 배열은 dense array. 즉 하나의 데이터 타입으로 통일되있으며 연속적으로 밀집되있다.
  그러나 JS의 배열은 연속적이지도 않고(sparse array 희소배열), 데이터타입도 마음대로이다. 즉, 배열을 흉내낸 특수객체이다. (타입조차도 Object이다.)\
  그러나 대부분의 모던JS엔진은 최적화를 통해 좀 더 배열처럼 접근한다. (성능 테스트를 해보면 일반객체보다 약 2배가까이 빠르다)
  (타입이 같으면 연속된 메모리 공간을 확보하거나 한다. -> 즉, 배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선이다!!!)

  length 프로퍼티. max는 2^32 - 1 개 이다.
  length 에 임의의 값을 할당할 수 있다. 이때 작은값이면 배열의 길이가 줄어든다. 큰값이면 실제 배열의 길이는 늘어나지 않는다. ( [1, empty * 2] 같이 출력된다.)
  즉, length만 늘리면 요소를 위해 메모리공간을 확보하지도 않고, 빈 요소를 생성하지도 않는다.

*/

const sparse = [, 2, , 4]; // 희소배열. 찍어보면 0, 2 프로퍼티가 아예없다. (length는 4, 프린트시 empty로 나온다.)

// Array 생성자 함수
const array = new Array(10); // 희소배열임. 역시 new 안써도 되긴하다.
//const array = new Array(1, 2, 3); // 인수가 2개이상이면 요소로 판단하고 배열을 만든다.
//const array = new Array({}); // 숫자가 아닌경우 요소로 판단하고 생성한다.

// Array.of(ES6) 는 인수를 요소로 판단하고 만든다.
Array.of(1); // -> [1]이 생성된다.

//Array.from(ES6) 은 유사배열객체, 이터러블객체를 배열로 바꾼다.
Array.from('Hello'); // ['H', 'e', 'l', 'l', 'o']
Array.from({length: 2, 0: 'a', 1: 'b'});
Array.from({length: 3}, (_, i) => i); // 두번째 인자로 콜백을 줄 수 있다. 이 콜백으로 요소를 생성해서 반환할 수 있다. 이 경우, [e, e, e] => [0, 1, 2]가 된다.

/* 유사배열 array-like object 
  1. 배열처럼 인덱스로 접근할 수 있다 (키가 0, 1, 2. 이다)
  2. length 프로퍼티가 있다.
  위 조건을 충족하면 for문으로 순회할 수도 있다.

  iterable object 이터러블 객체
  Symbol.iterator를 구현. for ... of 로 순회할 수 있다.
  디스트럭처링 할당 대상으로 사용할 수 있다.
*/

const arr = [];
arr[100] = 1; // 빈 배열의 100번째 인덱스에 값을 할당했다. 어떻게 될까? 희소배열이 되버린다.
console.log(arr.length); // length 가 자동으로 101로 갱신된다.
arr['age'] = 3; // 배열이지만 프로퍼티를 추가할 수 있다. length는 갱신되지 않는다.

delete arr[100]; // 요소 삭제. length는 갱신되지 않으며, 희소배열이 된다. 즉, 사용하지 마라.
arr.splice(100, 1); // 실제 삭제는 splice로. (삭제시작인덱스, 요소 수)

//배열매서드
// 원본을 변경시키는 mutator method와 새로운 배열을 생성하는 accessor method가 있다.
// 예를 들어 push는 mutator이지만 concat은 accessor 이다.
// ES5 이전 초창기 매서드들은 mutator가 많다. 즉.. 선택할 수 있다면 accessor를 사용하는 것이 좋다!!!

Array.isArray({0: 1, length: 1}); // false
arr.indexOf("foo"); // 여러개면 첫 요소 인덱스, 없으면 -1 반환
arr.indexOf("foo", 2); // 2번 인덱스부터 검색
arr.includes("foo", 2); // ES7. 음수지정하면 뒤에서부터로 시작할 수 있다. indexOf는 NaN을 확인할 수 없다. 고로 포함여부는 includes를 쓰자.

let moded_length = arr.push('foo', "bar"); // 모든 값을 뒤에 넣고 변경된 length값을 반환한다. 결론 -> 웬만하면 push 사용하지 마라.
arr.unshift("foo", "bar"); // 비슷하게 unshift도 있다. push와 다르게 앞에 넣는다. mutator이고, 마찬가지로 차라리 스프레드 문법을 이용하자.
arr[arr.length] = "bar"; // 다만, push는 성능면에서 좋지 않다고 한다. length를 이용해서 직접 추가하는게 push보다 빠르다.
const newArr = [...arr, 3]; //push는 mutator이므로, 스프레드문법(ES6)을 사용하자..

let deleted = arr.pop(); // 제거된 요소를 반환한다. mutator이다.
let deletedfront = arr.shift(); // 마찬가지. 앞에서 뺀다. mutator이다.

let newArr1 = arr.concat(["abc", "def"]); // arr + [] 해서 새로운 배열로 반환한다. 이 과정에서 배열을 해체해서 새 배열에 합친다. 이걸로 push와 unshift를 대체 쌉가능이다.
// 다만 이 또한 스프레드로 대체할 수 있기 때문에, 일관성있게 스프레드를 쓰는걸 권장한다.

let deletedElemnts = [1, 2, 3, 4].splice(1, 2, 20, 30); // 중간에서 삭제할 mutator이다. (삭제시작인덱스(음수로 역행가능), 삭제개수, (삭제시 대체할 요소들))
[1, 2, 3, 4].splice(1, 0, 100); // 제거할 요소가 0개이면 그저 삽입한다.

let sliced = arr.slice(-2); // 마지막 2개 원소를 복사 반환한다. accessor이다.
arr.slice(4, 7); // 4, 5, 6인덱스를 잘라 반환. end는 생략가능하고, 생략시 기본적으로 length가 된다.
arr.slice(); // 모두 생략시 shallow copy 해서 반환한다. -> 배열의 참조값이 같다..
// 참고로 slice, spread, Object.assign 모두 얕은 복사를 한다. 깊은 복사를 하고싶다면 Lodash 라이브러리의 cloneDeep 사용을 추천한다.
Array.prototype.slice.call(arguments); // 내부적으로 for를 사용하나보다.. 유사배열객체에 사용할 수 있다. 그래서 배열로 변환할 수 있다(ES5). 이런식으로.. 
// 물론 Array.from을 사용하는게 더 간단하다. 이터러블인 경우 스프레드를 사용하면 더 쉽게 변환가능하다.

console.log( [1, 2, 3, 4].join(":") ); // 모든 요소를 문자열로 변환 후 구분자로 연결한다. 생략하면 기본값은 , 이다. ('1,2,3,4' 반환)
let reversedArr = arr.reverse(); // mutator. mutator이면서 변경결과배열을 반환하는게 또 이상하다.

[1, 2, 3, 4].fill(0); // [0, 0, 0, 0]으로 채운다. (ES6) mutator이다.
[1, 2, 3, 4].fill(0, 2); // [1, 2, 0, 0]으로 채운다. (채우기 시작할 인덱스 전달)
[1, 2, 3, 4].fill(0, 1, 3); // [1, 0, 0, 4]으로 채운다. (채우기 시작할 인덱스, 멈출 인덱스)

[1, [2, 3, [4, 5], 6, 7], 8].flat(2); // 평탄화한다. level을 지정할 수 있다. 모두 평탄화하고싶으면 Infinity를 전달하면 된다.


// 고차함수 HOF (Higher-Order Function) : 함수를 전달받거나 반환하는 함수
// 함수형 프로그래밍은 궁극적으로 순수함수를 통해 부수효과를 최대한 억제하여 오류를 피하고 프로그램 안정성을 높이려는 노력의 일환이다.
[2, 10].sort(); // 어떻게 정렬될까? sort는 먼저 문자열로 변환 후 정렬한다. 그래서 10, 2가 되버린다.. ㅋㅋ
[2, 10].sort((a, b) => a - b); // comparator를 넘겨줬다. C처럼, 1, 0, -1 을 반환하면 된다. 참고로 문자열끼리도 < 같은 비교연산 가능하다.
//tmi : sort는 quicksort였다.(불안정 알고리즘) ES10 부터 tim sort로 바뀌었다.

[1, 2, 3, 4, 5].forEach((element, index, arr)=>{}); // 요소, 인덱스, forEach를 호출한 배열 (this)를 매개변수로 사용할 수 잇다. 반환값은 없다.
// 두번째 매개변수로 내부콜백함수에서 this로 사용할 객체를 바인딩할 수 있다. 근데... 걍 지금처럼 화살표함수 쓰면 해결되는 경우가 많다...(class 내부에서 메서드쓸때 이런일이 생긴다.)
// 물론 forEach 또한 polyfill을 보면 내부적으로는 for문으로 순회하지만, 내부로 은닉하여 복잡성을 해결한 데 의의가 있다.
// 희소배열의 경우, 없는 요소는 순회대상에서 제외된다. map, filter, reduce도 마찬가지다.
// 다만 for보다 성능은 딸리므로 (당장 순회한번마다 콜백을 실행하니까.) 성능이 중요하거나 양이 많다면 for를 사용하자. 그 외에는 forEach가 가독성이 더 좋으니. forEach를 사용해도 무방.

let newArr2 = [1, 2, 3, 4, 5].map((item, index, arr) => {return item *2;}); // accessor. 반환뺴고는 foreach와 동일하다고 보면 된다. 콜백에서 무조건 return 해야 한다. 물론 두번째로 this전달 가능하다.

let fileteredArr = [1, 2, 3, 4, 5].filter((itme, index, arr) => { return item % 2; }); //accessor. 특정요소 제거용으로도 사용할 수 있다. 마찬가지로 this 줄 수 있다.

let reducedResult = [1, 2, 3, 4, 5].reduce((accumulator, curValue, index, arr) => {

}, 0); // 두번째 인수는 acc의 초기값이다. 배열에 담고싶으면 []로 주면 될것이고.. 머 자기 맘대로..
// 초기값은 언제나 전달하는 것이 안전하다. 빈배열에 reduce하면 에러나기 때문이다.
// 콜백 내에서는 적절하게 curValue를 처리해서 acc에 축적하면 된다. 결과값은 총 1개로 줄어든다.

arr.some(e => e); // 빈배열이면 f
arr.every(e => e); // 빈배열이면 t
arr.find(user => user.id == 2); //ES6. 해당하는 첫번째 요소를 반환한다. 없으면 undefined를 반환.
arr.findIndex(user => user.id == 2); //ES6. 해당하는 첫번째 요소의 인덱스를 반환한다.
//만약 key와 value로 값을 구하는 경우 아래와 같이 클로저로 추상화할 수 있다.
function predicate(key, value) {
  return item => item[key] === value; // key, value를 기억하는 클로저 반환
}

['hello', 'world'].flatMap(x => x.split('')); // map을 수행 한 후 flat을 자동으로 수행해준다. 다만 깊이는 지정할 수 없다. 걍 map인데 자동으로 flat 한번 더 호출해주는 것.



























