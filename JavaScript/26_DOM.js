/*
DOM (Document Object Model)
    - HTML 계층적 구조, 정보를 표현 + 이를 제어하는 API를 제공하는 트리 자료구조.

노드는 12가지의 종류가 있다 그중 중요한 4가지 타입을 소개한다.
    1. document node (문서노드)
        - DOM 최상위에 존재하는 root 노드
        - document를 가리킴
        - 전역객체 window.document에 바인딩되어있다.
        - DOM트리 노드들에 접근하기 위한 entry point(진입점) 역할을 한다.
    2. element node (요소노드)
        - HTML 요소를 카리킴
    3. attribute node (어트리뷰트 노드)
        - HTML요소의 어트리뷰트를 가리킴
        - 요소노드에만 연결되있다. 그러나 부모노드는 없으므로 요소의 sibling은 아니다.
            - 따라서 어트리뷰트노드에 접근하기 위해선 우선 요소노드에 접근해야 한다.
    4. text node (텍스트 노드)
        - HTML 요소의 text를 가리킨다.
        - 자식이 없는 leaf node이다. (즉, DOM의 최종단이다.)
위 4가지 외에도 Comment(주석), DocumentType(DOCTYPE), DocumentFragment 등 총 12개의 노드타입이 있다.

DOM 객체는 ECMA표준빌트인객체는 아니고, 브라우저에서 제공하는 host 객체이다.
상속구조는 다음과 같다.
    - Object
        - EventTarget
            - Node
                - Document
                    - HTMLDocument
                - Element : 브라우저가 렌더링 할 수 있는 요소.(HTML, XML, SVG)
                    - HTMLElement (요소 중 HTML요소를 표현)
                - Attr
                - CharacterData
                    - Text
                    - Comment
    - 특정 요소의 상속구조는 개발자도구의 Element - Properties에서 확인할 수 있다.
*/

// 요소노드의 취득
// 요소 취득시, 관례적으로 $name 형식으로 변수를 설정하는 듯 하다.
const $id = document.getElementById("banana");
// 요소에 id를 부여했다면, id값과 동일한 전역변수가 암묵적으로 선언되고, 해당 노드가 할당되는 부수효과가 있다.
// 즉, <div id="id"> 를 썼다면
id.textContent; // 이런식으로도 접근할 수 있다는 말.
// 다만, id 전역변수가 이미 있다면  재할당되지 않는다.

// 요소노드취득시, 여러개취득하는 메서드를 사용하면 HTMLCollection을 반환한다.(유사배열이면서 이터러블이다.)
// 모든 요소취득
const $all = document.getElementsByTagName("*"); // 이건 Document.prototype의 메서드이고, Element.prototype에도 동일 메서드가 정의되어있다.
$id.getElementsByTagName("*"); // Element.prototype의 메서드의 경우, 해당노드부터 자손들만 탐색을 시작한다.

// class로 취득
const $elems = document.getElementsByClassName('fruit apple'); // 이렇게 공백으로 여러 class 지정도 가능하다. 모두 가지고있는 요소를 반환하는 듯 하다.
// 마찬가지로 Element.prototype에도 정의되어있다.

// css 선택자로 취득
const $elemBySCCSelector = document.querySelector('.banana'); // 문법에 맞지 않으면 DOMException 발생
const $elemsBySCCSelector = document.querySelectorAll('.banana'); // 전부 반환.
// 마찬가지로, Element에도 있다.
// CSS선택자 메서드는 위 다른 메서드보다는 다소 느린걸로 알려져있다. 하지만 좀 더 일관적이고, 구체적인 조건을 사용할 수 있기 때문에
// ID 정도는 getElementByID써주고, 나머지는 걍 qs 사용을 권장한다.

// 특정요소 취득가능여부 확인 (matches)
const $apple = document.querySelector('.apple');
console.log($apple.matches('#fruits > li.apple')); // true. 해당 css query로 얻을 수 있다.
// matches는 이벤트 위임에 유용하다. 나중에 살펴보자.

// HTMLCollection, NodeList
// 유사배열이면서 이터러블이다. 중요한 특징은, 노드 상태변화를 실시간으로 반영하는 live(살아있는) 객체이다.
// HTMLCollection은 항상 live이고, NodeList는 대부분 non-live이나, 경우에 따라 live로 동작한다.

