/* event type
    약 200가지가 있다. 걍 안적겠다. 조심할 몇개만 적겠다.
    - mouseenter 는 버블링되지 않는다.
        - mouseover 는 버블링된다.
    - mouseleave 는 버블링되지 않는다.
        - mouseout 은 버블링된다.
    
    - keydown
        - 문자, 숫자, 특수문자, enter 는 연속적으로 발생한다.
        - 그 외에는 1번만 발생한다.
    - keypress는 문자키를 눌렀을 때 연속적으로 발생한다.
        - 문자, 숫자, 특수문자, enter 외에는 발생하지 않는다.
        - deprecated 되었으므로 사용하지 마라.
    - keyup : 한번만 발생

    - focus : 버블링되지 않는다.
        - focusin : 버블링된다.
    - blur : 포커스를 잃었을 때. 버블링되지 않는다.
        - focusout : 버블링된다.

    - submit, reset : form관련. reset은 최근 사용하지 않는다.

    - input : input, select, textarea 요소값이 입력되었을 때
    - change : input, select, textarea 요소값이 변경되었을 때
        - input과 다른점은, 포커스가 떠날 때 인식한다.
    - readystatechange : html 로드, 파싱상태를 나타내는 document.readyState 변경될 때
        - loading, interactive, complete 가 있음.

    - DOMContentLoaded : html 로드, 파싱이 완료되어 DOM 생성이 완료되었을 때. 매우 중요!
        - 모든 DOM이 존재함이 보장된다. 리소스는 모른다..

    - resize : 브라우저 window 크기 리사이즈 할 때 연속적으로 발생
        - 오직 window 객체에서만 발생
    - scroll : document (웹페이지) 또는 HTML 요소를 스크롤 할 때 연속적으로 발생

    - load : DOMContentLoaded 발생 후, 모든 리소스(이미지, 폰트 등) 로딩이 완료되었을 때.
        - 주로 window 객체에서 발생
    - unload : 리소스가 언로드될 때 (주로 새로운 웹페이지 요청한 경우 발생)
    - abort : 리소스 로딩 중단되었을 때
    - error : 리소스 로딩 실패했을 때
*/


// 이벤트 핸들러 등록방법 3가지
// 1. 인라인
<button onclick="sayHi('Lee')">Click me!</button>; // 함수 호출문 자체를 할당한다. (여기서도 보면 인자를 줬다. 사실 인자를 주기 위해서 이렇게 호출문자체를 할당한다.)
// 결국, 문자열 자체가 암묵적생성될 함수의 몸체가 된다. 그래서 걍 저기에 함수실행을 할 수도 있다.


// .. 여튼 그래서 그냥 여러개의 문을 할당할 수 있다.
<button onclick="console.log('Hi! '); console.log('there!');">Click me!</button>

// 2. 프로퍼티
const $button = document.querySelector('button');

$button.onclick = console.log; // Event Target, Event Type, Event Handler 로 구성된 것을 볼 수 있다.
// 다만 이 방식은 핸들러를 하나만 달 수 있따.
// 꼭 Target 에 바인딩해야하는 것은 아니다. 전파된 이벤트를 캐치할 수도 있기 때문이다.


// 위의 두 방식은 DOM level 0 부터 제공되던 방식이다.
// 3. addEventListener 방식 -> 이거 쓰자.
$button.addEventListener('click', function() {
  console.log("hi");
}, false);
// 마지막 boolean은 true : capturing / false : bubbling(기본값) 지정한다.
// true이면 Event capturing 단계에서도 캐치할 수 있다.
// 이 방식은 여러개의 핸들러를 달 수 있다. (등록된 순서대로 호출된다. 다만, 동일한 참조로 등록하면 무시된다.)

// 제거
$button.removeEventListener('click', function(){}, true); // addListener에 넣어준 인자와 전부 동일해야지만 제거가 가능하다.
// 즉... 나중을 위해서 EventListener는 람다로 쓰면 안되겠다..

$button.addEventListener('click', function(){ // 이런 특수한 경우에는 가능...
  $button.removeEventListener('click', arguments.callee); // 무기명함수의 경우 이렇게 callee로 참조할 수 있다.
}); // 다만, callee는 최적화를 방해하므로 strict mode에서 사용이 금지된다. 따라서 가능하지만 쓰지는 말자.

$button.onclick = null; // 만약 프로퍼티 방식을 사용했다면 이런식으로 제거가 가능하다. removeEventListener로는 지울 수 없다.

