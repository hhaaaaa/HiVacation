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

function goSnsView(hs_no){  
	location.href="go.snsView?hs_no="+hs_no;
}

function doSNSDelete(hs_no){	
	var ok = confirm("삭제하시겠습니까?");
	if(ok){
		location.href="do.snsDelete?hs_no="+hs_no;
	}else{
		return false;
	}
}

function goSNSUpdate(hs_no){	
	location.href="go.sns.update?hs_no="+hs_no;
}

function doSNSUpdate(){	
location.href="do.sns.update";
}

function eachIMGdelete(hi_no) {
$(".imgDeletButton").click(function(){
	var btn = $(this)
	$.ajax({
		url : "do.img.delete?hi_no="+btn.attr("rel"),
		success : function(data){
			if(data=='1'){
				console.log(btn)
				btn.parent().parent().remove();
			}
		}
	});
})
}

function doSnsReplyDelete(){
	$(".snsReplyDeleteButton").click(function(){
		var btn = $(this);
		$.ajax({
			url : "do.snsReply.delete?hr_no="+btn.attr("rel"),
			success : function(data){
				if(data=='1'){
					btn.parent().parent().remove();
				}
			}
		})
	});
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
