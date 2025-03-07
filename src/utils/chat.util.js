import { io } from "socket.io-client";
import { CONSTANTS } from "../constants.js";
import commonUtil from "./common-util.js";

const CHAT_TYPE = {
  CONNECT: "connect",
  SEND: "send",
  RECEIVE: "receive",
  EXIT: "exit",
};

export default class chatUtil {
  socket;
  loginUser;

  constructor() {
    this.receiveHandler = this.receiveHandler.bind(this);
    const d = commonUtil.getLocalStorage(CONSTANTS.KEY_LIST.USER_INFO);
    if (d) this.loginUser = JSON.parse(d);
  }

  initChat() {
    this.socket = io(CONSTANTS.CHAT_SERVER, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      reconnectionAttempts: 100, // returns it if no parameters are passed
    });
    // console.log(this.socket);
    if (this.socket) {
      this.onSubscribe();
    }
  }

  destroyChat() {
    console.log("destroy chat util");
    this.socket.off(CHAT_TYPE.RECEIVE);
  }

  sendMessage(v) {
    this.socket.emit(CHAT_TYPE.SEND, v);
  }

  onSubscribe() {
    this.socket.on(CHAT_TYPE.CONNECT, () => {
      console.log("connect chat util");
    });
    this.socket.on(CHAT_TYPE.RECEIVE, this.receiveHandler);
  }

  receiveHandler(e) {
    if (e.data.targetIdx === this.loginUser.userIdx) {
      dispatchEvent(new CustomEvent("RECEIVE_MESSAGE", { detail: e.data }));
    }
  }
}
