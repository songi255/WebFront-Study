//formal language (형식언어). JS는 Perl의 정규표현식문법을 ES3부터 도입했다.
// 일반적으로 리터럴로 사용한다.
const target = "Is this all there is?";
const regexp = /is/i;
regexp.test(target);

// 생성자 사용
new RegExp(/ls/i); // 왜 굳이 이렇게 쓸까?

//메서드
regexp.exec(target); // 매칭결과를 배열로 반환. 없는경우 null. 예시) ["is", index: 5, input: "Is~~", groups: undefined]
// exec()는 플래그가 g여도 첫번째 결과만 반환하므로 주의하자.

const boolResult = regexp.test(target); // bool 값으로 반환

target.match(/is/ig); // String.prototype.match. regex를 받는다. 매칭결과를 리턴한다.
// exec()와 달리, 매칭결과가 여러개면 전부 반환한다. (이거쓰는게 낫겠네..)

//플래그
/*  i - ignore case
    g - global : 매칭되는 모든 문자열 검색
    m - multi line : 문자열 행이 바뀌더라고 검색 계속한다.
    위 3가지가 중요한 패턴이다. (u, y 등도 있는데 크게 쓰지는 않는듯.) 플래그는 여러개를 동시 적용가능하다.
*/

// 패턴
/.../; // .은 한글자 의미. 해당 패턴은 3글자 찾음. (앞에서 부터 tokening 되는 듯?)
/A{1,2}/; // 앞에 나온 패턴의 반복설정. {n,m}이면 최소 n ~ m번을 의미. n,m 콤마 사이에 공백이 있으면 ({n, m}처럼..) 동작안한다.
/A{2}/; // 아예 n번 반복한다고 못박는다.
/A{2,}/; // 2번이상
/A+/; // 앞선 패턴 1번이상 반복. 즉, {1,}과 같다.
/colou?r/; // 앞선 패턴이 있거나 없거나. 즉, {0,1}과 같다. 이번경우, color과 colour 둘 다 검색된다.
/A|B/; // A or B
/[AB]+/; // 범위. 이 경우는 A or B의 다른 표현.
/[A-Z]+/; // A ~ Z 사이의 알파벳
/[A-Za-z]/; // ㅇㅇ
/[\d]/; // \d는 숫자를 의미. 즉, [0-9]와 같음.
/[\D]/; // 숫자가 아닌 모든 문자. 즉 \d의 반대
/[\w]/; // [A-Za-z0-9_] 언더바 포함 일반 문자 의미.\W는 반대 
/[\s]/; // t, r, n, v, f 등 여러가지의 공백문자를 의미.
/[^A-Za-z0-9_]/; //not. []안에 쓰일때만 not으로 동작한다. 뒤에 있는 모든 것을 포함시켜 반전시킨다. 예제의 경우 \W와 일치한다.
/^https/; // []밖의 ^는 해당 패턴으로 시작함을 의미한다.
/com$/; // 해당 패턴으로 끝남을 의미


// 자주 사용하는 정규표현식
/^https?:\/\//; // http:// 혹은 https:// 로 시작하는가?
/^(http|https):\/\//; // 동일
/^\d+$/; // 숫자로만 이뤄졌는가?
// 이외 생략.
target.replace(/[^A-Za-z0-9]/gi, '');