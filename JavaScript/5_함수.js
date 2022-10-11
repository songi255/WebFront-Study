// 일반 함수
function add(x, y){} // ;없음. 표현식이 아닌 문이기 때문
// 하지만 문맥에 따라 표현식으로도 해석된다. 즉, var add = function add(x, y){} 에서는 표현식이된다.
// 이렇게 JS에서는 같은 표현이라도 문맥에따라 중의적으로 해석한다.
// 여기서 add는 함수이름으로, 저 {}안에서만 쓸 수 있다. 밖에서는 쓸 수 없다.
// 식별자는 V8엔진이 암묵적으로 생성하는 것이다. (name 프로퍼티와 동일하게.)

//사용 권장
var add = function(x,y){return x+y;}; //함수이름 생략된 형태
//이런 function문은 hoisting 됨. 화살표나 생성자는 hoisting 되지 않음.

// 함수 생성자 사용 - 일반적이지 않음
var add = new Function('x', 'y', 'return x + y'); //eval 처럼 동작 - deprecated
// 클로저를 생성하지않는 등 위의 선언방식들과 다르게 동작한다.

// 화살표 함수 (lambda)
var add = (x, y) => x + y;
var getObj = (a, b) => ({a, b}); // 객체 리턴시에는, 함수몸체를 감싸는 {}와 혼동될 수 있기 때문에 ()로 감싸야 한다.

// 일급객체
// 값처럼 사용가능한 객체. 함수는 일급객체이다.

// 초기값 지정
function add(x = 0, y = 1){}; // type은 제한할 수 없다.

// arguments 프로퍼티 : 개수가 초과하는 인수는 묵시적으로 여기에 저장된다.

// 인수확인 : 매개변수 개수, 타입을 확인하지 않으므로, typeof로 확실하게 확인하도록 코드를 짜자.
// 매개변수는 0개가 이상적이고, 작으면 작을수록 좋다. 최대 3개를 넘지 않는것이 좋고, 그 이상이라면 객체를 만들어 전달하는것이 유리하다.

// return 시에 줄바꿈에 조심하자. 만약 return
// x + y 를 작성한다면, 세미콜론 자동삽입에 의해 return; x + y;로 의도치않은 결과가 발생할 수 있다.

// 즉시 실행함수
(function(){console.log("즉시실행함수")})(); // 외부호출불가. 단 1번만 실행됨.
(function(){}()); // 둘다 가능.
// 전역객체 사용을 피하고자 할때 사용
// ()가 무슨뜻이냐면, 그룹연산자 ()그거 맞다. 중의적 해석에 의해서 ()안에 들어가면 선언문이 아닌 표현식으로 해석이된다.
// 그래서 함수 이름도 적지 않아도 된다.
// 즉, 정의문으로 해석되지 않았기 때문에, 정의되지 않아 다시는 사용할 수 없다. 다만 표현문으로써 함수객체를 표현하게 되는것이다.
// 따라서 해당 객체는 함수이므로 호출이 가능한 것이다.
// function(){}(); 는 왜 안될까? 세미콜론 자동삽입에 의해 function(){};(); 로 변환되기 때문이다!!! 그래서 뒤의 그룹연산자에 피연산자가 없어서 에러가 발생한다.
+function(){}(); // 그래서 이렇게 +로 함수리터럴로 해석하게 하는것도 가능하다. 하지만 ()가 제일 일반적이다.

// 중첩함수 : 함수 내에 함수 정의
function outer(){
    let a = 3;
    function inner(){ // outer에서만 호출가능한 함수. 일반적으로 helper function의 역할을 한다.
        a = 2;
    } // 이 중첩함수를 응용해서 closer를 사용한다.
    //ES6 부터 statement가 위치할 수 있는 문맥이면 어디든 function을 정의할 수 있다. (if나 for 내 같이..)
    // 그러나 호이스팅으로 인해 혼란이 발생할 수 있으니 웬만하면 이렇게 쓰지 말자.
}

// F(a, f)에서 F는 고차함수, f는 callback 함수(다른 함수의 인수로 전달되는 함수)라고 한다.

//pure function vs 비순수함수 : 외부로 부터 받은 값을 보존하는지?

// 함수 내 변수 hoisting : 함수가 호출될 때 hoisting 됨

