// 잠재적 문제를 알아내기 위한 도구. 개발모드에만 활성화된다.

<React.StrictMode>
    <div>
        <ComponentOne />
        <ComponentTwo />
    </div>
</React.StrictMode>;
// app 어디서든 이렇게 활성화 할 수 있다.

///////////////////////////////////////////// 사용처 ////////////////////////////////////////////////////

// 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
//  -> 특정 생명주기 메서드들은 안전하지 않은데, 서드파티에서 사용하는 지 확인할 수 있다.

// 레거시 문자열 ref 사용에 대한 경고
//   -> ref 에 문자열로 사용하는 건 createRef 덕에 이제 필요없어서, 쓰면 경고

// 권장되지 않는 findDOMNode 사용에 대한 경고
//   -> 레거시 기능. ref 로 대체되었다.

// 예상치 못한 부작용 검사
//   개념적으로 react 는 2단계로 작동한다.
//     1. rendering 단계 : 특정 환경(DOM과 같이)에 어떤 변화가 필요한 지 결정하는 단계. render()를 이전 렌더와 비교한다.
//     2. commit 단계 :  변경 사항 반영(DOM 노드 추가, 변경, 제거). 생명주기 메서드를 호출하게 된다.

//   commit 은 일반적으로 매우 빠르나 rendering 은 느릴 수 있다.
//   곧 추가될 concurrent 모드는 렌더링을 더 작은 단위로 나누고, 작업을 중지했다 재개하는 방식으로 브라우저가 멈추는 것을 피한다.

/*   즉, rendering 단계의 생명주기 메서드를 여러 번 호출하거나 아예 커밋을 안할수도 있다.(에러 혹은 우선순위에 따른 작업 중단)
   - constructor()
   - componentWillMount()
   - componentWillReceiveProps()
   - componentWillUpdate()
   - getDerivedStateFromProps()
   - shouldComponentUpdate()
   - render()
   - setState() 업데이트 함수 (첫 번째 인자)
*/

// strict mode 에서 모두 감지할 수는 없지만, 아래 함수들을 의도적으로 2번씩 호출해서 더 확인이 쉽게 한다.
//  - class component : constructor, render, shouldComponentUpdate, getDerivedStateFromProps static 메서드
//  - functional component : body
//  - State updater 함수 (setState의 첫 번째 인자)
//  - useState, useMemo, useReducer의 callback

// react 17에서는 console.log 는 2번 출력 안되도록 억제하지만, 18에선 그냥 출력해준다.(react dev tools 설치 시 두번째 건 흐리게 표시됨)



// 레거시 context API 검사


// Ensuring reusable state
// 앞으로는, 상태를 유지하면서 UI 섹션을 추가하고 제거할 수 있는 기능을 추가할 예정.
// 예를 들어, 탭 전환했다가 돌아오면 즉시 이전 화면을 표시할 수 있도록..
// 이를 위해 React는 마운트 해제 전에 사용된 것과 동일한 구성 요소 상태를 사용하여 트리 다시 마운트를 지원합니다.
//   -> 여러 번 마운트 및 파괴되는 효과에 대해 구성 요소가 탄력적이어야 한다.
//      -> 일부 효과는 destroy 콜백에서 구독을 제대로 정리하지 않거나 암시적으로 한 번만 탑재 또는 파괴된다고 가정한다.

// 본래는 다음과 같은 과정을 거친다.
// * React mounts the component.
//   * Layout effects are created.
//   * Effects are created.

// strict mode 에선 다음과 같다.
// * React mounts the component.
//     * Layout effects are created.
//     * Effect effects are created.
// * React simulates effects being destroyed on a mounted component.
//     * Layout effects are destroyed.
//     * Effects are destroyed.
// * React simulates effects being re-created on a mounted component.
//     * Layout effects are created
//     * Effect setup code runs

// 즉, 한번 전부 mount 해재했다가 재조립해서 상태를 복원해본다.
/*
    - componentDidMount
    - componentWillUnmount
    - useEffect
    - useLayoutEffect
    - useInsertionEffect
*/



