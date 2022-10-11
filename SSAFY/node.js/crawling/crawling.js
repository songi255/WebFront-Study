// 크롤링 윤리 : 홈페이지/robots.txt 로 크롤링 접근할 수 있다.
// 교육 목적 외 서비스출시 / 영리목적으로 비허가구역 크롤링 시 법적 분쟁 발생가능하다.

// 우선, 모든 프로젝트를 시작하기 전에 npm init -y 로 package.json을 만드는 것 부터 시작한다. (명세서 부터 만들어야지)
// 예시로 후에 puppeteer를 설치하면 dependency 등등 추가된 걸 볼 수 있다.
// 추가로 package-lock.json도 추가되었는데, 상세명세서라고 볼 수 있다.
// github같은데 올릴땐 무거우니 node_modules는 지우고 올리셈..

/* puppeteer
    - 크롬 환경을 제어하기 위한 라이브러리
    - 크롬의 기반인 Chrominum 으로 작성되었기 때문에 가장 빠른 크롤링 라이브러리중 하나
    - headless 지원
      - 창이 없다는 의미.
      - 브라우저를 직접 띄우지 않고 프로그램만으로 동작하는 브라우저
    - pdf, 스크린샷 지원
    - javascript를 통해 제어 가능
    - SPA 크롤링 가능
    -> 물론, 기존에 했던것처럼, axios로도 쌉가능이다.
  설치
    - npm i puppeteer
      - 현재 해당 폴더에 설치됨
*/

const puppeteer = require('puppeteer');

const main = async() => {
  const browser = await puppeteer.launch({ // 브라우저를 생성. 기본값은 true
    headless:true
  });
  const page = await browser.newPage(); // 해당 브라우저에 새 창을 띄움

  await page.goto("https://naver.com"); // 해당 페이지를 해당 주소로 이동한다.
  //await page.pdf({path: 'test.pdf', format: 'A4'}); // pdf 저장
  //await page.screenshot({path: 'screenshot.jpg', fullPage: true }); // 스크린샷 촬영

  //웹툰 크롤링
  await page.goto("https://comic.naver.com/webtoon/weekdayList?week=mon");
  //await page.waitForSelector("#button"); 특정 selector가 로드될 때 까지 대기할 수도 있다.
  const data = await page.evaluate(()=>{ // evaluate 에서 document에 접근할 수 있다.
    const webtoonLists = document.querySelectorAll('#content > div.list_area.daily_img > ul > li > dl > dt > a');
    const titles = Array.from(webtoonLists).map(a => a.getAttribute("title").trim()); // Array.from -> 배열로 만들어주는 함수
    return titles;
  });
  console.log(data);



  await browser.close();
}

main();

/*
  만약 puppeteer 대신 cheerio를 사용한다면?
  const html = axios.get().data;
  const $ = cheerio.load(html); // cheerio.load()로 html을 로딩한다.
  $("선택자").each((i, el) => { // 이렇게 load()리턴 변수를 $로 명명해서 jquery처럼 써버린다.
    ~~~
  })
*/

