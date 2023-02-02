/* 상태관리
    예를 들어, question - textArea - submit 형식의 form 이 있다고 치자.
        - textArea 와 submit 의 disable 여부 등이 입력상태에 따라 바뀔것이다.

    이럴 때 어떤식으로 상태를 식별하고 관리할 수 있을까?

    1. status 에 따른 rendering 부터 생각하자.
        - status 는 ['empty', 'typing', 'submitting', 'success', 'error'] 같이 정할 수 있다.
        
        - 이런식으로 status 가 여러가지라면, map 을 이용해서 한 page 에 각 state 모습을 모두 보여주는 것이 큰 도움이 된다.

    2. transition trigger 를 식별하자.
        - 입력, 네트워크 응답 등.
        - 상태전이 그래프를 먼저 그려보면 실수를 줄일 수 있다.

    3. useState 를 사용해서 memory 에 나타내기
        - 처음엔 완벽하지 않아도 된다. 예를 들어 위의 5 상태는 answer, error, submitting 3가지로 나타낼 수 있지만, 처음에는 5상태를 모두 useState 해도 상관은 없다.

    4. useState 최적화 - 묶을 수 있는 정보는 묶어서 최소화한다.

    5. handler 연결하여 state 조작.

    
    상태 설계
        - 여러 변수가 함께 변경된다면 Group 하라 (혹은 사용자 지정 field 등, 얼마나 많은 state 가 필요한 지 모를 때.)
            - x, y 는 각각 쓰지말고, position={x: 0, y: 0} 으로 쓰라는 말.
        - 상태 모순 피하기
            - isSent 와 isSending 2개를 쓴다면, 모순상태가 존재한다. 이럴경우 걍 status 라고 통합하고, 'typing' 등의 값을 집어넣어 처리하는 것이 낫다.
        - 기존데이터로 계산가능한가? 상태끼리 중복되지는 않는가?
        - 깊은 구조를 피하라
            - Flatten 예시는 다음과 같다.
                - 각 행을 전부 flatten 한 후, 각 행의 childIds 속성에 하위항목들의 id 를 배열로 저장하는 식이다. (개깔끔..)


    상태 유지
        - React DOM 내에서의 위치를 기반으로 기술한다.
        - 해당 위치의 요소가 "제거 / 다른요소로 교체" 된다면, state 는 삭제된다. (걍 DOM 에서 지워진다.)
        - 동일위치에 "동일요소"일 경우 state 는 유지된다.
            - 예를 들어, {bool ? <Counter true/> : <Counter false />} 를 보자.
                - props 도 다르고, 따로 적혀져있어, 완전 새걸로 교체될 것 같지만, 실제로는 값만 바뀐다.
                    - 즉, Counter 내에 정의한 state 가 유지된다.
            - jsx 의 위치는 중요하지않다. DOM 내에서의 위치만 중요하다.
                - 예를 들어, 2개의 return 으로 나눠져있다고 해도, 결과적으로 DOM 내의 위치가 동일해진다면, state 는 유지된다.

        - 그럼 만약에, <Counter name="son" /> 같은 걸, 이름에 따라서 동일위치에 생성하려면 어떻게 해야할까?
            1. {isA && ~~} {!isA && ~~} 같이, 따로 분리해서 위치를 지정한다. (이런건 2개일 때 밖에 못씀)
                - falsy 에 의해 빈 노드가 생성된다는걸 잊지 말자! 
            2. key 속성 명시
                - key 는 list 만을 위한 게 아니다. 이게 특정한 Component 임을 React 에 알리는 용도이다!
                - key 만 지정하면 작동한다.
                - 특히 form 에서 개꿀인데, 선택이 바뀔때마다 textArea 를 초기화할 필요 없이, key 를 넘겨주면 초기화되는것이다!
            
            만약, 선택에 따른 state 를 유지하고 싶으면 어떡할까? 여러 방법이 있을것이다...
                - 생각한대로, CSS 같은걸로 숨긴다. 다만 DOM 크기가 크면 성능저하 우려가 있다.
                - state 끌어올려서 저장
                - localStorage 등, React 외부요소 고려
        
        결국 이게 컴포넌트 내에서 컴포넌트 정의하면 안되는 이유이다. rendering 마다 새 component 가 만들어지므로...
*/
