require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// 라우터 불러오기
const campingRoutes = require("./routes/camping");
const gocampingRoutes = require("./routes/gocamping");

const app = express();

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

// 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API 라우트
app.use("/api/camping", campingRoutes);
app.use("/api/gocamping", gocampingRoutes);

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "CampingPront API Server is running" });
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: "서버 오류가 발생했습니다",
    error: err.message,
  });
});

// 서버 시작
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
