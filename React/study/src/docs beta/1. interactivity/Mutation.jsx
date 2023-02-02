/* state 값이 객체나 배열일 경우, 기술적으로 property 를 직접 수정 가능하긴 하다.
    하지만 그러면 안된다! 불변성을 만족하게 복사하여 새로 줘야한다!
        - 저렇게 값만 수정한다면, 객체참조값은 동일하므로 update 가 일어나지 않는다.

    변경 사항이 많을 경우, 걍 객체전체를 복사해서 따로 뺀 뒤에 property 변경하여 한번에 set 하기도 한다.
        - 이를 local Mutation 이라고 한다.

    만약 person 같이, 속성이 여러개인 객체를 복사하면 상당히 귀찮을 것이다.
        - 이때 {...person, age: 19} 처럼, 스프레드와 프로퍼티 오버라이딩을 사용하자! 매우 편리하다.

    물론, 무조건 모든 level deep copy 가 되야한다는 말이 아니다. Data 는 하나에 저장해놔도 된다. 다만, 그 container 의 참조를 바꿔서 update 를 유도하라는 말이다.

*/

/////////////////////// Immer!!!! /////////////////////////////////////////

// 상태 중첩이 깊은경우, flatten 을 고려할 수 있다. 하지만 귀찮다면 Immer 를 사용해보자!
// https://github.com/immerjs/use-immer (npm install use-immer -> import { useImmer } from 'use-immer')

// 아래 Immer 코드는 규칙을 위배하는 것 같지만, 실제로는 proxy 를 생성하여 기록한다.
updatePerson((draft) => {
  draft.artwork.city = "Lagos"; // destructuring 이나 copy 없이 작동하는 것 처럼 보인다!
});
// 특히 Immer 를 사용하면 변경과 비변경을 혼용할 수 있기 때문에, 각각의 case 에서 제일 자연스러운 방법을 사용할 수 있다. map 을 사용한다거나..

// 걍 개꿀이다. useState 대신 useImmer 를 사용하면 끝이다... 중첩객체에서는 꼭 사용하도록 하자...

/* 배열변경의 경우 어떤 점을 신경써야 할까?
    값을 변경하는 메서드 대신, 새 array 를 반환하는 메서드를 사용해야 한다.
        변경 (비권장)
            - 추가 : push, unshift
            - 삭제 : pop, shift, splice
            - 교체 : splice, arr[i] = ~~
            - 정렬 : reverse, sort
        비변경 (권장)
            - 추가 : concat, [...arr]
            - 삭제 : fliter, slice
            - 교체 : map
            - 정렬 : 적용 전 먼저 copy
        
        혹은 아예 Immer 를 사용하면, 두 종류의 메서드를 자유롭게 사용할 수 있다.


*/
