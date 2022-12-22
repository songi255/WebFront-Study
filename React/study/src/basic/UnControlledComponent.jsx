// 대부분 경우 form 구성 시 controlled 사용하는게 좋다. react dom 에서 관리하니까.
// uncontrolled 는 ref로 받은 DOM 에서 직접 관리한다.

// DOM에 신뢰 가능한 출처를 유지하므로 React와 non-React 코드를 통합하는 것이 쉬울 수 있다.
// 빠르고 간편하게 적은 코드를 작성할 수 있지만, 그 외에는 일반적으로 Controlled 를 사용해야 한다.
// 결론은 귀찮으면 써라 이말이다.

class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
    }
    handleSubmit(event) {
      event.preventDefault();
      alert(
        `Selected file - ${this.fileInput.current.files[0].name}`
      );
    }
  
    // file은 항상 비제어 컴포넌트이다. 하나 이상의 파일을 ref 를 사용해서 가져와야 한다.

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input type="file" ref={this.fileInput} />
          </label>
          <br />
          <input
          defaultValue="Bob"
          type="text"
          ref={this.input} />
          <button type="submit">Submit</button>
        </form>
      );
    }

    // input 에에 defaultValue 로 초기값을 줬다. radio랑 checkbox는 defaultChecked 를 지원한다.

}