<script>
import { onMounted, onUnmounted, ref } from "vue";
import commonUtil from "../utils/common-util.js";
import CustomButton from "../components/layout/customButton.vue";
import CustomInput from "../components/layout/customInput.vue";
import reportPopup from "../components/manager/popups/reportPopup.vue";
import dayjs from "dayjs";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { apiClient } from "../utils/axios.js";
import router from "../router/index.js";
import { CONSTANTS } from "../constants.js";
import { POPUP_TYPE, STORE_TYPE } from "../store/index.js";

export default {
  name: "snsBoardDetail",
  components: { CustomButton, CustomInput, reportPopup },

  setup() {
    const store = useStore();
    const route = useRoute();
    const boardIdx = ref();
    const boardData = ref();
    //로컬스토리지에 저장된 유저정보
    const userData = ref();
    const contentData = ref(undefined);
    // 해당 유저를 팔로우 하고 있는지, 아닌지
    const followType = ref({
      STATE: "UNFOLLOW",
    });
    const followData = ref({
      followType: "", // 내가 지금 팔로우 할 건지, 아닌지
      targetIdx: "",
      targetType: "USER",
    });
    const heartCount = ref(0);
    const heartState = ref({
      STATE: "DISLIKE",
    });
    const heartData = ref({
      targetIdx: "",
      likeType: "",
      targetType: "USER",
    });
    const bookmark = ref(false);
    const detailData = ref({
      boardIdx: "",
      followIdx: "",
      userIdx: "",
      targetType: "",
      dateReg: "",
      hashTag: "",
      boardBody: "",
      userNickName: "",
      likeState: [],
      userProfile: [],
      file: [],
    });
    const MyRerAction = ref(false);
    const RerAction = ref(false);
    const FollowBtnAction = ref(false);
    const reportAction = ref(false);
    const deleteData = ref({
      boardIdx: boardIdx.value,
    });

    const MySelectedComment = ref("");
    const selectedComment = ref("");

    const deleteCommentData = ref({
      commentIdx: "",
    });
    const tabIndex = ref(0);
    //유저데이터
    const getData = async () => {
      try {
        return (userData.value = commonUtil.parseJson(commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO)));
      } catch (e) {
        return e;
      }
    };
    //팔로우
    const followManager = async () => {
      if (followType.value.STATE === "UNFOLLOW") {
        //안하고있으니까
        followData.value.followType = "FOLLOW"; // 팔로우했다
        followType.value.STATE = "FOLLOW"; //상태도 팔로우상태
      } else {
        followData.value.followType = "UNFOLLOW"; //언팔했다
        followType.value.STATE = "UNFOLLOW"; //상태도 언팔
      }
      const data = await apiClient("/common/doFollow", followData.value);
    };
    //좋아요
    const doLike = async () => {
      try {
        if (heartState.value.STATE === "DISLIKE") {
          heartData.value.likeType = "LIKE";
          heartState.value.STATE = "LIKE";
          heartCount.value++;
        } else {
          heartData.value.likeType = "DISLIKE";
          heartState.value.STATE = "DISLIKE";
          heartCount.value -= 1;
        }

        const data = await apiClient("/common/doLike", heartData.value);
      } catch (error) {
        console.error("좋아요 처리 중 오류 발생:", error);

        // 롤백 (옵션) - 실패한 경우 상태 복구
        if (heartData.value.likeType === "LIKE") {
          heartState.value.STATE = "DISLIKE";
          heartCount.value--;
        } else {
          heartState.value.STATE = "LIKE";
          heartCount.value++;
        }

        // 사용자에게 알림 (선택)
        alert("좋아요 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };
    //상세 게시물 조회 api
    const getBoardDetail = async () => {
      const data = await apiClient("/sns/getSnsDetail", { boardIdx: boardIdx.value });
      if (data.data) {
        detailData.value = data.data;
      }
      // detailData.value = data.data;
      // if (detailData.value.userProfile) {
      // detailData.value.userProfile = detailData.value.userProfile.filter(v => v.fileType === "USER_PROFILE")[0];
      // }
      //filter로 타입이 user_profile 인것을 [0]로 넣는다
      // if (detailData.value) {
      //   followData.value.targetIdx = detailData.value.userIdx;
      //   heartData.value.targetIdx = detailData.value.boardIdx;
      // }
      commentList();
    };
    //신고창열기
    const goToReport = () => {
      store.commit(STORE_TYPE.popupType, POPUP_TYPE.REPORT);
    };
    //수정팝업열기
    const goToUpdate = detailData => {
      if (detailData) {
        store.commit(STORE_TYPE.popupType, POPUP_TYPE.WRITE_BOARD);
        store.commit(STORE_TYPE.detailData, detailData);
      }
    };
    const RerOption = () => {
      if (userData.value.userIdx === detailData.value.userIdx) {
        MyRerAction.value = !MyRerAction.value;
      } else {
        RerAction.value = !RerAction.value;
      }
    }; //수정신고삭제 옵션
    //난 팔로우버튼 안보이기
    const FollowBtn = () => {
      if (userData.value.userIdx !== detailData.value.userIdx) {
        FollowBtnAction.value = true;
      } else {
        FollowBtnAction.value;
      }
    };

    //신고팝업
    const reportPop = () => {
      reportAction.value = !reportAction.value;
    };
    //게시물 삭제 api
    const deleteContent = async () => {
      const check = confirm("삭제하시겠습니까?");
      if (check === true) {
        const data = await apiClient("/sns/deleteSns", { boardIdx: boardIdx.value });
        if (data.resultCode === 0) {
          window.alert("삭제되었습니다.");
          await router.push("/snsPage"); //새로고침
        } else {
          window.alert("다시시도해주세요");
        }
      }
    };
    //댓글 조회 api
    // const getComment = ref({ boardIdx: boardIdx.value });
    const commentListData = ref({ commentIdx: "" });
    const commentList = async () => {
      const data = await apiClient("/comment/getCommentList", { boardIdx: boardIdx.value });
      if (data.resultCode === 0) {
        commentListData.value = data.data;
      } else {
      }
    };
    //댓글 날짜
    const setDateValue = date => {
      const b = dayjs(date.dateReg, "YYYY-MM-DD HH:mm");
      return b.format("YYYY-MM-DD HH:mm");
    };
    //댓글 수정 신고 삭제 옵션
    const RerCommentOption = comment => {
      if (detailData.value.userIdx === userData.value.userIdx || userData.value.userIdx === comment.userIdx) {
        MySelectedComment.value = comment.commentIdx; //특정만 나와
        selectedComment.value = "";
      } else if (userData.value.userIdx !== comment.userIdx) {
        selectedComment.value = comment.commentIdx;
        MySelectedComment.value = "";
      }
    };
    const RerCancel = () => {
      MySelectedComment.value = "";
      selectedComment.value = "";
    };
    //댓글 추가 api
    const handleEnterEvent = e => {
      if (e.key === "Enter") {
        upComment();
        commentData.value.commentBody = "";
      }
    };
    const commentData = ref({ commentBody: "" });
    const upComment = async () => {
      let param = Object.assign({}, commentData.value, { boardIdx: boardIdx.value });
      const data = await apiClient("/comment/insertComment", param);
      if (data.resultCode === 0) {
        commentData.value.commentBody = "";
        await commentList();
      } else {
        window.alert("댓글을 입력해주세요");
      }
    };
    //댓글 삭제 api
    const putCommentIdx = commentIdx => {
      deleteCommentData.value.commentIdx = commentIdx;
      deleteComment();
    }; //댓글 idx를 리스트에 담는다.
    const deleteComment = async () => {
      const check = confirm("삭제하시겠습니까?");
      if (check === true) {
        const data = await apiClient("/comment/deleteComment", deleteCommentData.value);
        if (data.resultCode === 0) {
          window.alert("삭제되었습니다.");
          await getBoardDetail();
        } else {
          window.alert("다시 시도해주세요");
        }
      }
    };
    //팝업 닫기
    const goBack = () => {
      router.go(-1);
      //popup close
      // store.commit(STORE_TYPE.popupType, POPUP_TYPE.NONE);
      // store.commit(STORE_TYPE.contentData, "");
    };
    //북마크
    const bookmarkActive = () => {
      bookmark.value = !bookmark.value;
    };

    const nextOverImg = () => {
      if (tabIndex.value < detailData.value.file.length - 1) {
        tabIndex.value++;
      }
    };
    const beforeOverImg = () => {
      if (tabIndex.value > 0) {
        tabIndex.value--;
      }
    };
    const changeImg = index => {
      tabIndex.value = index;
    };
    const copyUrl = () => {
      let url = "";
      const urlInput = document.getElementById("urlInput");
      urlInput.value = window.document.location.href;
      urlInput.select();
      document.execCommand("copy");
      window.alert("복사되었습니다.");
    };
    const goTargetFeed = detailData => {
      if (userData.value?.userIdx === detailData.userIdx) {
        router.push("/myPage");
      } else {
        router.push(`/userFeed/${detailData.userIdx}`);
      }
    };

    const getImgUrl = file => {
      try {
        if (file) {
          return commonUtil.getImgUrl(file.fileName);
        }
      } catch (e) {
        return "./assets/image/camping.webp";
      }
    };

    const getProfileImg = file => {
      try {
        return commonUtil.getImgUrl(file.fileName);
      } catch (e) {
        return "assets/image/profileImg.webp";
      }
    };

    onMounted(() => {
      boardIdx.value = route.path.split("/")[3];
      getBoardDetail();
      getData();
    });

    // delete store boardIdx
    onUnmounted(() => {
      // closePopup();
    });

    return {
      userData,
      followType,
      followData,
      // getComment,
      deleteCommentData,
      commentListData,
      commentData,
      bookmark,
      heartCount,
      heartData,
      detailData,
      RerAction,
      MyRerAction,
      reportAction,
      selectedComment,
      MySelectedComment,
      contentData,
      tabIndex,
      goTargetFeed,
      copyUrl,
      goBack,
      nextOverImg,
      beforeOverImg,
      changeImg,
      RerCancel,
      FollowBtn,
      getData,
      handleEnterEvent,
      putCommentIdx,
      followManager,
      deleteComment,
      commentList,
      upComment,
      bookmarkActive,
      doLike,
      deleteContent,
      getBoardDetail,
      RerOption,
      RerCommentOption,
      goToReport,
      goToUpdate,
      reportPop,
      getImgUrl,
      setDateValue,
      getProfileImg,
    };
  },
};
</script>
<template>
  <div class="board-detail">
    <div class="board-detail-content">
      <div class="content">
        <div class="content-image">
          <div class="container" @click="RerOption">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
          <div class="mbContainer" @click="RerOption">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
          <div class="myPop" v-if="MyRerAction">
            <ul>
              <li @click="goToUpdate(detailData)">수정</li>
              <li @click="deleteContent">삭제</li>
              <!--              <li @click="reportPop">신고 <i class="fa-solid fa-circle-exclamation"></i></li>-->
            </ul>
          </div>
          <div class="pop" v-if="RerAction">
            <ul>
              <li @click="reportPop">신고 <i class="fa-solid fa-circle-exclamation"></i></li>
            </ul>
          </div>
          <div class="content-image-goBack" @click="goBack">
            <i class="fa-solid fa-chevron-left"></i>
          </div>
          <img :src="getImgUrl(detailData.file[tabIndex])" alt="" />
          <div v-if="detailData.file.length > 1" class="content-image-preview">
            <div class="content-image-preview-list" v-for="(item, index) in detailData.file">
              <img
                :tabindex="tabIndex"
                class="previewImg"
                @click="changeImg(index)"
                :src="getImgUrl(item)"
                alt="게사"
              />
            </div>
          </div>
          <span v-if="detailData.file.length > 1" @click="nextOverImg" class="right">
            <i class="fa-solid fa-chevron-right"></i>
          </span>
          <span v-if="detailData.file.length > 1" @click="beforeOverImg" class="left">
            <i class="fa-solid fa-chevron-left"></i>
          </span>
        </div>
        <div class="content-wrap">
          <div class="content-wrap-profile">
            <!--            {{ detailData.userProfile.fileName }}-->
            <img @click="goTargetFeed(detailData)" :src="getProfileImg(detailData.userProfile[0])" alt="프사" />
            <div class="content-wrap-profile-info">
              <div class="follow">
                <span>{{ detailData.userNickName }}</span>
                <custom-button
                  v-if="userData?.userIdx !== detailData.userIdx"
                  :placeholder="'팔로우'"
                  :custom-class="followType.STATE === 'FOLLOW' ? 'followActive' : 'follow_btn'"
                  @click="followManager"
                  @update:value="followData.targetIdx"
                ></custom-button>
              </div>
              <p class="content-wrap-profile-info-intro">{{ detailData.boardBody }}</p>
              <p class="content-wrap-profile-info-tag">{{ detailData.hashTag }}</p>
            </div>
          </div>
          <div class="content-wrap-emotion">
            <div class="content-wrap-emotion-like">
              <span v-if="heartCount < 1" @click="doLike"><i class="fa-regular fa-heart"></i></span>
              <span v-else @click="doLike"><i class="fa-solid fa-heart"></i></span>
              <span v-if="detailData.likeState.length === 0">{{ detailData.likeState.length }}</span>
              <span v-else>{{ detailData.likeState[0]?.count }}</span>
            </div>
            <div class="content-wrap-emotion-book">
              <input id="urlInput" />
              <button @click="copyUrl"><i class="fa-solid fa-share-nodes"></i></button>
            </div>
          </div>
        </div>
        <!--        댓글창-->
        <div class="content-line">
          <div class="content-line-wrap">
            <span>댓글{{ commentListData.length }}</span>
            <!--            <span>조회수 없음</span>-->
          </div>
        </div>
        <div class="content-enterComment">
          <div class="content-enterComment-wrap">
            <input
              placeholder="댓글을 입력해주세요. ⤶"
              v-model.trim="commentData.commentBody"
              @keydown="handleEnterEvent"
            />
          </div>
          <button @click="upComment"><i class="fa-regular fa-comment"></i></button>
        </div>
        <div class="content-null" v-if="commentListData.length === 0 || false">
          <div class="state">댓글이 없습니다.</div>
        </div>
        <div class="content-comments" v-for="item in commentListData" v-else>
          <img :src="item.file ? getProfileImg(item.file[0]) : ''" alt="프사" />
          <div class="content-comments-wrap">
            <span>{{ item.userNickName }}</span>
            <p>{{ item.commentBody }}</p>
          </div>
          <div class="content-comments-option">
            <span class="date">{{ setDateValue(item) }}</span>
            <span> <i class="fa-regular fa-comment"></i></span>
            <span @click="RerCommentOption(item)"><i class="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
          <div>
            <div class="commentPop" v-if="item.commentIdx === MySelectedComment">
              <ul>
                <li @click="putCommentIdx(item.commentIdx)">삭제</li>
                <li @click="reportPop">신고</li>
                <li @click="RerCancel">취소</li>
              </ul>
            </div>
            <div class="commentPop" v-if="item.commentIdx === selectedComment">
              <ul>
                <li @click="reportPop">신고</li>
                <li @click="RerCancel">취소</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="reportAction" class="detailBlack" :style="{ body: 'overflow: hidden' }">
    <report-popup :reportPop="reportPop"></report-popup>
  </div>
</template>
