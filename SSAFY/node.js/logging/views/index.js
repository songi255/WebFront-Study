const url = "http://localhost:8080/api/logs"; // log 찍는 api 주소이다.

const logTableBody = document.querySelector(".log-table-body");

const inputData = (data, idx) => {
  const sample = `
  <tr>
    <th scope="row">${idx}</th>
    <td>
      <div class="alert alert-primary" role="alert">${data.message}</div>
    </td>
    <td>${data.level}</td>
    <td>${data.timestamp}</td>
  </tr>
  `;
  return sample;
}

const changeAlertColor = () => {
  const types = {"warn": "alert-warning", "info": "alert-info", "error": "alert-danger"};
  logTableBody.querySelectorAll(".alert").forEach((e) => {
    for(let key in types){      
      if (e.innerHTML.includes(key)){
        e.classList.remove("alert-primary");
        e.classList.add(types[key]);
      }
    }
  });
}

const getData = async () => {
  try{
    await axios.post(url); // 먼저 post로 log를 생성한다. success결과를 받아서 처리할 수도 있을 것.
    const response = await axios.get(url);
    if (response.data){
      let trTags = "";
      response.data.map((data, idx) => {
        let trTag = inputData(data, idx);
        trTags += trTag;
      });
      logTableBody.innerHTML = trTags;
      changeAlertColor();
      console.log(response.data);
    }
  }
  catch(error) {
    console.log(error);
  }
};

getData();

const filter = (type) => {
  for(let tr of logTableBody.children){
    const message = tr.children[2].textContent;
    if (message.includes(type)){
      tr.style.display = "table-row";
    }else{
      tr.style.display = "none";
    }
  }
};

const btnInfo = document.querySelector(".btn-primary");
btnInfo.addEventListener("click", filter.bind(null, "info"));

const btnWarn = document.querySelector(".btn-warning");
btnWarn.addEventListener("click", filter.bind(null, "warn"));

const btnError = document.querySelector(".btn-danger");
btnError.addEventListener("click", filter.bind(null, "error"));