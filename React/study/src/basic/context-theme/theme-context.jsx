export const themes = {
    light: {
      foreground: '#000000',
      background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
};

// context 를 생성해서 export 하고 있다. context 에는 themes 객체가 담겨있다.
export const ThemeContext = React.createContext({
  theme: themes.dark, // 이 값들은 기본값들을 의미하고, 실제 사용할 때는 재정의한다.
  toggleTheme: () => {},
});
// 하위컴포넌트 (예를들면 버튼) 에서 Context 를 바꿔야 할 때가 있는데, 그럴 때 이런식으로 toggle Method 도 같이 넘겨준다.