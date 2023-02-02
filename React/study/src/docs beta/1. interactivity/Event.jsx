function Button({ onClick, children }) {
  // onClick 논리를 props 로 받아서, Button 별 확장이 가능한 기반을 만들었다.
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // 상위요소로 전파 중지.
        // 알다시피 이벤트는 내려갔다 올라오는데, route logging 등 특정상황에서, 내려갈때 일단 잡는거는 Capture 다. onClickCapture 같은 속성에 적용된다.
        e.preventDefault(); // 참고로 이건 form 의 submit 등에 기본동작을 끄는 것.
        onClick(); // 핸들러의 실행은 수동이다.
      }}
    >
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div
      className="Toolbar"
      onClick={() => {
        alert("You clicked on the toolbar!");
      }}
    >
      <Button onClick={() => alert("Playing!")}>Play Movie</Button>
      <Button onClick={() => alert("Uploading!")}>Upload Image</Button>
    </div>
  );
}