//HTMLCollection
// getElemBy Class, TagName 이 반환하는 객체.
// 항상 live라는게 구체적으로 어떤 의미일까? collection 자체가 실시간 갱신된다는 뜻이다. 아래 예시를 보자.
const $reds = document.getElementsByClassName('red'); // 요소가 3개 담긴 HTMLCollection이 반환되었다 치자.

for(let i = 0; i < $reds.length; i++){
    $reds[i].className = 'blue'; // class를 변경했다.
}
// 위 예제를 실행하면 3개 전부 파란색으로 바뀔 것이다. 하지만 그렇지 않다. 왜? 인덱스로 접근하고 있는데, HTMLCollection은 반복문마다 실시간으로 업데이트되기 때문이다.
// 즉, i = 0에서 class가 blue로 바뀐 elem은 즉시 제거되므로 length가 바로 2가 되어버린다. 주의해야한다.
// 이 문제는 for문을 역순으로 돌리거나, while을 사용해서 회피할 수 있다.
// 더 좋은 방법은 HTMLCollection 자체를 사용하지 않는 것이다. (스프레드 하거나.. 걍 qs를 쓰거나..)

console.log($reds.length); // class만 바꿨을 뿐인데, 요소개수가 1개로 줄었다.

// NodeList
// HTMLCollection의 부작용을 방지하기 위한 non-live 객체이다. qs 사용시 반환된다.
$elemsBySCCSelector.forEach(); // forEach를 구현해놔서 사용할 수 있다.
$apple.childNodes; // 다만, childNodes로 얻은 NodeList는 부모자식 관계가 변하면 live로 즉시반영되므로 for문 등에서 주의한다.


// 결론 : 실수하기 쉬운 HTMLCollection이나 NodeList 대신 배열로 바꿔 사용하자.

// 노드 탐색
$apple.parentNode; $apple.previousSibling; $apple.firstChild; $apple.childNodes; // Node의 properties다.
$apple.firstElementChild; $apple.previousElementSibling; $apple.nextElementSibling; $apple.children; // Element의 properties다. 특징은 children 말고는 Element가 붙는다.
// 탐색 프로퍼티는 모두 getter만 있는 읽기전용 접근자 프로퍼티이다. 따라서 바인딩을 수정할 수는 없다.

// 공백 텍스트노드
// 태그 사이사이의 공백, 줄바꿈 등은 사실 공백텍스트노드를 생성한다. 예컨데,
<ul>
    <li></li>
</ul>
// 이런 태그가 있다면, ul과 li 사이에 줄바꿈이 있으므로 공백텍스트노드가 들어가있다.
// 따라서 노드 탐색 시 공백텍스트노드를 주의해야 한다.
// Node의 자식탐색의 경우 Node는 확실히 포괄적인 개념이니, 공백 텍스트노드를 포함한다.
// Element는 요소만 포함한다. 따라서 childNodes대신 children을 쓰면 텍스트노드는 포함되지 않는다. 다만 children은 NodeList대신 HTMLCollection을 반환한다.

// 자식유무확인
$apple.hasChildNodes(); // 공백 텍스트노드를 포함한다. 즉,
<ul>
</ul> // 이렇게 한줄 띄운 노드에는 true로 잡혀버린다.
// 이걸 원치 않는다면 역시, Element의 메서드인 childElementCount 프로퍼티 혹은 children.length 를 쓰면 된다.
$apple.childElementCount;
$apple.children.length; // children은 공백 텍스트노드를 포함하지 않는다.

// 요소노드의 텍스트노드 탐색
$apple.firstChild; // 첫번째 자식이 textNode이다. 근데 차라리 textContent로 접근하는 것이 더 좋지 않을까..

// parentNode의 경우 textNode인 경우는 없다. textNode는 leafNode이기 때문이다.

// 노드정보 취득
$apple.nodeType; // NodeType은 상수를 반환한다.
Node.ELEMENT_NODE; // 1
Node.TEXT_NODE; // 3
Node.DOCUMENT_NODE; // 9

$apple.nodeName; // nodeName은 Element Node의 경우 대문자 문자열로 tag 이름을 반환한다. 예를들어 "UL", "LI" 같이..
// TextNode는 "#text" 라는 문자열을 반환한다.
// Document Node는 "#document" 라는 문자열을 반환한다.

// 요소노드의 text 조작
// nodeValue
$apple.nodeValue; // textNode일 경우 text를 반환한다. textNode가 아닐경우 null을 반환한다.
// 위의 경우, $apple은 textNode가 아니기에 null을 반환한다.
$apple.firstChild.nodeValue = "Hi"; // textNode일 경우 값에 접근할 수 있다.

