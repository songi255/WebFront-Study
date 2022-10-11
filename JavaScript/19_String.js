const strObj = new String(); // [[StringData]] 에 값을 저장한 wrapper 객체를 생성한다.
// 마찬가지로 출력시 [[PrimitiveValue]] 슬롯으로 뜨는데, ES5 이하에서는 그렇게 불렀기 때문이다.

// 유사배열객체이면서 이터러블이다. 즉, length와 index를 갖는다.

// 원시값이므로 변경할 수 없다. (읽기전용임)
"hello!"[0] = "N"; // 될것같지만 불가능하다. 에러는 발생하지 않는다.

// 문자열외의 값으로 생성시 강제변환한다.
new String(null) // "n", "u", "l", "l"

// new 없이 호출하면 wrapper가 아닌 문자열을 반환한다. 이를 이용해서 명시적 타입변환 가능하다.
String(1);

//메서드. 원시값이라 변경불가능해서 accessor method는 존재하지 않고, 항상 새 객체를 반환한다.!!!!!!!!!!!!!
const str = "abcde";
str.indexOf("cd"); // 없으면 -1
str.indexOf("cd", 1); // 1번부터 검색시작

str.search(/[bcd]/); // 정규표현식 검색. 없으면 -1

str.includes("ab");
str.includes("ab", 2); // 검색시작 인덱스

str.startsWith("Hi"); // 해당 문자열로 시작하는지?
str.startsWith("Hi", 2); // 검색시작인덱스

str.endsWith("li");
str.endsWith("li", 5); // 처음부터 5자리까지만 잘라서 확인

str.charAt(2); // 범위를 벗어나면 ""를 반환
// charCodeAt과 codePointAt 도 있다. 차이는 굳이 궁금하지 않다..

str.substring(from);
str.substring(from, to); // to는 미포함.
// 1. from > to 면 교환한다.
// 2. 음수거나 NaN인 경우 0으로 취급한다.
// 3. length 넘어가면 length로 취급한다.

str.slice(from, to); // substring과 똑같다. 다른점은 음수이면 뒷 인덱스부터 계산하는 방식으로 작동한다.

str.toUpperCase();
str.toLowerCase();

str.trim(); // 앞뒤 공백만 제거
str.trimStart();
str.trimEnd();

str.repeat(3);
// 0이면 "" 반환
// 음수면 RangeError 발생
// 생략시 기본값 0;

str.replace("ab", "cd"); // 문자열 -> 문자열 변환 (첫번째 검색된 내용만 변경)
str.replace(/ab/, "cd"); // 정규표현식 사용가능
str.replace("ab", "<strong>$&</strong>"); // 특수한 치환패턴을 사용할 수 있다. 예를들어 $&는 검색된 문자열을 의미한다. 교체패턴에 대한 자세한 내용은 docs 참고하라!
str.replace(/.[A-Z]/g, matched => { // 치환함수를 전달할 수도 있다. 매칭된 문자열에 대해서 시행한다. 아래 예시는 Camel -> snake case로 바꾸는 예시이다.
    console.log(matched); // oW
    return matched[0] + '_' + matched[1].toLowerCase();
});

str.split(' ');
str.split(/\s/); // 정규표현식도 사용가능
str.split(''); // 빈문자열 전달 시, 한글자 한글자 전부 잘라서 반환
str.split(); // 인수 생략시, ["str"] 형태로, 자르지 않은 전체문자열을 배열에 담아서 반환

str.split(' ', 3); // 두번째 인수로 배열의 길이 전달가능. "how are you doing" -> ["how", "are", "you"] 가 된다. 즉, 개수를 넘어서면 잘린다.
str.split('').reverse().join(''); // 응용. 배열을 반환하는 특성을 이용해서 문자열을 역순으로 뒤집을 수 있다.

