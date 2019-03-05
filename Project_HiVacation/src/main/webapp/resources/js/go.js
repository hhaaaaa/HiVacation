function goPageInfo() {
	location.href="go.pageInfo";
}

function goLogin() {
	location.href="go.login";
}

function goJoin() {
	location.href="go.join";
}

function doLogout() {
	location.href="do.logout";
}

function goHome() {
	location.href="go.home";
}

function goSns() {
	location.href="go.sns";
}

function goSnsWrite() {
	location.href="go.sns.write";
} 

function goUpdate() {
	location.href="go.update";
}

function doWithdraw(hm_pw) {
	
	var presentPW = prompt('비밀번호를 입력하세요.','');
	if(presentPW==hm_pw){
		location.href="do.withdraw";
	}else if(presentPW==null){
		location.href="go.update";
	}else{
		alert("비밀번호가 틀립니다.");
		location.href="go.update";
	}
}
