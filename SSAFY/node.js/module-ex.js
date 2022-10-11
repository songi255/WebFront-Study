const friends = { // 객체 하나를 만들었다.
  name1: "철수",
  name2: "영희",
  run: (word) => console.log(word, "가자")
};

module.exports = friends; // module의 export에 friend를 넣어뒀다. 다른 파일에서 require("경로") 로 module.exports 객체에 접근가능하다.