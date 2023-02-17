const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const dotenv = require("dotenv");
const fs = require("fs");
const PORT = 8090;
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());  

app.get("/", async (req, res) => {
  return res.json({
    test: "OK",
  });
});

// 데이터를 가져오는 요청
app.post("/data", async (req, res) => {
  const { startDate, endDate, timeUnit, device, gender, ages, keywordGroups } = req.body;
  try{
    const request_body = {
      startDate: startDate,
      endDate: endDate,
      timeUnit: timeUnit,
      device: device === "all" ? "" : device,
      gender: gender === "all" ? "" : gender,
      keywordGroups: keywordGroups,
    };

    console.log(ages);
    if (ages.length !== 0){
      if(ages.every(e => e)){
        request_body.ages = ages;
      }
    }

    const url = "https://openapi.naver.com/v1/datalab/search";
    const headers = {
      "Content-Type": "application/json",
      "X-Naver-Client-Id": process.env.CLIENT_ID,
      "X-Naver-Client-Secret": process.env.CLIENT_SECRET
    }    
    const result = await axios.post(url, request_body, {
      headers:headers
    });
    //console.log(result.data);

    // 캐싱용으로 chart.json 파일에 검색결과를 저장한다.
    fs.writeFile(`./uploads/chart.json`, JSON.stringify(result.data['results']), function(error){
      //console.log(error);
      if(error) throw error;
    });
    return res.json({ status: "OK" });
  }catch(error){
    console.log(error);
    return res.json(error);
  }
});

// 캐싱된 내용을 읽어와서 보여준다.
app.get('/data', async (req, res) => {
  try{
    res.set("Content-Type", "application/json; charset=utf-8");
    const tempFile = fs.createReadStream('uploads/chart.json');
    return tempFile.pipe(res);
  }catch(error){
    console.log(error);
    return res.json(error);
  }
});

app.delete('/data', (req, res) => {
  //파일을 없앤다.
  fs.unlink('uploads/chart.json', function(error){
    if (error){
      console.log(error);
      return res.json("Fail");
    }
  });

  return res.json("OK");
})

app.listen(PORT, () => console.log(`this server listening on ${PORT}`));
