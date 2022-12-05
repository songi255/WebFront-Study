// Component Wrapping 하는 순수함수. React의 고유기능이라기 보다는, 자주 보이는 패턴이다.
// Redux의 connect와 Relay의 createFragmentContainer 같은 데서 흔하게 볼 수 있다.


/////////////////////// Cross-Cutting-Concerns (횡단관심사) 에 사용
// 예전에는 mixin 을 권장했지만, 많은 문제가 발생하여 HOC로 바뀌었다.

// 동일 Data Source 에서 댓글, 블로그 글을 받는 경우, HOC의 예시.
function withSubscription(WrappedComponent, selectData) {
  // 감쌀 component 와 두번째 인자(callback)를 받았다. 인자는 자유롭게 설정하면 된다.
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... 구독을 담당하고...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    // 순수함수여야하기 때문에, 인자로 받은 Component 의 prototype 을 변경한다던가 하면 안된다. 그저 조합만 할 뿐.
    render() {
        // 모듈화 하기 위해 data props 를 넘겨준 것은 굉장히 fancy 하다..
        return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

// Component 정의 자체를 wrapping 해서 하고있다. export 역시 wrapping 된 애로 한다.
const CommentListWithSubscription = withSubscription(CommentList, (DataSource) => DataSource.getComments());
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource, props) => DataSource.getBlogPost(props.id));


///////////////////////////////////////////////// Convention

//