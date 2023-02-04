/* React Dev Tool 에서 Custom Hook 에 디버깅에 사용할 값을 붙일 수 있다.
    공유라이브러리의 일부이거나, 검사하기 복잡한 내부구조를 가질 때 사용하면 좋다.
*/

import { useDebugValue } from "react";

function useOnlineStatus() {
  // Custom Hook 최상위에서 호출한다.
  useDebugValue(isOnline ? "Online" : "Offline");
  // 두번째 인수로 format function 도 줄 수 있다.
}
