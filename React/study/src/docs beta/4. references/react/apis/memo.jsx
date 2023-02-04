/* component 를 Props 에 종속시켜 Caching 한다.
    일반적으로 부모 Component 가 재랜더링되면 자식도 재랜더링되는데, 이를 건너뛰는 것이다.
        - 이를 위해서는 props 에 의해서만 딱딱 변하는 순수성이 만족되어야 한다.

    동일하게 자주 렌더링되며, 그 비용이 비쌀 경우만 가치가 있다.
        - 모든 Component 를 감쌀 필요도 없으며, 기본적인 Rule 을 잘 지켰다면 크게 필요하지도 않은 경우가 많다.
        - Profiler 로 분석 후, 꼭 필요한 경우에만 사용하자. 남용해서 가독성을 떨어뜨리지말고...

    Props 전달이 매번 달라지는 경우에는 의미가 없다.
        - 그래서 useMemo, useCallback 같은 캐싱기능과 함께 쓰인다.

    언제나 그랬듯이, 섯불리 처음부터 최적화하지마라!
*/

const Greeting = memo(function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
});

// 사용자 지정 Equal 함수 제공하여, update 를 customizing 할 수 있다. 심층비교를 하거나 할 때 드물게 사용된다.
// 심층비교시 꼭 모든 요소를 검사해야한다! 그렇지 않으면 props 나 state 와 동기화되지 않은 상태로 매우 혼란스러운 bug 를 유발할 수 있다.
const Chart = memo(function Chart({ dataPoints }) {
  // ...
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.dataPoints.length === newProps.dataPoints.length &&
    oldProps.dataPoints.every((oldPoint, index) => {
      const newPoint = newProps.dataPoints[index];
      return oldPoint.x === newPoint.x && oldPoint.y === newPoint.y;
    })
  );
}
