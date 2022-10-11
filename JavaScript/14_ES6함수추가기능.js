/*  ES6 이전 함수들은 별다른 구분없이 다양한 목적으로 사용되었다. (일반함수, 생성자함수, 인스턴스 메서드 등등..) 이는 실수유발가능하고 성능면에서도 손해이다.
     - 모든 함수가 callable이면서 constructable이다. 이는 prototype도 가진다는 뜻이고 성능도 안좋아진다.

    그래서 ES6부터 함수는 사용목적에 따라 명확하게 3가지로 구분되었다.
        - constructor, prototype, super, arguments 구분
        - Normal (O, O, X, O) -> 생성자로도 쓸 수 있고, 머.. 일반함수로도 쓸 수 있다. 메서드가 아니므로 super은 없다. 즉.. ES6 이전 함수와 똑같다.
        - Method (X, X, O, O) -> 생성자로 절대 사용되지 않는다. 그래서 cons, proto가 없다. 대신 바인딩되면서 [[HomeObject]]를 가지게 되므로 super를 사용할 수 있다. -> 고로, 메서드 정의는 해당방식으로만 써라.
        - Arrow  (X, X, X, X) -> 콜백으로만 써라?
            - arguments 는 왜 없을까? 쓸일이 없어서.. 고차함수의 arguments를 참조할 수 있따.
                - 심지어 고차함수조차 arrow function이라면 무시하고 계속 검색한다! (왜냐? 자체 arguments가 없으니까 scope chain을 통해 검색하는 것이다.)
                - 만약 써야 한다면 ...rest. 즉 Rest parameter를 사용하자.
            - lexical this
                - arrow function은 this바인딩이 없다!!!!(개신기하농) 그래서 this를 참조하면 스코프 체인을 통해서 상위스코프에서 this를 찾는다.(이게 원리였구만)
                - 마치 렉시컬스코프처럼 정의된 위치에 의해 결정된다는 것을 의미한다.
                - this 바인딩 자체가 없기 때문에 call, apply, bind 해봤자 효과가 없다. 다만 호출은 된다.
                - 또한, 메서드를 화살표함수로 정의하면 안된다. this +@ 가 없자나..ㅋㅋ
*/

function Person(name){
    this.name = name;
}

// 메서드 동적추가
//Person.prototype.sayHi = ~~ 원래는 이렇게 일반함수만 넣을 수 있다.
// ES6메서드를 동적추가할 수는 없을까?
Person.prototype = { // 객체리터럴 바인딩으로 prototype을 교체해준다!
    constructor: Person, // 프로토타입을 새 객체로 교체하니, constructor와 바인딩을 다시해준다!
    sayHi() {console.log(`Hi ${this.name}`)}, // 그 후 메서드를 정의한다.
}

//class 필드에서 화살표 함수 할당 (쓸모없는 내용)
class Person2{
    name = "Lee";
    sayHi = () => console.log(`Hi ${this.name}`);
    // 이건 어떻게 될까? class filed는 인스턴스요소이다. 즉, 인스터스 메서드로 들어간다.
    // 즉, constructor 내에서 저 코드들이 실행된다고 보면 된다. this.sayHi = ~~ 처럼.. 그럼 arrow function이 가리키는 this는 멀까? 생성자 함수의 특성때문에 만들어지는 인스턴스를 가리키게 된다.
    // super도 마찬가지로 작동은 제대로 된다. (constructor로 들어가고, constructor를 참조하게 되서..)
    // 다만 이건 인스턴스 메서드자나? 낭비다. 굳이 이렇게 쓸 필요가 없다. 그니까 결론은 걍 메서드는 메서드정의로 써라...
}

// Rest Parameter
function foo(param, ...rest){
    console.log(rest); // 배열로 받았다!
    /*  1. 나머지 모든 값을 받기때문에, 제일 나중에 받아야한다.
        2. 같은 이치로, 1개만 선언할 수 있다.
        3. foo.length.. 즉 매개변수개수를 나타내는 값에 영향을 주지 않는다. ...rest만 썼다면 length는 0이다.
        사실상 유사배열객체인 arguments의 강화판이라보면 된다. 결론은 그냥 rest 문법을 사용하자.
    */
}

// 기본값 할당
function bar(x = 0, y = 0){ // 인수가 전달되지 않으면 undefined이다. 기본값할당은 전달하지 않거나, undefined를 전달했을 때 작동한다.
    //ES6 이전에는 아래처럼 방어했었다. 하지만 이제는 그럴 필요가 없다.
    x = x || 0;
    y = y || 0;
    
    return x + y;
    // 1. rest에는 지정할 수 없다.
    // 2. length에서 무시된다. 즉, 현재 bar.length를 찍어보면 0이다.
    // 3. 직접 전달하지 않는이상, argument에도 적용되지 않는다.
}