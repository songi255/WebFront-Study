// context 객체를 import
import {ThemeContext} from './theme-context'; 

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      />
    );
  }
}

// component 에 context 객체 삽입하여 export
ThemedButton.contextType = ThemeContext;

export default ThemedButton;