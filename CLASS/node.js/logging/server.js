//npx nodemon server.js 로 실행하면 어떻게 될까? 설치는 되지않고 1회용으로 실행된다!!

const express = require("express");

const app = express();
const PORT = 8080;

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev")); // 이렇게 use로 등록 된 middleware 들은 대부분 자동동작하지만, 일부분은 get같은데서 next()로 직접 넘겨줘야 하는 부분도 있다.

app.use(express.json());

const { logger } = require("./utils/winston"); // winston.js에 정의한 대로 로그파일이 생성된다.

// app.all() -> get, post, put, patch, delete에 대해서 모두 응답해준다.

app.use(express.static(__dirname + "/views")); // front 응답을 위한 static 설정. 이렇게만 해도 get "/"하면 index.html이 응답된다.

const fs = require("fs"); // 파일시스템 가져오기

const insert = (str, index, target) => {
	const front = str.slice(0, index);
	const back = str.slice(index, str.length);
	return front + target + back;
}

let retData = {}; // post와 get에서 공유한다. post로 먼저 만들고, get으로 받아온다.

app.post("/api/logs", async (req, res) => {
	// 아래처럼, logger 객체에 메서드 호출로 파일에 로깅할 수 있다.
	logger.error("error 메세지"); // 이벤트 등록하는게 아니고, 직접 로그쓰는 메서드이다.
	logger.warn("warn 메세지"); // 워닝
	logger.info("info 메세지");
	logger.http("http 메세지");
	logger.debug("debug 메세지");
	// 기록된 로그파일을 읽어와서 파싱한다.(로그파일에는 로그간 ","가 없어서 그걸 넣어주고, 앞뒤에 []로 감싸서 JSON 객체로까지 변환시키는 코드이다.)
	// 파일명은 20분마다 바뀐다... 문제있는 코드.
	let logFileName = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", "-");
	logFileName = logFileName.slice(0, logFileName.indexOf(":"));
	console.log(logFileName);
	fs.readFile(`./logs/${logFileName}.log`, "utf8", (err, data) => {
		retData = data;
		let idx = -1;
		while(1){
			idx = retData.indexOf("}", idx + 1);
			if (idx == -1){
				break;
			}
			retData = insert(retData, idx + 1, ",");
		}
		retData = "[" + retData.slice(0, retData.length - 3) + "]"; // 콤마 하나만 지우면 되는데 왜 -3까지 지웠을까? log파일에 엔터까지 포함되있기 때문이다!
		retData = JSON.parse(retData); // 마지막으로 retData 전역객체에 파싱결과(JSON객체)를 넣어줬다. 이제 이걸 get에서 받아서 사용한다.
		console.log(retData);
	});
	return res.json({ // 방금 만든 로그를 넘겨주지 않았다. 왜? post는 게시하는 역할만 해야하기떄문이다.
		success: true
	});
});

app.get("/api/logs", async (req, res) => {
	res.json(retData);
});

app.post("/", async (req, res) => {

});

app.put("/", async (req, res) => {

});

app.patch("/", async (req, res) => {

});

app.delete("/", async (req, res) => {

});

app.listen(PORT, () => console.log(`this server listening on ${PORT}`)); // 포트 감시 실행
