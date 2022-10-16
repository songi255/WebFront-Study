// Timer는 ECMAScript 사양은 아니지만, 브라우저와 Node 둘 다 구현해 놓은 Host 객체이다.
// JS 엔진은 싱글스레드이기 때문에 asynchronous 방식으로 동작한다.

const timerId = setTimeout(() => { // 1번만 실행된다.
  // delay 후에 즉시 실행은 보장되지 않는다. task queue에 callback 을 등록하는 시간을 지연할 뿐이다.
}, timeout_ms, // 생략시 기본값 0. delay가 4ms 이하인 경우 최소지연시간 4ms 로 지정된다.
"arg"); // callback에 전달할 인수도 설정할 수 있다. 지금 여기선 필요없다. 인자 안받는 화살표함수니깐..
// 참고로 param은 여러개 전달가능하다.
setTimeout('console.log("hello?")', 3000); // 이렇게 문자열로 줘서 eval처럼 쓸 수도 있으나 권장하지는 않는다.

clearTimeout(timerId); // set에서 반환한 Id로 취소할 수 있다. Node에서는 객체를 반환한다.


setInterval(() => {
  
}, interval); // 다른 점은, 취소할 때 까지 계속 반복한다는 것이다.

// debounce & throttle
// scroll, resize 등등.. 짧은 시간간격으로 연속발생하는 이벤트들은 과도하게 호출되어 성능에 문제를 줄 수 있다.
// 디바운스와 스로틀은 이런 이벤트발생을 grouping 해서 과한 호출을 방지하는 프로그래밍 기법이다.

const debounce = (callback, delay) => {
  let timerId; // 역시 closure를 사용했다.
  return event => { // setTimer에 넣을 callback용 함수를 반환한다. 즉, decorate 한다.
    if (timerId) clearTimeout(timerId); // delay내에 이미 호출된 이벤트는 지워버린다.
    timerId = setTimeout(callback, delay, event); // 마지막 호출된 핸들러 하나만 최종적으로 실행
  };
}; // 얘는 어디에 쓸까?
// - input tag로 AJAX
// - resize
// - 버튼 중복클릭 방지 등등..
// 위 예시는 간략하게 구현하여 완전하지 않다. 실무에서는 Underscore나 Loadash의 debounce함수를 사용할 것을 권장한다.

const throttle = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) return; // 첫번째 핸들만 실행하고, 그 이후는 실행하지 않는다.
    timerId = setTimeout(() => {
      callback(event);
      timerId = null; // handler가 실행되어야 비로소 timerId가 초기화된다. 즉, 그 사이(delay)에는 Timer를 등록하지 못한다.
    }, delay, event);
  };
};
// - scroll 처리
// - 무한스크롤 UI 구현 등에 유용하게 사용
// 역시 실무에서는 Underscore 혹은 Lodash의 throttle 함수를 사용하자.

$button.addEventListener('click', throttle(() => {}, 500)); // 용례.

