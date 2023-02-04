/* fallback 에는 대개 spinner 나 skeleton( Glimmer ) 이 들어간다.
    startTransition or useDeferredValue 를 사용하면 중간에 다시 fallback 으로 돌아가지 않는다.
        - startTransition 은 전체 App 대상, 즉, Framework 나 route 에서의 화면전환에 사용
        - useDeferredValue 는 일부 Component 에 적용
        fallback 대신 이전화면을 유지하는 기능은 동일하다.

    재로딩되서 fallback 이 다시나오면 Effect 재실행한다.
    굳이 알 필요는 없지만, react 는 Suspense 와 통합된 Streaming Server Rendering 와 Selective Hydration 같은 최적화를 포함한다. 궁금하면 검색 ㄱ

    Suspense 를 사용하는 Data source (Relay, Next.js, lazy() 등 ) 만 Suspense 를 지원한다.
        - 일반적인 useEffect() 같은건 감지하지 않는다는 말이다.
        - 직접구현 요구사항은 불안정하고 문서화되지 않았다. 향후 출시예정.
    -> 즉, 지금 나는 Relay, Next.js, lazy Component 쓸때만 Suspense 를 사용할 수 있다.

    중첩된 Suspense 는 어떻게 처리될까?
        - fallback 또한 rendering 된 걸로 취급된다.
            - 처음에는 최상위 Suspense 의 fallback 이 작동하다가, 하위 Suspense의 fallback 이 rendering 되면 사라진다.
            - 이후 하위 Suspense 의 fallback 이 대체될 것이다.
        - 이런 동작을 이용한 것을 Suspense 경계 라고 한다.
            - 어떤 부분을 한번에 popup 하고, 어떤 부분을 점진적으로 표시할 것인지 조정할 수 있다!!!
*/

// fallback 과 children 을 props 로 가진다.
<Suspense fallback={<Loading />}>
  <Albums />
</Suspense>;

// fallback 대신 이전화면 보여주기
export function App() {
  const [query, setQuery] = useState("");
  // state 를 useDeferredValue() 를 사용해서 넘겨주면, data가 load될 때 까지 이전 값을 유지한다.
  const deferredQuery = useDeferredValue(query);
  // 아마... 내부적으로 defferredQuery 를 이용한 Component 생성 후 완료되면 query state 를 업데이트해서 rendering 유도하는 그런 느낌인듯?

  // 시각적효과를 위해, query !== deferredQuery 일 때 글자흐림 같은 효과를 줄 수 있다.
  const isStale = query !== deferredQuery;
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </div>
      </Suspense>
    </>
  );
}

// useTransition 사용
import { Suspense, startTransition, useState } from "react";
import IndexPage from "./IndexPage.js";
import ArtistPage from "./ArtistPage.js";
import Layout from "./Layout.js";

export function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState("/");
  // useTransition을 사용해서 startTransition 을 구할 수도 있다. 이 경우 isPending 을 참조할 수 있다.
  const [isPending, startTransition] = useTransition();
  // 그럴 필요가 없다면 그냥 바로 startTransition 을 import 하면 된다.

  function navigate(url) {
    // transition 은 이미 공개된 Content 를 숨기지 않아도 될 때 까지만 기다린다.
    // router 와 짝꿍이므로, router 의 용례를 참고하자.
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === "/") {
    content = <IndexPage navigate={navigate} />;
  } else if (page === "/the-beatles") {
    content = (
      <ArtistPage
        artist={{
          id: "the-beatles",
          name: "The Beatles",
        }}
      />
    );
  }
  return <Layout isPending={isPending}>{content}</Layout>;
  // Layout 은 이미 공개되었다. 공개된 Layout 이 있고, page 아래에 suspense 경계가 있으므로, Layout 을 숨기지 않아도 되서 fallback 대신 유지된다.
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}

// 만약, param 만 다른 page 로 routing 된다면? -> 내 프로필 보다가 다른사람 프로필 보고싶다면? transition 대신 fallback 을 표시하는게 좋을것이다!
// <ProfilePage key={queryParams.id} /> 처럼, key 를 줘서, 다른 Component 라는 것을 알려야한다! (물론 Suspense 통합된 routing library 는 기본적으로 제공해야한다.)
//  -> 즉, transition 을 사용한다고 해서 fallback 이 무의미한건 아니었네.

// Streaming Server Rendering API 사용할 시 (또는 Framework), 서버 렌더링 오류 발생하면 Suspense 로 fallback 표시하게끔 사용할 수 있다.
//   -> 이를 이용해서, 일부 Component 를 server 에서는 rendering 하고 싶지 않은 경우 (예를 들면 <Chat/>) 이걸 Suspense 로 감싸서 Opt-out 할 수 있다!!
