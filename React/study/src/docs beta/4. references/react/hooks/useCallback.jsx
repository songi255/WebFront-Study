/* (성능) 렌더링 간 function 캐싱
    자식 Component 최적화에 쓰인다는 점에서 useMemo 와 같다. 함수자체를 캐싱하냐 실행 후 return 값을 캐싱하냐가 차이다.
    + custom Hook 에서 함수 반환시에도 감싸주면 좋다.

    상호작용이 거친경우 (react docs 처럼, 페이지 전체 or section 전체 교체같이..) 쓰지 않아도 된다.
    하지만 그림편집기에 가깝고, 대부분의 상호작용이 세분화된 경우 유용할 수 있다.

    실제로 몇가지 원칙을 따르면 memo 가 불필요할 수도 있다!
        - 그저 wrapping 이면 children 속성 잘 사용하기 (자식이 재렌더링될 필요가 없다는 걸 react 가 알 수 있다.)
        - state 끌어올리기는 필요한만큼만 하기
        - rendering 을 순수함수로 유지하기
        - 성능문제는 대부분 Effect 에서의 버그로 state set 이 빈번해서 발생
        - Effect 종속성 최적화되었는지? 확인
    -> 결론은, Profiler 분석한 후에나 도입을 고려하세요!
    
*/

// caching 최적화 예시

import { useCallback } from "react";

export default function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  );

  return (
    <div className={theme}>
      {/* 함수를 아래로 넘겨주고있다... 캐싱하지 않으면 아래 랜더링이 사이즈에 따라 굉장히 오래 걸릴 것이다. */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}

// 하위 component 에서 memo를 통해 props 가 동일한 경우 재 랜더링을 방지한다.
// 이게 중요한 점이다... 함수가 매번 새로 생성되므로, 캐싱하지 않으면 memo 는 작동할 수 없다...
import { memo } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});

// custom Hook 최적화
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback(
    (url) => {
      dispatch({ type: "navigate", url });
    },
    [dispatch]
  );

  const goBack = useCallback(() => {
    dispatch({ type: "back" });
  }, [dispatch]);

  // custom hooks 에서 반환하는 모든 functino 은 useCallback 으로 감싸는 것이 좋다.
  // 이렇게 할 경우, 사용하는 입장에서 필요하다면 자신의 코드를 최적화할 수 있다.
  return {
    navigate,
    goBack,
  };
}
