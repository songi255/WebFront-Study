/* winston
  - logging을 하는 라이브러리이다.
*/

const winston = require("winston"); // logging 라이브러리
const { format } = winston;
const { combine }  = format;
require("winston-daily-rotate-file"); // 하루마다 파일을 끊는건가?

const transport = new winston.transports.DailyRotateFile({
  level: "info", // level => error -> warn -> info -> http -> debug 순서이다. 로깅을 어디까지 할 것인가? 를 정한다.
  // 예를 들어, 현재 수준이 info인데 이때 logger.http("~~")로 로깅을 하면 로깅이 안된다! info 까지만 로깅하기에!
  filename: "./logs/%DATE%.log", // 생성될 로그파일의 이름
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m", // 한 파일마다 20분만큼 기록하겠다.
  maxFiles: "1d", // 하루가 지나면 지우겠다는 뜻이다. -> 현업은 최소 한달은 준다. 영세기업은 적어도 1년치는 보관한다.
  format: combine(
    format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
    format.json()
  ) // 시간을 찍었다.
});

const logger = winston.createLogger({
  transports: [transport]
});

module.exports = { logger };