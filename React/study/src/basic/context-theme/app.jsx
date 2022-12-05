// Component 에서는 걍 객체를 넘겨줬지만, 실사용에서는 Context 자체를 Component 로써 사용한다. (Provider)
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// ThemedButton를 사용하는 중간에 있는 컴포넌트
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    
    // 아래와같이, 처음 context 정의한 파일에서 넣어준 것은 기본값일 뿐이고, 이렇게 본인의 state 에 정의 후, <Provider> 사용시에 state를 넣어주어, state로 제어한다.
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 두 ThemeButton 중 하나는 작동하지 않는다. Context Provider 안에 없기 때문에.
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<App />);