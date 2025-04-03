const express = require("express");
const router = express.Router();
const axios = require("axios");

// GoCamping API 키 (URL 인코딩된 형태로 제공)
const API_KEY = "IEdTGqhPUIxJy5mLBtkjPw6g%2BaTd90KXgnnc03HRNuD2NUPhtSQ307ZhzYx3n51j%2FpjYn5Hteigqp1cro1Rg6w%3D%3D";
const BASE_URL = "http://apis.data.go.kr/B551011/GoCamping";

// 로그에 API 키 확인 (마스킹하여 표시)
const maskedKey = API_KEY.substring(0, 10) + "..." + API_KEY.substring(API_KEY.length - 5);
console.log("API 키 확인 (마스킹됨):", maskedKey);

// GoCamping API 목록 조회
router.post("/getCampingList", async (req, res) => {
  console.log("GoCamping API 호출됨:", req.body);

  try {
    const { page = 1, keyWord = "", isAnimal = false, campingIdx = null } = req.body;

    // 페이지 당 아이템 수
    const numOfRows = req.body.numOfRows || 10;

    // API 요청 파라미터 설정
    const params = {
      serviceKey: API_KEY, // URL 인코딩된 상태 그대로 사용
      pageNo: page,
      numOfRows,
      MobileOS: "ETC",
      MobileApp: "CampingPront",
      _type: "json",
    };

    // searchList API는 keyword 파라미터가 필수임
    // 키워드가 없는 경우 기본 키워드 사용
    if (!keyWord || keyWord.trim() === "") {
      params.keyword = "야영장";
    } else {
      params.keyword = keyWord;
    }

    // API 요청 URL (항상 searchList 사용)
    const requestUrl = `${BASE_URL}/searchList`;

    console.log("GoCamping API 요청 파라미터:", {
      ...params,
      serviceKey: maskedKey, // 로그에서는 마스킹된 키 표시
    });

    console.log("GoCamping API 요청 URL:", requestUrl);

    // 완성된 URL 파라미터 디버깅용
    const paramsString = Object.keys(params)
      .map(key => {
        if (key === "serviceKey") {
          return `${key}=${params[key].substring(0, 10)}...`;
        }
        return `${key}=${params[key]}`;
      })
      .join("&");
    console.log("최종 요청 URL 파라미터:", paramsString);

    // API 호출
    const response = await axios.get(requestUrl, {
      params,
      paramsSerializer: params => {
        return Object.keys(params)
          .map(key => {
            // serviceKey는 이미 인코딩되어 있으므로 그대로 사용
            if (key === "serviceKey") {
              return `${key}=${params[key]}`;
            }
            // 나머지 파라미터는 인코딩
            return `${key}=${encodeURIComponent(params[key])}`;
          })
          .join("&");
      },
    });

    console.log("GoCamping API 응답 받음:", response.status);
    console.log("GoCamping API 응답 데이터 타입:", typeof response.data);

    // XML 응답 처리 (에러 응답이 XML 형식일 수 있음)
    if (typeof response.data === "string" && response.data.includes("OpenAPI_ServiceResponse")) {
      console.error("XML 형식의 에러 응답:", response.data);

      if (response.data.includes("SERVICE_KEY_IS_NOT_REGISTERED_ERROR")) {
        throw new Error("API 키가 등록되지 않았거나 유효하지 않습니다. 활용 신청 후 발급된 인증키를 사용해 주세요.");
      }

      throw new Error("API 서버에서 에러 응답이 반환되었습니다.");
    }

    // API 응답 확인
    if (response.data && response.data.response && response.data.response.body) {
      const apiData = response.data.response.body;

      console.log("GoCamping API 데이터:", {
        totalCount: apiData.totalCount,
        numOfRows: apiData.numOfRows,
        pageNo: apiData.pageNo,
        hasItems: !!apiData.items,
      });

      // 아이템이 없는 경우 처리
      if (!apiData.items || !apiData.items.item || apiData.items.item.length === 0) {
        console.log("검색 결과가 없습니다.");
        return res.json({
          status: 200,
          message: "검색 결과가 없습니다",
          data: [],
          total: 0,
          page: parseInt(page),
          totalPages: 0,
        });
      }

      // 단일 항목인 경우 배열로 변환
      const items = Array.isArray(apiData.items.item) ? apiData.items.item : [apiData.items.item];

      // 데이터 변환 (프론트엔드에서 사용하는 형식으로)
      let formattedData = items.map(item => ({
        campingIdx: item.contentId,
        campingName: item.facltNm,
        campingIntro: item.lineIntro || item.intro || "소개 정보가 없습니다.",
        campingType: item.induty,
        campingManageMode: item.facltDivNm,
        address: item.addr1 + (item.addr2 ? " " + item.addr2 : ""),
        tel: item.tel,
        thumbnailUrl: item.firstImageUrl || "/assets/image/infologo.png",
        // 추가 정보
        latitude: item.mapY,
        longitude: item.mapX,
        operDeCl: item.operDeCl,
        operPdCl: item.operPdCl,
        sbrsCl: item.sbrsCl,
        doNm: item.doNm,
        sigunguNm: item.sigunguNm,
        homepage: item.homepage,
        resveUrl: item.resveUrl,
        resveCl: item.resveCl,
        posblFcltyCl: item.posblFcltyCl,
        getInAnimal: item.animalCmgCl === "Y" ? "가능" : "불가능",
      }));

      // 반려동물 필터 적용
      if (isAnimal) {
        console.log("반려동물 가능 필터 적용");
        formattedData = formattedData.filter(item => item.getInAnimal === "가능");
      }

      // 특정 캠핑장 ID로 필터링이 필요한 경우
      if (campingIdx) {
        // 첫 페이지에서 캠핑장 ID 찾기
        formattedData = formattedData.filter(item => String(item.campingIdx) === String(campingIdx));

        // 첫 페이지에서 찾지 못한 경우 추가 페이지 검색
        if (formattedData.length === 0 && apiData.totalCount > numOfRows) {
          console.log(`ID가 ${campingIdx}인 캠핑장을 첫 페이지에서 찾지 못했습니다. 추가 페이지 검색 시도...`);

          // 데이터가 많을 수 있으므로 최대 5페이지까지만 검색
          const maxPage = Math.min(5, Math.ceil(apiData.totalCount / numOfRows));

          for (let pg = 2; pg <= maxPage; pg++) {
            console.log(`페이지 ${pg} 검색 중...`);

            const moreParams = { ...params, pageNo: pg };
            try {
              const moreResponse = await axios.get(requestUrl, {
                params: moreParams,
                paramsSerializer: params => {
                  return Object.keys(params)
                    .map(key => {
                      if (key === "serviceKey") {
                        return `${key}=${params[key]}`;
                      }
                      return `${key}=${encodeURIComponent(params[key])}`;
                    })
                    .join("&");
                },
              });

              if (
                moreResponse.data &&
                moreResponse.data.response &&
                moreResponse.data.response.body &&
                moreResponse.data.response.body.items &&
                moreResponse.data.response.body.items.item
              ) {
                const moreItems = Array.isArray(moreResponse.data.response.body.items.item)
                  ? moreResponse.data.response.body.items.item
                  : [moreResponse.data.response.body.items.item];

                const moreData = moreItems.map(item => ({
                  campingIdx: item.contentId,
                  campingName: item.facltNm,
                  campingIntro: item.lineIntro || item.intro || "소개 정보가 없습니다.",
                  campingType: item.induty,
                  campingManageMode: item.facltDivNm,
                  address: item.addr1 + (item.addr2 ? " " + item.addr2 : ""),
                  tel: item.tel,
                  thumbnailUrl: item.firstImageUrl || "/assets/image/infologo.png",
                  latitude: item.mapY,
                  longitude: item.mapX,
                  operDeCl: item.operDeCl,
                  operPdCl: item.operPdCl,
                  sbrsCl: item.sbrsCl,
                  doNm: item.doNm,
                  sigunguNm: item.sigunguNm,
                  homepage: item.homepage,
                  resveUrl: item.resveUrl,
                  resveCl: item.resveCl,
                  posblFcltyCl: item.posblFcltyCl,
                  getInAnimal: item.animalCmgCl === "Y" ? "가능" : "불가능",
                }));

                // 반려동물 필터 적용
                if (isAnimal) {
                  moreData = moreData.filter(item => item.getInAnimal === "가능");
                }

                const foundItems = moreData.filter(item => String(item.campingIdx) === String(campingIdx));
                if (foundItems.length > 0) {
                  console.log(`ID가 ${campingIdx}인 캠핑장을 페이지 ${pg}에서 찾았습니다.`);
                  formattedData = foundItems;
                  break;
                }
              }
            } catch (err) {
              console.error(`페이지 ${pg} 검색 중 오류 발생:`, err.message);
            }
          }
        }

        // 모든 페이지를 검색해도 해당 ID의 캠핑장이 없는 경우
        if (formattedData.length === 0) {
          console.log(`ID가 ${campingIdx}인 캠핑장을 찾을 수 없습니다.`);
          return res.json({
            status: 404,
            message: `ID가 ${campingIdx}인 캠핑장을 찾을 수 없습니다`,
            data: [],
            total: 0,
            page: parseInt(page),
            totalPages: 0,
          });
        }
      }

      console.log(`${formattedData.length} 개의 캠핑장 데이터 반환`);

      res.json({
        status: 200,
        message: "캠핑장 목록을 성공적으로 조회했습니다",
        data: formattedData,
        total: apiData.totalCount,
        page: parseInt(apiData.pageNo),
        totalPages: Math.ceil(apiData.totalCount / numOfRows),
      });
    } else {
      console.error("API 응답이 유효하지 않음:", response.data);
      throw new Error("API 응답 데이터가 유효하지 않습니다.");
    }
  } catch (error) {
    console.error("GoCamping API 조회 에러:", error.message);
    if (error.response) {
      console.error("API 응답 코드:", error.response.status);
      console.error("API 응답 데이터:", error.response.data);
    }
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
    message: "GoCamping API가 성공적으로 통합되었습니다",
  });
});

module.exports = router;
