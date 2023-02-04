/* ref 구한 후에, ref 에다가 기존 api 말고 사용자정의 handle 을 달 수 있다. + 노출시킬 메서드를 지정할 수 있다.
    Component 에서 ref를 구해서 붙여야 하므로, 논리적으로 forwardRef() 와 함께 쓸 수밖에 없다.
*/

import { useRef } from "react";
import Post from "./Post.js";

export default function Page() {
  const postRef = useRef(null);

  function handleClick() {
    postRef.current.scrollAndFocusAddComment();
  }

  return (
    <>
      <button onClick={handleClick}>Write a comment</button>
      <Post ref={postRef} />
    </>
  );
}

import { forwardRef, useRef, useImperativeHandle } from "react";
import CommentList from "./CommentList.js";
import AddComment from "./AddComment.js";

const Post = forwardRef((props, ref) => {
  const commentsRef = useRef(null);
  const addCommentRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      // 아래에 뭘 한걸까? focus, scrollIntoView, 그리고 커스텀 메소드 이렇게 3개만 노출시킨 것이다. 이 외에는 사용할 수 없다.
      return {
        scrollAndFocusAddComment() {
          commentsRef.current.scrollToBottom();
          addCommentRef.current.focus();
        },
        focus() {
          inputRef.current.focus();
        },
        scrollIntoView() {
          inputRef.current.scrollIntoView();
        },
      };
    },
    []
  );

  return (
    <>
      <article>
        <p>Welcome to my blog!</p>
      </article>
      <CommentList ref={commentsRef} />
      <AddComment ref={addCommentRef} />
    </>
  );
});
