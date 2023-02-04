/* 랜더링 성능측정용
    production build 에서는 기본적으로 비활성화된다. (쓰고싶다면 특수 production build 활성화하셈)

    대화형 Profiler 가 필요하다면 chrome extension 의 Profiler tab 을 이용하면 된다.
*/

// 측정할 요소를 wrapping 한다.
// id : 측정대상 UI 요소식별자 / onRender : 업데이트마다 실행할 callback
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>;

// callback 예시
function onRender(
  id, // 방금 commit 한 id. 여러 Profiler 사용 시 식별용
  phase, // "mount", "update", "nested-update" : 처음 mount 된건지, 이후 update 된건지 식별
  actualDuration, // 하위요소까지 전부 렌더링까지 걸린시간. memo, useMemo 를 잘 썼다면, 그리고 이상적이면 필요한 부분만 재렌더링하므로 처음에 비해 크게 줄어야 한다.
  baseDuration, // 최적화 없이 (가장 처음 렌더링) 모든 하위요소까지 렌더링에 걸린 시간. actualDuration 과 비교하는 worst case 이다.
  startTime, // rendering 시작시간
  commitTime // rendering 완료시간. commit 중인 모든 Profiler 가 공유하므로, 필요하다면 group화 할 수 있다.
) {
  // 로그 남기기 등 작업...
}
