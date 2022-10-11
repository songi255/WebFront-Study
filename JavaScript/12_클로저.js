/* 도입
    Closure는 JS의 고유개념이 아니다. 함수를 일급객체로 취급하는 함수형 프로그래밍 언어?(Haskell, Lisp, Erlang, Scala)
    함수는 정의될 때 [[Environment]] 슬롯에 상위스코프 참조를 저장한다고 했다. 이 상위 컨텍스트가 사라져도 함수가 존재하는 한, 참조는 지속되고, 이 상위스코프또한 사라지지 않는다. 이것이 클로져의 핵심이다.

    이론적으로 JS의 모든 함수는 클로저이지만(상위 스코프를 기억하니까.), 모든 함수를 클로저라고 하지는 않는다.
        - 상위 스코프의 식별자를 하나도 참조하지 않는경우, 대부분 모던 브라우저는 최적화를 통해 상위스코프를 기억하지 않는다.
        - 혹은 반환되지 않아 외부함수보다 수명이 짧다면 일반적으로 클로저라 하지 않는다.
*/

// Closure
let add = (function (){ // 반환된 함수가 본질이므로 즉시실행함수로 정의해버린다.
  let x = 1; // 외부함수의 값이다. free variable(자유변수) 라고 한다. Closure는 free variable에 대해 closed 되어있다는 뜻이다. (자유변수에 묶여있다.)
  let y = 1; // 밑에서 참조되지 않았다. 모던 브라우저는 대부분 최적화를 통해 참조되는 식별자만 기억한다.
  return function(){
    return x++; // 외부함수의 스코프를 참조하고있다. 이때 즉시실행함수가 종료되어도 스코프는 참조되고 있으므로 사라지지 않는다.
    
  }
}());

//Closure의 예시

// counter의 강화버전
let counter = (function (){ 
    let x = 1;
    return {
        add() {
            return ++x;
        }, 
        sub(){
            return --x;
        }
    }
  }());
counter.add(); // 이렇게 객체의 메서드로 담아 return 할 수 있다.

// 생성자 함수 표현
const Counter = (function (){
    let num = 0;

    function Counter(){ // 원래는 이 함수만 들어가는거였다.
        //this.num = 0; // 원래대로라면 이렇게 썼을텐데, public이라 은닉되지 않고 외부에서 접근가능하다.
    }

    Counter.prototype.increase = function(){ // 원래는 전역에 쓰이던 코드이다. 사실 전역에서는 쓸 수 없다. 생성자함수 Counter의 지역변수로써 num이 있기 때문에 외부에서 참조할 수가 없으니.
        return ++num; // 그래서 이렇게 한번에 묶어서 실행하는 것이다.
    }

    Counter.prototype.decrease = function(){
        return num > 0 ? --num : 0;
    }

    return Counter; // 원래 생성자함수부분을 리턴한다.
}());

const counter2 = new Counter(); // prototype은 단 한번 생성되었다. 그말은 new로 만든 모든 객체가 동일한 num을 가리킨다는 것이다.
// counter에서는 물론 의도된 것이지만, Person.age같은 변수에 이렇게 생각하고 접근하면 안될것이다... 이처럼 완전한 은닉을 지원하지는 않는다.
// 다행이 private 필드 정의사양이 뚫렸다!! 잘 쓰도록 하자!!
counter2.increase();

// 함수형 프로그래밍 예제
function makeCounter(predicate){ // 함수를 받아 함수를 반환하는 고차함수. predicate에 보조함수를 넣으면 그에 맞는 클로저를 반환한다.
    let cnt = 0;

    return function(){ // 클로저 반환
        cnt = 0;
        cnt = predicate(cnt);
        return cnt;
    }
}

// 관련 재밌는 예시
const funcs = [];
for(let i = 0; i < 3; i++){
    funcs = function() {return i}; // 이거, for 돌 때 마다 새 렉시컬 환경이 만들어져서 자동으로 클로져가 된다.. ㅋㅋㅋ 그래서 호출하면 i를 전부 기억한다.
    // 마치 스냅샷같다.. const와 let을 이용한 for의 특징이다. 환경을 스냅샷처럼 저장한다.
}

// private에 class 까지 있는데, 이제 클로져는 안써도 되는거 아닌가?