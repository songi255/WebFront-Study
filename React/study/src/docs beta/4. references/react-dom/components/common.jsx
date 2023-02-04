// div 같은 tag 들에 공통적으로 적용되는 내용. 따로 정리하기보다는 주소 첨부한다.
// https://beta.reactjs.org/reference/react-dom/components/common#transitionevent-handler
// 그 외 input, select, option, textarea, progress 등도 문서를 참고하는게 더 맞아보인다.

// css 의 조건부적용 -> cn (className) 라이브러리를 사용하면 굉장히 편해진다.
import cn from "classnames";

function Row({ isSelected, size }) {
  return (
    <div
      className={cn("row", {
        selected: isSelected,
        large: size === "large",
        small: size === "small",
      })}
    >
      ...
    </div>
  );
}
