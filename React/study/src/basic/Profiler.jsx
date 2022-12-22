// 렌더링 빈도 / 비용 측정 -> production build 에서는 비활성화 되어있으나, 강제 활성화 가능

// 아래와 같이 측정하고 싶은 녀석을 감싼다. (중복, 중첩 가능)
// id 와 onRender 를 주는데, onRender 는 update 가 commit 될 때 실행된다.
render(
    <App>
      <Profiler id="Navigation" onRender={callback}>
            <Navigation {...props} >
                <Profiler id="Content" onRender={callback}>
                    <Content {...props} />
                </Profiler>
            </Navigation>
      </Profiler>
      <Profiler id="Main" onRender={callback}>
          <Main {...props} />
      </Profiler>
    </App>
);

// onRender 예시.
function onRenderCallback(
    id, // Profiler 트리의 "id" -> 복수의 프로파일러를 사용시 식별용
    
    phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(prop, state 혹은 hooks의 변화로 인해 리렌더링된 경우)
    
    actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간. 하위 트리가 얼마나 메모이제이션을 잘 활용하고 있는지를 암시합니다 (e.g. React.memo, useMemo, shouldComponentUpdate)
    
    baseDuration, // 메모이제이션 없이, 하위 트리 전체를 렌더링하는데 걸리는 예상시간.
    // 트리 내 개별 컴포넌트들의 가장 최근 render 시간의 지속기간.
    // 이 값은 렌더링 비용의 최악 케이스를 계산해줍니다(e.g. 초기 마운트 혹은 메모이제이션이 없는 트리)
    
    startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
    
    commitTime, // React가 해당 업데이트를 언제 커밋했는지. 이 값은 모든 프로파일러들이 공유하기 때문에 원한다면 그룹을 지을 수 있습니다.
    
    interactions // 업데이트가 계획되었을 때 추적하고 있던 “상호작용”의 집합 (e.g. render 혹은 setState가 호출되었을 때).
    // react 17에서 제거되었다고 한다.

  ) {
    // 렌더링 타이밍을 집합하거나 로그...
  }