// 이벤트객체
// 이벤트 발생 시 이벤트를 담고있는 객체가 동적 생성된다. handler 함수에 첫번째 인수로 자동전달된다.
function handleClick(e){ // 이렇게 일단 매개변수를 선언해놓고 받아서 사용하면 된다.
  console.log(e.clientX); // 이벤트 종류에 따라 다양한 정보가 있을 것이다.. typeScript가 아니라면 이건 좀 문서를 참고해가야할 듯..
} // 여기서 매개변수의 이름 e는 상관없으나, html태그에 속성방식으로 할당하는 경우 이름이 무조건 "event" 여야 한다. 왜냐하면 암묵적 생성되는 함수의 몸체가 되기 때문..

/* 이벤트객체 상속구조
  Object
    - Event
      - AnimationEvent
      - UIEvent
        - MouseEvent
          - DragEvent
          - ....
        - ....
      - ClipboardEvent
      - CustomEvent
      - ....
*/
// Event 객체는 모두 생성자 함수라서, new로 생성할 수 있다.
let e = new InputEvent('foo'); // foo 타입의 InputEvent 생성.
// 이건 예를 들어서, checkbox가 바뀌면 Event가 쌩으로 생기는데, 이때 type이 'change'이다.
console.log(e.type); // foo

// Event 는 DOM 내에서 발생한 이벤트에 의해 생성되는 객체이다.
// CustomEvent는 JS에 의해 인위적으로 생성한 객체이다.

/* Event 공통 프로퍼티 (Event.prototype)
  - type : 이벤트타입
  - target : 이벤트 발생시킨 요소
  - currentTarget : 이벤트 핸들러가 바인딩 된 요소
  - eventPhase : 이벤트 전파단계
    - 0 : 이벤트없음
    - 1 : capturing step
    - 2 : target step
    - 3 : bubbling step
  - bubbles : 버블링 전파여부
    - 아래 이벤트들은 bubbles: false로 버블링하지 않는다.
      - focus/blur
      - load/unload/abort/error
      - mouseenter/mouseleave
  - cancelable : preventDefault로 기본동작 취소가능한지 여부
    - 아래 이벤트들은 false로 불가능
      - focus/blur
      - load/unload/abort/error
      - dbclick/mouseenter/mouseleave
  - defaultPrevented : 기본동작 취소했는지?
  - isTrusted : 사용자행위에 의해 발생했는지 여부.
    - 예를들어 click() 혹은 dispatchEvent() 메서드들에 의해 인위적으로 발생한 경우 false
  timestamp : 이벤트 발생한 시각
*/


/* MouseEvent
  고유 프로퍼티
    - screenX/Y
    - clientX/Y
      - viewport 즉 가시영역을 기준으로 좌표를 나타낸다.
    - pageX/Y
    - offsetX/Y
    
    - altKey
    - crtlKey
    - shiftKey
    - button
*/

/* keyboardEvent
  - altKey
  - crtlKey
  - shiftKey
  - metaKey
  - key
    - 대응관계는 https://keycode.info 참고.
  - keyCode
*/

/* Event Propagation 이벤트 전파
  event 객체는 event target을 중심으로 DOM을 통해 전파된다.
  1. capturing phase
    - window에서 시작, target 찾을 때 까지 내려감
    - 사실.. 이 단계에서 catch할 일은 거의 없다고 한다.
  2. target phase
    - target에 도달
  3. bubbling phase
    - 다시 window로 올라감

  예를들어, li를 클릭했을 때, 상위태그인 ul에 'click'을 달았다면
    - bubbling 단계에서 캡쳐된다. (리스너 달 때 true 안줬을 경우)
    - target은 li 이다.
    - currentTarget은 ul 이다.

    이렇게 통과하는 DOM Tree 상의 경로는 Event.prototype.composedPath 로 확인할 수 있다.
*/

/* 이벤트 위임
  - 예를 들어, ul 아래의 100개의 li에 공통된 동작을 바인딩한다고 해보자.
  - 100개를 다 붙으면 유지보수도 좋지 않지만, 성능조차 저하된다.
  - 상위 요소 하나에 핸들러를 등록해버리자. 동적으로 자식이 추가되어도 대응가능하다.
*/
const $ul = document.querySelector('ul');
const $li = document.querySelector('li');