/*
    일급객체의 조건
        - 무명의 리터럴로 생성할 수 있다 (런타임에 생성 가능하다)
        - 변수나 자료구조에 저장할 수 있다.
        - 함수의 매개변수에 전달할 수 있다.
        - 함수의 반환값으로 사용할 수 있다.
        -> 고로 JS의 function은 일급객체이다.
*/


// 함수 객체의 프로퍼티
function add(x, y){
    // 1. arguments 프로퍼티 (사실 ES3에서 폐지되서 프로퍼티는 아니고 지역변수같은 느낌임)
    console.log(arguments.callee); // argument - callee 프로퍼티는 자신을 만든 객체, 즉 함수 자기자신을 가리킨다.
    // 전달된 인수들을 담고있는 유사 배열객체. 함수 내부에서 지역변수처럼 사용되는 객체임. 즉, 외부에선 사용할 수 없음(ES3에서 폐지됨). 당연하지... 전달이 안됬는데 어케쓰노
    // 초과전달된 인자들을 암묵적으로 argument에 저장한다.
    // JS는 전달인수 개수가 일치하는지 확인하지 않는다. 매개변수는 undefined로 초기화된 후 할당된다. 
    
    const iterator = arguments[Symbol.iterator]; // Symbol 프로퍼티에 이터레이터를 담고있다.
    console.log(iterator.next()); // {value: x, done : false} -> done은 뒤에 더 남았는지? 리턴.
    
    //arguments는 유사배열객체이지 배열은 아니다. 따라서 배열메서드를 사용하면 에러가 발생. 간접호출로 배열로 바꿔줘야 한다.(불편)
    const arr = Array.prototype.slice.call(arguments); // 이런식으로 배열로 바꾸어줘야한다.
    // ES6 부터는 이런 번거로움 해결을 위해 Rest 파라미터를 사용 -> 이것때문에 ES6 이상에서는 arguments가 중요도가 떨어지긴 했다.
    function sum(...args){ return args.reduce(( per, cur) => pre + cur );
    
    // 2. caller 프로퍼티
    // 비표준 프로퍼티. 이후 표준화 예정도 없으므로 사용하지 말고 참고로 알아만 두자. 자기자신을 호출한 함수를 가리킴
    console.log(add.caller); // null. 최상단에서 불렀으니.. node.js에서는 다른 결과가 나옴.

    // 3. length 프로퍼티 : 매개변수 개수
    console.log(add.length); // "매개변수" 개수이다! 넘겨받은 "인자" 수가 아니다. 그 점이 argument와 다르다.

    // 4. name 프로퍼티(ES6) : 함수 이름을 나타냄
    // ES5(비표준), ES6의 동작이 다른데, 무명함수의 경우 ES5는 ""를 반환하지만, 6은 식별자를 준 경우 그 값으로 갖는다.

    // 5. prototype 프로퍼티
    // constructor 만이 소유. 생성할 인스턴스의 prototype을 가리킴
}

// apply, call, bind
// Function.prototype에 정의된 메서드. 즉, 모든 함수가 사용할 수 있다.
// apply와 call은 본질적으로 함수를 호출하는 기능이다. 인수전달방식만 다를 뿐 동일하다.
function ABC(){
    console.log(arguments);
    return this;
}
const thisArg = {a : 1}; // this로 사용할 객체

console.log(ABC.bind(thisArg)()); // bind는 this만 전달한다. 이때, 그저 바인딩된 함수를 반환하므로, 꼭 호출해주어야 한다.
// bind의 경우 대부분 callback함수로 넘겨줄 때, this 바인딩 시키기 위해 사용한다.

console.log(ABC.apply(thisArg, [1, 2, 3])); // apply는 배열로 인자를 준다.
console.log(ABC.call(thisArg, 1, 2, 3)); // call은 나열해서 인자를 준다.
// apply, call은 어디에 쓸까? 대표적으로 유사배열객체에 배열메서드를 사용하는 경우에 사용한다!

function usage(){
    //arguments.slice(); -> 불가능하다.. arguments는 유사배열객체이지 객체가 아니기 때문에 slice가 없다.
    const arr = Array.prototype.slice.call(arguments); // 이건 된다. slice의 this에 arguments를 넣어줬기 때문에, slice가 없는 arguments에 slice를 사용하였다.
    // 참고로, slice는 인자없이 전달하면 배열을 복사한다.
}















