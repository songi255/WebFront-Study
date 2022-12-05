// try catch 의 tag 버전. js 에러를 기록하고, 깨진 Component 대신 fallback UI 를 보여준다.

/* 아래 예외들은 잡지 못한다.
    - 이벤트 핸들러 (더 알아보기)
    - 비동기적 코드 (예: setTimeout 혹은 requestAnimationFrame 콜백)
    - 서버 사이드 렌더링
    - 자식에서가 아닌 에러 경계 자체에서 발생하는 에러
*/

//////////////////////////////////// class Component 자체를 ErrorBoundary로 만들기
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    // 에러가 발생한 뒤에 fallback UI를 렌더링하려면 사용
    static getDerivedStateFromError(error) {
      // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
      return { hasError: true };
    }
  
    // 에러 정보를 기록하려면 사용
    componentDidCatch(error, errorInfo) {
      // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
}
// 오직 Class Component 만이 ErrorBoundary 로 사용가능하다.

// React 16부터는 에러 경계에서 포착되지 않은 에러로 인해 전체 React 컴포넌트 트리의 마운트가 해제됩니다.
// 잘못된 사람에게 메시지가 가느니, 보여주지 않는게 낫다는 말.
// 예를 들어 페이스북 메신저는 사이드 바, 정보 패널, 대화 기록과 메시지 입력을 각각 별도의 에러 경계로 감싸두었습니다.
