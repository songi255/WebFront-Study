// 재조정. diffing(비교) 알고리즘에 대한 설명이다.
// 원래 트리 변환 알고리즘은 O(n^3) 이다. 근데 React 는 두가지 가정을 통해 O(n) 의 휴리스틱 알고리즘을 사용한다.
//   1. 서로 다른 타입의 두 엘리먼트는 서로 다른 트리를 만들어낸다.
//   2. 개발자가 key prop을 통해, 어떤 자식 엘리먼트가 변경되지 않아야 할지 표시해 줄 수 있다.
// 실제로 거의 모든 사용 사례에서 이 가정들은 들어맞습니다.


// 비교 알고리즘
// 두개의 tree 를 비교할 때 root 부터 비교하는데, 여기서 갈린다.
// 1. 두 엘리먼트 타입이 다를 경우

<div>
  <Counter />
</div>;

<span>
  <Counter />
</span>;

// 예를 들어 이렇게 바뀌면 Counter 는 파괴된다.
// UNSAFE_componentWillMount(), componentWillUnmount() 후 새 DOM 삽입, componentDidMount() 실행


// 2. 두 엘리먼트 타입이 같은 경우
<div className="before" title="stuff" />;
<div className="after" title="stuff" />;
// 속성만 변경

<div style={{color: 'red', fontWeight: 'bold'}} />;
<div style={{color: 'green', fontWeight: 'bold'}} />;
// style 의 경우 안쪽까지 확인해서 변경사항만 변경

// UNSAFE_componentWillReceiveProps(), UNSAFE_componentWillUpdate(), componentDidUpdate 만 호출된다.
// state는 유지되고, props 만 업데이트된다.

// UNSAFE 붙은 애들은 전부 레거시이므로 사용하지 말것.



// key 를 통한 재랜더링 방지
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>;

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>;
// 이렇게 key 를 주면 key 로 비교해서 위치만 이동시킨다. (형제 사이에만 중복안되면 됨)

<li key={item.id}>{item.name}</li>;
// 일반적으로 이렇게 key 로 사용할 값이 있을 것이므로 큰 문제는 없다.
// 그렇지 않다면 id 값 주거나, 데이터 일부에 hash 적용할 수 있다.
// index 를 주지는 말것! 순서가 바뀌면 성능 감소한다.



