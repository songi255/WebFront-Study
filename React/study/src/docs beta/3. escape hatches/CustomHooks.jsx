/* Custom Hooks 의 좋은 사용 예시
    ✅ useData(url)
    ✅useImpressionLog(eventName, extraData)
    ✅useChatRoom(options)
    ✅useMediaQuery(query)
    ✅useSocket(url)
    ✅useIntersectionObserver(ref, options)

    추상적인게 아니라, 딱 사용사례가 제한될수록 문제발생이 적다.
*/

// Network 기반 App 에서 아주 자주 사용 될 custom Hook 예시.
// 연결이 되었는지 아닌지를 판단해준다.
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return isOnline;
  // 물론 이 hooks logic 은 SSR 같은 시행에서 논리적 오류가 생길 수 있다.
  // React18 부터는 useExteralSync 를 지원하기 때문에 쓰면 된다.
  // useExternalSync 로 바꾼다고 해도, 대부분의 코드는 변경할 필요가 없다. 이것 또한 custom hooks 의 장점이다.
}

// 사용예시
import { useOnlineStatus } from "./useOnlineStatus.js";

function StatusBar() {
  // 아래와 같이, 그냥 변수에 할당해서 사용하면 끝이다. state 기반이므로, 변경되면 자동으로 detect 한다.
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log("✅ Progress saved");
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? "Save progress" : "Reconnecting..."}
    </button>
  );
}

// 물론, state 관리 logic 만 공유하는 것이지, state 자체를 공유하는 것은 아니다!!