// textContent
// 해당 요소 뿐만 아니라, 모든 자손들의 text까지 전부 취득, 변경한다. 예를들어
<div id='foo'>
    Hello
    <span>
        World!
    </span>
</div>;
$foo.textContent; // Hello World! 를 반환하는 것이다!
// 만약 자식이 textNode밖에 없다면 nodeValue보다 코드가 더 간단하다. 다만 확실히 장단이 있는 듯.

// 자손이 있는데 textContent에 할당해버리면 어떻게 될까? 모든 자식노드가 제거되고 해당 문자열만 남는다. 이떄 파싱되지 않는다. 즉,
$foo.textContent = "Hi! <span>there!</span>"; // 할당하면
<div id='foo'>
    ~~~저 문자열 전체 (tag로 파싱되지 않음)
</div>; // 이렇게 모든 자손이 사라지고 text만 남는다.

// innerHTML은 사용하지 않는 것이 좋다.
//   - 1. CSS에 순종적이다. 예를들어 visibility: hidden 인 요소노드의 텍스트는 반환하지 않는다.
//   - 2. CSS를 고려하기 때문에 textContent보다 느리다.

// DOM 조작 (DOM manipulation)
// innerHTML
$apple.innerHTML = "<div>Hi!</div>"; // 모든 자손이 제거되고 대입한 문자열이 tag 까지 파싱되어 완전히 대체된다.
// 사용자 입력데이터를 그대로 innerHTML에 할당하면 XSS에 취약하다. 물론 HTML5에서는 innerHTML로 삽입된 script 태그는 실행하지 않는다. 하지만<img src="x" onerror="alert(~~)"> 같은
// 코드는 동작한다.

// *TMI : HTML sanitization (살균)
// XSS를 예방하기 위해 잠재적 위험을 제거하는 기능. DOMPurify 라이브러리가 유서깊다. DOMPurify.sanitize('<img src="x" onerror="alert(~~)">'); -> <img src="x"> 같이 바뀐다.

// insertAdjacentHTML
// innerHTML의 특화버전.. 요소 삽입 위치를 지정할 수 있다. 요소 위치는 다음과 같다.

// beforebegin
<div>
    {/* afterbegin */}
    text
    {/* beforeend */}
</div>
// afterend

$apple.insertAdjacentHTML('beforebegin', '<p>hi~~</p>'); // 이렇게 자동파싱된다.
// 자식을 놔둔채로 필요한 곳에만 넣기때문에 innerHTML보다 효율적이다. XSS에 취약한 건 동일하다.

// 노드 생성과 추가
const $li = document.createElement('li');
const textNode = document.createTextNode('Banana'); // but, 아무것도 없는 노드에 text 추가 시 걍 textContent 이용하면 된다.
$li.appendChild(textNode);
$apple.appendChild($li); // 여기서 DOM과 연결되므로, 이때 리랜더링된다.

// 여러 노드 한번에 추가
const $container = document.createDocumentFragment(); // Fragment는 별도의 Sub DOM을 구성하여, 기존 DOM에 추가하기 위한 용도로 사용된다.
$container.appendChild($li); $container.appendChild($li); $container.appendChild($li);
$apple.appendChild($container); // 추가되면서 Fragment Node는 사라진다.

// 노드삽입
// appendChild()는 항상 마지막노드로 추가한다. 위치를 지정할 수 없다. 아래는 위치지정 메서드이다.
$apple.insertBefore($li, $apple.lastElementChild); // a 노드를 b노드 앞에 삽입한다.
// 이때 두번째 인수는 반드시 호출 Node의 자식이어야 한다. 그렇지 않으면 DOMExeption 발생한다.
// 두번째 인수가 null 이면 appendChild 처럼 마지막에 넣는다.

// 노드 이동
// DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore로 다시 추가하면 그 위치로 이동한다.
const [ $getLi1, $getLi2, ] = $apple.children; // 이런식으로 순서를 활용해서 뽑아낸다...

// 노드 복사
$apple.cloneNode(); // 얕은복사 -> 노드 자기자신만 복사 (그래서 textNode도 없다.)
$apple.cloneNode(true); // 깊은복사 -> 모든 자손들까지 복사

// 노드 교체
$apple.replaceChild($newChild, $apple.firstElementChild);

// 노드 삭제
$apple.removeChild($apple.lastElementChild);

