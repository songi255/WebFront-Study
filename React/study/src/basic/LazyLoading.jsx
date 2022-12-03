// 동적임포트. 중요한 컴포넌트부터 랜더링하고 나머지는 천천히 랜더링할 때 사용한다.
// 성능상 매우 중요한 개념이다. 예를들어 페이지 단위로 나눴다면 페이지는 lazy import 해야 할 것이다. 용량이 큰데 처음부터 bundle 되어있을 필요가 없기 때문이다!!!

const OtherComponent = React.lazy(() => import('./OtherComponent'));
// jsx Promise를 반환해야 한다. (React 컴포넌트를 default export로 가진 모듈 객체)

// lazy import는 default import만 지원한다. 만약, 한 파일에 여러 컴포넌트가 섞였다면 어떡할까?
// export { MyComponent as default } from "./ManyComponents.js"; // 이렇게 하나만 뽑아주는 녀석을 모듈로 정의해서 파일을 만들어주면 된다.

/////////////////////////////////////////////////// 동적임포트의 랜더링 ////////////////////////////////////////////
// lazy 컴포넌트는 Suspense 컴포넌트 하위에서 랜더링되어야 한다.
import { Suspense } from 'react'; 
// 이 Suspense 컴포넌트는 lazy가 로딩되는 동안 예비 컨텐츠를 보여줄 수 있다.

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>{/* fallback : 로딩될 때 까지 보여줄 react element이다. */}
        <OtherComponent />
        <OtherComponent /> {/* 여러 lazy를 품을 수 있다. */}
      </Suspense>
    </div>
  );
}
// lazy 컴포넌트와 전환
// 만약, state에 따라 컴포넌트가 전환될 때, lazy컴포넌트로 전환된다면 랜더링에 문제가 생길 것이다. 어떻게 해결할 수 있을까?
// 물론 fallback에 대체컴포넌트 설정해서 해결할 수 있다.
//import Glimmer from './Glimmer';
//fallback=<Glimmer /> // Glimmer가 먼지는 모르겠다...

// 그러나, UI 전환 전 이전UI를 계속 보여주는게 더 바람직할 수 있다. 그때 startTransition을 사용한다.
function handleTabSelect(tab) {
  startTransition(() => { // React.useTransition()을 사용할 수 없을 때 사용한다. 콜백으로 주어진 전환이 긴급전환이 아니라 transition이라는 걸 알린다.
    setTab(tab); // setTab은 그냥 Tab 컴포넌트에 정의된 함수인듯.
  });
}

// 네트워크 장애 등, 다른 모듈 로드에 실패할 수 있다. 이때 ErrorBoundary로 lazy 컴포넌트를 감싸 UX를 개선할 수 있다.
const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);

//보통은 페이지단위로 로딩할 일이 많기 때문에, React-router를 이용한 분할을 많이 한다. router.js 에 정리하겠다.