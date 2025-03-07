<script>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { apiClient } from "../utils/axios.js";
import chatUtil from "../utils/chat.util.js";
import commonUtil from "../utils/common-util.js";
import { CONSTANTS } from "../constants.js";

export default {
  name: "chat",
  setup() {
    const loginUser = ref(undefined);
    let chatManager = undefined;
    const showChat = ref(false);
    const userList = ref([]); // 채팅방 안에 들어오 유저 리스트
    const targetUser = ref(undefined);
    const chatInfoList = ref([]);
    const msg = ref("");
    const showChatController = () => {
      showChat.value = !showChat.value;
    };
    const doChatUser = async (user) => {
      targetUser.value = user;
      if (chatInfoList.value.length > 0) {
        chatInfoList.value = [];
      }
      await getChatRoomInfo(targetUser.value.chatIdx);
      // showLastIndex();

    };

    const handleInput = (e) => {
      msg.value = e.target.value;
    };

    const sendMsg = () => {
      // console.log("targetUserIdx : ", targetUser.value.targetIdx);
      const param = {
        chatIdx: targetUser.value.chatIdx,
        userIdx: loginUser.value.userIdx,
        targetIdx: targetUser.value.targetIdx,
        chatType: "ME",
        chatBody: msg.value,
        ProfileImg: "",
        NickName: "너야",
      };
      if (msg) {
        // chatManager.sendMessage(msg);
        chatInfoList.value.push(param);
        chatManager.sendMessage(param);
        const i = document.getElementById("chat-output");
        i.value = "";
        setTimeout(() => {
          showLastIndex();
        }, 100);
      }
    };

    /**
     * 인풋 내용 받기
     * @param e
     * @type HTMLInputElement
     * userIdx : 대상지
     * targetIdx : 목적지
     */
    const receiveHandler = (e) => {
      if (e.detail) {
        const c = e.detail;
        // 내가 채팅방에 들어온 사람의 메세지만 노출
        // 나머지는 db 조회해옴
        if (targetUser.value.targetIdx === c.userIdx) {

          if (loginUser.userIdx === c.userIdx) {
            c.chatType = "ME";
          } else {
            c.chatType = "YOU";
          }
          chatInfoList.value.push(e.detail);
          setTimeout(() => {
            showLastIndex();
          }, 100);
        }
      }
    };

    /**
     * 참여하고 있는 채팅방 조회
     * @returns {Promise<void>}
     */
    const getChatList = async () => {
      const d = await apiClient("chat/getChatUserList", {});
      if (d) {
        userList.value = d.data;
      }
    };

    /**
     * 채팅방 데이터 조회
     * @param chatIdx
     * @returns {Promise<void>}
     */
    const getChatRoomInfo = async (chatIdx) => {
      const d = await apiClient("chat/getChatInfoList", { chatIdx: chatIdx });
      if (d.data) {
        d.data.map(v => {
          if (v.userIdx === loginUser.value.userIdx) {
            v["chatType"] = "ME";
          } else {
            v["chatType"] = "YOU";
          }
          chatInfoList.value.push(v);
        });
      }
      setTimeout(() => {
        showLastIndex();
      }, 100);

    };

    /**
     * 타겟 제거
     */
    const clearTargetUser = () => {
      targetUser.value = undefined;
    };

    const getImgUrl = (f) => {
      if (f) {
        return commonUtil.getImgUrl(f);
      } else {
        return "/assets/image/profileImg.webp";
      }
    };

    /**
     * 가장 마지막 채팅 보기
     */
    const showLastIndex = () => {
      const c = document.getElementsByClassName("chat-info");
      if (c.length > 0) {
        const lastIndex = c.length - 1;
        c[lastIndex].scrollIntoView({ behavior: "smooth" });
      }
    };

    watch(() => showChat.value,
      () => {
        if (!showChat.value) targetUser.value = undefined;
      });

    onMounted(() => {
      chatInfoList.value = []; // 초기화
      const u = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
      if (u) {
        loginUser.value = JSON.parse(u);
        chatManager = new chatUtil();
        // console.log("chat : ", chatManager);
        chatManager.initChat();
        getChatList();
        addEventListener("RECEIVE_MESSAGE", receiveHandler);
      } else {
        console.log("no one here");
      }
    });
    const handleEnterEvent = (e) => {
      if (e.key === "Enter") {
        sendMsg();
      }
    };

    onUnmounted(() => {
      chatManager.destroyChat();
      removeEventListener("RECEIVE_MESSAGE", receiveHandler);
    });

    return {
      showChat,
      userList,
      targetUser,
      chatInfoList,
      handleEnterEvent,
      showLastIndex,
      showChatController,
      doChatUser,
      handleInput,
      sendMsg,
      clearTargetUser,
      getImgUrl,
    };
  },
  methods: {},
};
</script>
<template>
  <section class="chat">
    <div v-if="!showChat" class="floating-icon" @click="showChatController()"><i class="fa-regular fa-comment-dots"></i>
    </div>
    <transition v-else name="fade">
      <div class="main-area">
        <div class="title">
          <i v-if="targetUser" @click="clearTargetUser" class="fa-solid fa-angle-left"></i>
          CHAT
          <i class="fa-solid fa-x close" @click="showChatController()"></i>
        </div>
        <div v-if="!targetUser" class="body">
          <div class="user-list">
            <div v-for="user in userList" @click="()=>doChatUser(user)">
              <div class="user">
                <img :src="getImgUrl(user.userProfile[0]?.fileName)" alt="">
                {{ user.userNickName }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="chat-screen">
          <div v-for="chat in chatInfoList">
            <div class="chat-body" :class="chat.chatType">
              <img v-if="chat.chatType === 'YOU'" :src="getImgUrl(targetUser.userProfile[0]?.fileName)" alt="">
              <div class="chat-info" :class="chat.chatType">
                {{ chat.chatBody }}
              </div>
            </div>
          </div>
          <div class="chat-util">
            <input id="chat-output" type="text" @input="handleInput" @keydown="handleEnterEvent">
            <button @click="sendMsg">전송</button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>