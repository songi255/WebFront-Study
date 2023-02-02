// 한 파일에 하나만 있어야하는게 아니다.
//   - 크기가 작거나
//   - 밀접하게 연관되어있다면
// 한 파일안에 관리하면 편한점이 많다. 예를들어, Card 와 Items 같은..

// prop 전달 시 {} 꼭 붙여주자. 디스터럭쳐링으로 받겠다는 뜻이다.
function Person({ name, age }) {}

// 외부에서 전달 시 destructuring 예시.
const person = { name: "john", age: 18 };
<Person {...person} />;
