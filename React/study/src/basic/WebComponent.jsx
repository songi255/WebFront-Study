// React 와 WebComponent 는 상호보완적이다. 적절하게 섞어쓰면 됨.

// React 에서 WebComponent 사용
class HelloMessage extends React.Component {
    render() {
      return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
    }
}


// 웹 컴포넌트는 종종 강제성을 띠는 API를 열어놓고 있다. 예시로, video 는 play()나 pause() 라는 함수를 열어놓고 있을 것임.
// API에 접근하기 위해서, ref 지정이 필요할 수 있다. 

// 서드 파티 웹 컴포넌트를 사용 중이라면, 가장 좋은 해결방법은 Wrapper React 컴포넌트를 작성하는 것이다.

// 웹 컴포넌트에서 나온 이벤트들은 React 렌더링 트리에 올바르게 전파되지 않을 수 있다.
// 이를 해결하기 위해 이벤트를 다루기 위한 핸들러를 React 컴포넌트 내에 각각 만들어야합니다.

// 많은 사람이 공통으로 착각하는 부분 중 하나로, 웹 컴포넌트는 “className”이 아닌 “class”를 사용합니다.

// WebComponent 에서 React 사용
class XSearch extends HTMLElement {
    connectedCallback() {
      const mountPoint = document.createElement('span');
      this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
  
      const name = this.getAttribute('name');
      const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
      const root = ReactDOM.createRoot(mountPoint);
      root.render(<a href={url}>{name}</a>);
    }
}
customElements.define('x-search', XSearch);
// babel 로 변환 시 동작하지 않을 수 있는데, 해결하려면 웹 컴포넌트를 불러오기 전에 custom-elements-es5-adapter를 추가하기 바란다고 한다.