//naver
import axios from "axios";

const naverService = () => {
	const naverLogin = new window.naver.LoginWithNaverId({
		clientId: "OkM9Pejxzz2VszesqaQP",
		callbackUrl: "http://localhost:3001/#/auth",
		isPopup: false /* 팝업을 통한 연동처리 여부 */,
		loginButton: {
			color: "green",
			type: 3,
			height: 60,
		},
	});
	const setNaver = () => {
		naverLogin.init();
	};

	const getUserInfo = () => {
		setNaver();
		naverLogin.getLoginStatus(status => {
			if (status) {
				const email = naverLogin.user.email;
				const name = naverLogin.user.name;
				//console.log(email, name);
			} else {
				//console.log("AccessToken 이 올바르지 않습니다.");
			}
		});
	};
	return {
		setNaver,
		getUserInfo,
	};
};
//kakao
const kakaoHeader = {
	Authorization: "718880fa9ea840e5cfcb48334f3aa23a",
	"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
};
const getKakaoToken = async code => {
	//console.log("loginWithKakao");
	try {
		const data = {
			grant_type: "authorization_code",
			client_id: "7baeb4fcdff6c3a66a5ec4762c5d7f02",
			redirect_uri: "http://localhost:3001/#/auth",
			code: code,
		};
		const queryString = Object.keys(data)
			.map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
			.join("&");
		//console.log(queryString);
		//console.log(("https://kauth.kakao.com/oauth/token", queryString, { headers: kakaoHeader }));
		const result = await axios.post("https://kauth.kakao.com/oauth/token", queryString, { headers: kakaoHeader });
		//console.log("카카오 토큰", queryString);
		//console.log(result);
		return result;
	} catch (e) {
		return e;
	}
};
const getKakaoUserInfo = async () => {
	let data = "";
	await window.Kakao.API.request({
		url: "/v2/user/me",
		success: function(response) {
			data = response;
		},
		fail: function(error) {
			//console.log(error);
		},
	});
	//console.log("카카오 계정 정보", data);
	return data;
};
