const key = "my key"; // inactivated
const url = "https://picsum.photos/1280/720";
// 배경 이미지가 무작위로 변경된다
// 중앙에 시계가 동작한다(실시간)
// 중앙 하단에 메모할 수 있는 공간이 존재한다
// 우측 상단에 날씨 표시

/*
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
*/

//navigator.geolocation.getCurrentPosition(); // chrome의 navigator 객체에서 현재 접속지역을 알 수 있다.
//http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//http://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} 위도경도 찾기

async function changeBackground() {
  const promise = await axios.get(url, { responseType: "blob" }); // binary로 받아온다.
  const imgURL = URL.createObjectURL(promise.data); // DOM Obj의 URL주소를 반환해주는 메서드이다.
  document.querySelector("body").style.backgroundImage = `url(${imgURL})`;
}

function setTime() {
  const timer = document.querySelector(".timer");
  const date = new Date();
  timer.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function setMemo() {
  const memoInput = document.querySelector(".memo-input");
  memoInput.addEventListener("keyup", (e) => {
    // currentTarget = 이벤트를 발생시킨 주체
    if (e.code === "Enter" && e.currentTarget.value) {
      const memo = document.querySelector(".memo");
      // 시간 두자리 안채워짐
      // div 추가되면서 올라감
      // 할일이 한개가 아님
      localStorage.setItem("todo", e.currentTarget.value);
      const memoValue = localStorage.getItem("todo");
      memo.textContent = memoValue;
      memoInput.value = "";
    }
  });
}

function getMemo() {
  // localStorage : 브라우저 임시 storage이다. key-value꼴로 삽입한다.
  // 개발자도구 - Application 에서 확인할 수 있다.
  const memo = document.querySelector(".memo");
  const memoValue = localStorage.getItem("todo");
  memo.textContent = memoValue;
}

function deleteMemo() {
  document.addEventListener("click", (e) => {
    // 어느 영역이든 클릭가능
    if (e.target.classList.contains("memo")) {
      localStorage.removeItem("todo");
      e.target.textContent = "";
    }
  });
}

function getPosition(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

async function renderWeather() {
  try {
    const position = await getPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const weatherResponse = await getWeather(latitude, longitude);
    const weatherData = weatherResponse.data;

    const weatherList = weatherData.list.reduce((acc, cur) => {
      if (cur.dt_txt.indexOf("18:00:00") > 0) acc.push(cur);
      return acc;
    }, []);
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = weatherList
      .map((e) => weatherWrapperComponent(e))
      .join("");
  } catch (error) {
    alert(errer);
  }
}

async function getWeather(latitude, longitude) {
  if (latitude && longitude) {
    return await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`
    );
  }
  const data = await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${key}`
  );
  return await axios.get(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${key}`
  ); // ??
}

function weatherWrapperComponent(e) {
  return `
  <div class="card bg-transparent flex-grow-1 m-2">
    <div class="card-header">
      ${e.dt_txt.split(" ")[0]}
    </div>
    <div class="card-body d-flex">
      <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h5 class="card-title">${e.weather[0].main}</h5>
        <img class="weather-img" src="${matchIcon(e.weather[0].main)}">
        <p class="card-text">${changeToCelcius(e.main.temp)}</p>      
      </div>  
    </div>
  </div>
  `;
}

function matchIcon(weather) {
  if (weather === "Clouds") return "./images/001-cloud.png";
  if (weather === "Clear") return "./images/039-sun.png";
  if (weather === "Rain") return "./images/003-rainy.png";
  if (weather === "Snow") return "./images/006-snowy.png";
  if (weather === "Thunderstorm") return "./images/008-storm.png";
}

function changeToCelcius(Farenhite) {
  return (Farenhite - 273.15).toFixed(1);
}

(function () {
  changeBackground();
  setTime();
  setMemo();
  getMemo();
  deleteMemo();
  renderWeather();
  setInterval(changeBackground, 5000);
  setInterval(setTime, 1000);
})();

// 혹은 axios.get().then 으로 해도 된다.
//그리고 setInterval 로 바꿔도 된다.
