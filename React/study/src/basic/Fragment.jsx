//Fragment
function ListItem({ item }) {
    return ( //자식을 묶기만 하는 용도로 사용할 떄 임시적으로 쓰는 태그. <>로 줄여쓸 수도 있다.
      //<Fragment></Fragment>. 유일하게 key만 줄 수 있다. 근데 key를 어디쓸까...
      <>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </>
    );
  }