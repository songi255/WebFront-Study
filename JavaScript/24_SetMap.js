const set = new Set(); // set 생성
const setByIterable = new Set([1, 2, 3, 4]); // 이터러블을 주면서 생성할 수 있다.

console.log(set.size); // size 프로퍼티 확인 (setter 없는 getter만 있는 접근자 프로퍼티이다. -즉, size를 임의로 조정할 수 없다.)

set.add(1); // 요소 추가. 
set.add(2).add(3).add(4); // 추가된 Set을 반환하기 때문에, 연속적으로 호출할 수 있다.

set.add(NaN).add(NaN); // NaN === NaN은 false가 나오지만, set에서는 true로 보고 추가하지 않는다. -0과 +0도 마찬가지이다.

set.add({}); // 어떤 값이든 넣을 수 있다.

set.has(3); // set이 가지고 있는지?

const success = set.delete(3); // 요소삭제. 성공여부 반환. bool 반환이라 체이닝은 불가능.

set.clear(); // 모두 삭제. undefined 반환.

//set을 활용한 중복요소 제거
[...new Set([1, 2, 3, 2])]; // 존나 fancy하다.


// 순회
set.forEach((v1, v2, set) => {console.log(v1, v2, set)}); // v1, v2는 같은 값으로, 순회하는 요소이다. set은 this. 즉 자기자신이다.
// 이렇게 똑같은 값을 2번 넘기는 이유는 Array의 forEach와 인터페이스를 통일하기 위함이고, 다른 의미는 없다. (Array에서는 2번째요소가 index를 주지만 여긴 그게 없으니.)

// Set은 이터러블이기 때문에, for...of, 디스트럭처링할당, 스프레드문법 모두 사용가능하다.
// 요소 순서에 의미는 없지만, 추가된 순서를 따른다. (사양에 규정되있지는 않지만, 다른 이터러블의 순회와 호환성을 가지기 위함)
for(const value of set){} //for...of
[...set];// 스프레드
const [a, ...rest] = set; // 디스트럭처링 할당

// 집합연산
// set은 수학적 집합을 구현하기 위한 자료구조이다. 집합연산 프로토타입메서드를 구현해보자.
Set.prototype.intersection = function (set) { // 교집합
    return new Set([...this].filter(v => set.has(v)));
}

Set.prototype.union = function (set) { // 합집합
    return new Set([...this, ...set]);
}

Set.prototype.difference = function (set) { // 차집합
    return new Set([...this].filter(v => !set.has(v)));
}

Set.prototype.isSuperset = function (subset) { // 부분집합
    return [...subset].every(v => this.has(v)); // 안될수도.. ㅋㅋ
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Map
// key에는 모든 값이 들어갈 수 있으며, 이터러블이며 size로 크기를 볼 수 있는것이 객체와 다르다.
const map = new Map();
const mapWithValue = new Map( [['key1', 'value1'], ['key2', 'value2']] ); // set과 마찬가지로 이터러블로 초기화할 수 있다. 단, 모든 요소가 key-value 배열이어야 한다.
const tempMap = new Map([1, 2]); // 이건 안된다는 말이다. 요소가 1, 2인데, 이 각각은 kv쌍 배열이 아니니.. 쓰러면 [[1, 2]] 이런식으로 써야될 것..
//key가 중복되면 덧씌운다.

map.size; // size 확인

map.set('key1', 'value1').set('key2', 'value2'); // 요소추가. 마찬가지로 체이닝 가능
//NaN, +0 -0 처리도 set과 같음.

map.get('key1'); // value get

map.has('key1');

map.delete('key1');

map.clear();

// 요소 순회
map.forEach((v, k, map) => console.log(v, k, map)); // k v 가 아니라 v k 순서임에 주의
for(const entry of map){ // for...of는 entry 단위로 뽑아낸다.
    console.log(entry);
}

console.log([...map]); // 스프레드. 역시 entry 단위.
const [entry1, entry2] = map; // 디스트럭처링 할당

// 마찬가지로 요소 추가된 순서대로 순회한다.

// 이터러블이면서 이터레이터인 객체를 만들 수 있다.
map.keys();
map.values();
map.entries(); // 모두 이터러블이면서 이터레이터를 반환한다.

