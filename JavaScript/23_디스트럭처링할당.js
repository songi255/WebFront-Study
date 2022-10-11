// 변수에 "할당"하는 방법이다. 이터러블 혹은 객체에만 사용할 수 있다.

// 배열의 할당
const arr = [1, 2, 3];
const [one, two, three] = arr; // const 변수 one, two, three가 생성되고, 배열의 경우 인덱스 순서대로 할당된다.
// 선언과 할당을 분리해도 되긴 하다만, const를 못쓴다.
let x, y;
[x, y] = arr; // 개수가 반드시 일치할 필요는 없다. 변수가 부족하면 뒷인덱스는 걍 무시되고, 변수가 많으면 undefined가 할당된다.

[x = 999, y, z, w = 4] = arr; // 기본값을 줄 수 있다. 다만, 할당하는 값이 더 우선된다. 이 경우 [1, 2, 3, 4]가 할당된다.

const [, second, third] = arr; // 원하는 요소만 골라서 추출하는 데에도 사용한다.

[x, ...y] = arr; // ...rest를 사용할 수 있다. y에는 [2, 3]이 담긴다.

// 객체의 할당
const user = { firstName: 'Hj', lastName: 'sin' };
const { lastName, firstName } = user; // 순서는 의미가 없다. key가 같으면 할당된다. 객체를 제공하지 않으면 Error가 발생한다.
// 위의 표현은 프로퍼티 축약표현이다 (key와 value가 이름이 같으면 하나만 적는 것.) 그래서 실제로는 아래와 같다.
//const { lastName: lastName, firstName: firstName } = user;
// 즉, value 변수의 이름이 실제 사용할 변수이름이다. 그래서 다른 이름으로 사용하고 싶으면 아래와 같이 온전한 표현으로 적어준다.
const { lastName: ln = "Ungmo", firstName: fn } = user; // ln, fn 처럼 내가 지정한 변수이름으로 들어갔다! 
// 위 처럼 마찬가지로 기본값 줄 수 있다.

//역시, 원하는 property만 추출할 때 유용하다.

// 객체를 매개변수로 받는 함수에도 사용할 수 있다.(진짜 ㄹㅇ 개쩐다..)
function printFirstName( { firstName } ){ // 받을 때부터 디스트럭처링했다!!!
    console.log(`이름은 ${firstName}`);
}
printFirstName(user);


// 위 배열할당과 객체할당은 혼용할 수 있다.
const todos = [
    {id: 1, content: 'HTML', completed: true},
    {id: 2, content: 'CSS', completed: false},
    {id: 3, content: 'JS', completed: true}
]

const [, { id }] = todos;

// 중첩객체도 생각하는대로 사용가능하다.
const userNested = {
    address: {
        zipCode: '03068',
        city: 'Seoul'
    }
}
const { address: {city} } = userNested;

//rest도 사용가능. 객체가 된다. 이건 걍 생략한다.



