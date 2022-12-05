// 빌드환경에서 컴파일설정을 하고싶지 않을 때 특히 유용하다고 하는데.. 잘 모르겠다.

class Hello extends React.Component {
    render() {
      return React.createElement('div', null, `Hello ${this.props.toWhat}`);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));

// createElement() 쓰는게 귀찮으면 짧게 할당하면 된다.
const e = React.createElement;

root.render(e('div', null, 'Hello World'));