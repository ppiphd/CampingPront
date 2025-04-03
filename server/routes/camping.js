const express = require("express");
const router = express.Router();

// 캠핑장 데이터 샘플
const campings = [
  {
    campingIdx: 1,
    campingName: "서울 글램핑장",
    campingIntro: "아름다운 자연 속 글램핑",
    campingType: "글램핑",
    campingManageMode: "민간",
    address: "서울시 강남구 테헤란로 123",
    tel: "02-1234-5678",
    thumbnailUrl: "/assets/image/infologo.png",
  },
  {
    campingIdx: 2,
    campingName: "부산 오션뷰 카라반",
    campingIntro: "바다가 보이는 프리미엄 카라반",
    campingType: "카라반",
    campingManageMode: "국립공원",
    address: "부산시 해운대구 해변로 456",
    tel: "051-1234-5678",
    thumbnailUrl: "/assets/image/infologo.png",
  },
  {
    campingIdx: 3,
    campingName: "춘천 힐링 오토캠핑장",
    campingIntro: "산속의 힐링 캠핑",
    campingType: "오토캠핑",
    campingManageMode: "민간",
    address: "강원도 춘천시 산길 789",
    tel: "033-1234-5678",
    thumbnailUrl: "/assets/image/infologo.png",
  },
  {
    campingIdx: 4,
    campingName: "가평 키즈 캠핑장",
    campingIntro: "아이들과 함께하는 캠핑",
    campingType: "키즈",
    campingManageMode: "공공",
    address: "경기도 가평군 자라섬로 101",
    tel: "031-1234-5678",
    thumbnailUrl: "/assets/image/infologo.png",
  },
  {
    campingIdx: 5,
    campingName: "태안 애견 글램핑",
    campingIntro: "반려동물과 함께하는 캠핑",
    campingType: "글램핑",
    campingManageMode: "민간",
    address: "충청남도 태안군 바다로 202",
    tel: "041-1234-5678",
    thumbnailUrl: "/assets/image/infologo.png",
  },
];

// 캠핑장 목록 조회 (로컬 데이터)
router.post("/getCampingList", (req, res) => {
  // 현재는 이 API가 고캠핑 API로 대체되어 있습니다.
  // 이 라우터는 로컬 샘플 데이터를 반환하는 용도로만 유지됩니다.
  res.json({
    status: 200,
    message: "이 API는 현재 GoCamping API로 대체되었습니다.",
    data: [],
    total: 0,
    page: 1,
    totalPages: 0,
  });
});

// 캠핑장 조회 로그 저장
router.post("/insertSearchLog", (req, res) => {
  try {
    const { campingIdx } = req.body;

    if (!campingIdx) {
      return res.status(400).json({
        status: 400,
        message: "캠핑장 ID가 필요합니다",
      });
    }

    console.log(`캠핑장 조회 로그 기록: ${campingIdx}`);

    // 실제 애플리케이션에서는 여기에 데이터베이스 저장 로직이 들어갑니다.
    // 현재는 간단히 로그만 출력하고 성공 응답을 반환합니다.

    res.json({
      status: 200,
      message: "캠핑장 조회 기록이 성공적으로 저장되었습니다",
      data: {
        campingIdx,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("캠핑장 조회 로그 저장 에러:", error);
    res.status(500).json({
      status: 500,
      message: "서버 오류가 발생했습니다",
      error: error.message,
    });
  }
});

// 캠핑장 상세 조회
router.get("/:id", (req, res) => {
  try {
    const campingIdx = parseInt(req.params.id);
    const camping = campings.find(c => c.campingIdx === campingIdx);

    if (!camping) {
      return res.status(404).json({
        status: 404,
        message: "캠핑장을 찾을 수 없습니다",
      });
    }

    res.json({
      status: 200,
      message: "캠핑장 상세정보를 성공적으로 조회했습니다",
      data: camping,
    });
  } catch (error) {
    console.error("캠핑장 상세 조회 에러:", error);
    res.status(500).json({
      status: 500,
      message: "서버 오류가 발생했습니다",
      error: error.message,
    });
  }
});

// 기본 라우트
router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "캠핑 API (로컬 데이터용)",
  });
});

module.exports = router;
