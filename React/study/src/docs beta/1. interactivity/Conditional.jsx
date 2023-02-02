/* 조건부 랜더링의 여러가지 방법
    - if () return {jsx..} else return {jsx} 꼴 component
        - 아무것도 안보여주려면 return null
    - {condition ? A : B} 꼴 jsx 사용
    - 변수에 if 로 jsx 할당 후 사용
    - {condition && A} 단축평가 사용

    논리는 최대한 rendering 에서 처리하도록하자 (순수함수로 만들자)
        - 더이상 안되는 부분부터 useEffect 등 사용하는 것이다.
*/
