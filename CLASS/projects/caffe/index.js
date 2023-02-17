const express = require("express");
const app = express();
const PORT = 8080;

// 미들웨어 설정 ----------------------------------------------------------------------------------------
//cors
const cors = require("cors");
app.use(cors());

//morgan
const morgan = require("morgan");
app.use(morgan('dev'));

//db
const { pool } = require("./db");

//multer
const path = require("path"); // path를 파싱해줌.
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, "public/");
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname); // 확장자만 가져오기
            const fileNameExeptExt = path.basename(file.originalname, ext); // 확장자를 제외한 파일이름
            const saveFileName = fileNameExeptExt + Date.now() + ext; // 결국 둘 사이에 날짜를 추가해주는 코드
            done(null, saveFileName); // 중복방지용이다.
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});

app.use(express.json()); //json받기
app.use("/public", express.static("public"));

// CRUD -------------------------------------------------------------------------------------------------

// 메뉴 전체보기
app.get("/api/menus", async (req, res) => {
    try{
        const data = await pool.query("SELECT * FROM menus");
        return res.json(data[0]);
    }
    catch(error){
        return res.json({
            success: false,
            message: "failed to inquire whole menu list."
        });
    }
});

//메뉴 검색
app.get("/api/menus/:id", async (req, res) => {
    try{
        const data = await pool.query("SELECT * FROM menus WHERE id = ?", [req.params.id]);
        return res.json(data[0][0]);
    }
    catch(error){
        return res.json({
            success: false,
            message: "failed to inquire menu."
        });
    }
});

// 메뉴 등록
app.post("/api/menus", upload.single('file'), async (req, res) => {
    try{
        const data = await pool.query("INSERT INTO menus (name, description, image_src) VALUES (?, ?, ?)", [req.body.name, req.body.description, req.file.path]);
        return res.json({
            success: true, message: "success to register new menu"
        });
    }
    catch(error){
        console.log(error);
        return res.json({
            success: false, message: "failed to register new menu"
        });
    }
});

// 이미지 수정 (post로만 가능)
app.post("/api/menus/:id", upload.single('file'), async (req, res) => {
    try{
        const data = await pool.query(`UPDATE menus SET image_src = ? WHERE id = ?`, [req.file.path, req.params.id]);
        return res.json({
            success: true, message: "success to modify menu image"
        })
    }
    catch(error){
        console.log(error);
        return res.json({
            success: true, message: "failed to modify menu image"
        })
    }
});

// 수정
app.patch("/api/menus/:id", async (req, res) => {
    try{
        const data = await pool.query(`UPDATE menus SET name = ?, description = ? WHERE id = ?`, [req.body.name, req.body.description, req.params.id]);
        return res.json({
            success: true, message: "success to modify menu"
        })
    }
    catch(error){
        return res.json({
            success: false, message: "failed to modify menu"
        })
    }
});

// 메뉴 삭제
app.delete("/api/menus/:id", async (req, res) => {
    try{
        const data = await pool.query(`DELETE FROM menus WHERE id = ?`, [req.params.id]);
        return res.json({
            success: true, message: "success to delete menu"
        })
    }
    catch(error){
        console.log(error);
        return res.json({
            success: false, message: "failed to delete menu"
        })
    }
});


//////////////////////////////////////////////////////// 주문

// 주문목록 가져오기
app.get("/api/orders", async (req, res) => {
    try{
        const data = await pool.query(`
        SELECT a.id, quantity, request_detail, name, description FROM orders as a
        INNER JOIN menus as b ON a.menus_id = b.id
        ORDER BY a.id DESC
        `);
        return res.json(data[0]);
    }
    catch(error){
        console.log(error);
        return res.json({
            success: false,
            message: "failed to inquire order list."
        });
    }
});

// 특정주문 가져오기
app.get("/api/orders/:id", async (req, res) => {
    try{
        const data = await pool.query(`
        SELECT a.id, quantity, request_detail, name, description FROM orders as a
        INNER JOIN menus as b ON a.menus_id = b.id
        WHERE a.id = ?
        ORDER BY a.id DESC
        `, [req.params.id]);
        return res.json(data[0]);
    }
    catch(error){
        console.log(error);
        return res.json({
            success: false,
            message: "failed to inquire order list."
        });
    }
});

// 주문하기
app.post("/api/orders", async (req, res) => {
    try{
        const data = await pool.query(`INSERT INTO orders (quantity, request_detail, menus_id) VALUES (?, ?, ?)`, [req.body.quantity, req.body.request_detail, req.body.menus_id]);
        return res.json({
            success: "true", message: "success to order"
        });
    }
    catch(error){
        console.log(error);
        return res.json({
            success: false, message: "failed to order"
        });
    }
});

// 주문 수정
app.patch("/api/orders/:id", async (req, res) => {
    try{
        const data = await pool.query(`UPDATE orders SET quantity = ?, request_detail = ? WHERE id = ?`, [req.body.quantity, req.body.request_detail, req.params.id]);
        return res.json({
            success: true, message: "success to modify order"
        });
    }
    catch(error){
        console.log(error);
        return res.json({
            success: false, message: "failed to modify order"
        });
    }
})

// 주문 삭제
app.delete("/api/orders/:id", async (req, res) => {
    try{
        const data = await pool.query(`DELETE FROM orders WHERE id = ?`, [req.params.id]);
        return res.json({
            success: true, message: "success to delete order"
        });
    }
    catch(error){
        console.log(error);
        return res.json({
            success: false, message: "failed to delete order"
        });
    }
});

app.listen(PORT, console.log(`server listening PORT ${PORT}`));