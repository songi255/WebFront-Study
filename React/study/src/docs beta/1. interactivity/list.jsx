// 받은 data 를 filtering 하여 listing 하는 좋은 예시.

export default function List() {
  // 먼저 data 를 filtering 하는 모습.
  const chemists = people.filter((person) => person.profession === "chemist");

  // map 을 사용해서, data string -> jsx 로 바꾼다.
  const listItems = chemists.map((person) => (
    // 아래에서처럼, 배열을 그대로 때려박기 위해서는 string & number 인 key 가 꼭 필요하다.
    // 배열항목이 이동, 삽입, 삭제 될때 랜더링을 위해서 꼭 필요하기 때문이다...
    // local 에서 유지되는 memo app 같은 경우... crypto.randomUUID() 같은 걸 사용해서 key 를 구할 수도 있다.

    // index 를 key 로 사용할 경우 (사실 key 가 없을떄 기본값임) 배열 순서나 내용 변하면 rendering 순서가 변하고, 종종 미묘하고 혼란스러운 버그가 나온다.
    // index 를 Math.random() 등으로 즉석생성 금지! 랜더링마다 key 가 달라져 모두 재생성된다.

    // props 로 자동으로 넘어가진 않으므로, 필요하다면 다른 이름으로 추가로 넘겨주어야 한다.
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {" " + person.profession + " "}
        known for {person.accomplishment}
      </p>
    </li>
  ));

  // ul 사이에 li 배열을 그대로 떄려박는다.
  return <ul>{listItems}</ul>;
}

// key 사용은 유연해야 한다. index 사용은 금하라 했지만, 만약에 시 구절을 그대로 출력하는 경우, 변하지 않으므로 걍 index 써도 되는 몇안되는 상황이다.
