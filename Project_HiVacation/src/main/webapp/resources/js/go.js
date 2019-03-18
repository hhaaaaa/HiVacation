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

var checkBox = 0;
function doWithdraw(hm_pw) {
	if (checkBox == 0) {
		$("#withdrawPwCheck").css("top", "500px").css("left", "602px");
		checkBox = 1;
	} else {
		$("#withdrawPwCheck").css("top", "-500px");
		checkBox = 0;
	}
	
	$("#withdrawOK").click(function(){
		var pw = $("#wpcPW").val();
		if(pw==hm_pw){
			location.href="do.withdraw";
		}else{
			alert("비밀번호가 틀립니다.");
			location.href="go.update";
		}
	});
}
