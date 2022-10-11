/* this 바인딩
    lexical scope 는 정적이나, this바인딩은 호출방식에 따라 동적으로 결정된다.
    Java, C++ 등이 무조건 인스턴스를 가리키는 것과 대조적이다.
    생성자, prototype은 생성할 객체를, 리터럴은 자기자신을 가리킨다.
    전역, 일반함수(strict에서는 undefined) 내 this는 전역객체를 가리킴.
*/

// 다양한 호출방식
var foo = function () {
    console.dir(this);
}

// 1. 일반함수 호출
foo(); // object
// setTime 등 call back으로 실행되는 함수도 엄연히 일반함수이기 때문에 this에는 전역객체가 바인딩된다!
// 어떻게 바인딩해야 할까?
//  1. 외부에서 that을 선언 후 that을 참조
//  2. arrow function 사용
//  3. call, apply, bind로 this 바인트 시켜주기 function(){}.bind(this) 형태로 콜백 넘겨준다.

// 2. 메서드 호출
var obj = { foo };
obj.foo(); // obj
// 메서드 내에서도 중첩함수로 호출되는 함수는 호출객체가 아닌 전역객체가 바인딩된다.
// 메서드는 독립적인 함수 객체다. 해당 객체와 바인딩되어있을 뿐.. 다른객체에 갖다붙이면 다른객체와 바인딩된다. 변수에 붙이면 일반함수가 된다.
// prototype 메서드는 어떻게 될까? 인스턴스로 호출하면 인스턴스가 바인딩되고, 프로토타입으로 호출하면 프로토타입이 바인딩. -> 즉, 호출시점에 결정된다는게 참 재밌다.

// 3. 생성자 호출
new foo(); // foo {}

// 4. apply, call, bind에 의한 간접호출 -> 세 메서드의 자세한 내용은 5_함수 참고!
var bar = { name: "var" }; // 넘겨줄 객체

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar); // bar