$ul.onclick = function( {target} ){ // event의 target만 받는다.
  if (!target.matches('ul > li')) return; // ul에서 받았지만, target이 내가 생각한 자식이 아니면 걍 return 한다.
  // 이렇게 위임 시, 실제 내가 target으로 잡은 요소인지 check할 필요가 있다.

  [...$ul.children].forEach($li => {
    $li.classList.toggle('active', $li === target);
  });

  e.stopPropagation(); // 이벤트를 전파중단시켜봤다. 어떻게 될까?
  // 지금은 ul이지만, li에서 이걸 썼다손 치면, 상위태그인 ul에서는 캡쳐할 수 없다. (chapturing단계에서는 가능하겠지)
  // 이렇게, 하위요소의 이벤트를 개별적으로 처리하기 위해 사용한다.
}

// 기본동작 해제
$button.onclick.onclick = e => {
  e.preventDefault(); // click이벤트 기본동작을 중단한다.
}

// this
<button onclick="handleClick(this)">Click me</button>; //이렇게 바인딩 시에 직접 넘겨준 this는 해당 DOM 요소를 가리킨다.
function handleClick(this_argument){
  console.log(this_argument); // 이건 button 객체가 나옴
  console.log(this); // 이건 window 나옴. 왜냐? 암묵적 생성함수 안에서의 this를 의미하니깐..
}

$button.onclick = function(){ // 프로퍼티에 할당방식의 경우, 자동 this 바인딩되기때문에..
  console.log(this); // button 요소가 나온다. (그래서 화살표함수쓰면 window가 나온다.)
}

// addEventListner 방식도 똑같이 요소가 바인딩된다. (역시 화살표함수는 window를 가리킨다.)

// class에서 handler를 바인딩할 때는 this를 조심해야 한다.

class App{
  constructor() { // constructor 안의 this는 제대로 생성할 객체를 가리킨다.
    this.$button = document.querySelector('btn'); // class의 프로퍼티로 추가한다.
    this.count = 0;

    this.$button.onclick = this.increase; // 프로퍼티 방식으로 핸들러를 등록했다. 다만 이렇게 하면 increase의 this가 $button을 가리키게 된다.
    this.$button.onclick = this.increase.bind(this); // 생각한 대로 동작하게 하려면 바인딩을 해서 주도록 한다.
  }

  increase() { // prototype와 class 한번 더 확인하자..
    this.$button.textContent = ++this.count;
    // 여기서 문제가 생긴다. increase()의 this는 무엇일까? 윗줄에서 할당한 객체가 된다. 즉, $button이 된다.
    // 그래서 $button.$button 처럼 접근하게 되버려서 오류가 난다.
  }

  increase = () => this.$button.textContent = ++this.count; // 물론 이렇게 클래스 필드 + 화살표함수로 사용할 수도 있다.
  // 다만 이건 prototype 메서드가 아닌 instance 메서드가 되버린다.
}

// event handler에 인수전달
$button.onclick = () => {
  handleClick(3); // 이렇게 한번 감싸서, 인수전달한다.
  // 혹은 애초에, handler를 반환하는 함수를 만들어서 인수를 주면서 할당해도 된다.
}

// Custom Event
const keyboardEvent = new KeyboardEvent('keyup'); // type을 주면서, 기존 Event를 발생시킬 수 있다.
const customEvent = new CustomEvent('foo'); // type이 기존에 없는 type일 경우, 일반적으로 CustomEvent로 생성한다.
// 이렇게 생성된 이벤트는 bubbles와 cancelable이 false이다. 즉, 버블링되지 않고, 기본동작 취소도 할 수 없다. 만약 true로 만들고 싶다면..
const customEvent2 = new MouseEvent('foo', { // 애초에 만들 때 부터 명시적으로 지정하면서 만든다. 
  bubbles: true,
  cancelable: true,
  clientX: 50, // 심지어, 해당 Event Type에 따라 가지는 고유 프로퍼티값도 지정하면서 만들 수 있다.
  clientY: 100
});

// CustomEvent의 경우 detail 프로퍼티가 존재해서, 전달하고싶은 정보를 객체에 담아 전달할 수 있다.
new CustomEvent('foo', {
  detail: {
    message: 'Hello'
  }
});
// 새로운 타입의 이벤트를 등록할 때는 애초에 프로퍼티가 존재하지 않으니 onFoo 같은 방식으로는 할당할 수 없고, 무조건 addEventListener를 사용해야 한다.




// 이렇게 만든 커스텀 이벤트들은 전부 isTrusted가 false 이다.

$button.dispatchEvent(customEvent); // dispatchEvent. 앞서 생성한 이벤트들을 강제로 발생시킨다.



































