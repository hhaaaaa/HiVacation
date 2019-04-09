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

function goSnsView(hs_no, member){
	if (member.length == 0) {
		alert("로그인 후 이용 가능합니다.");
	} else {
		location.href="go.sns.view?hs_no="+hs_no;
	}
}

function doSNSDelete(hs_no){	
	var ok = confirm("삭제하시겠습니까?");
	if(ok){
		location.href="do.sns.delete?hs_no="+hs_no;
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

function goCalendar(){
	location.href="go.calendar";
}

function goMyPage() {
	location.href="go.mypage";
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

function goSnsReplyUpdate(){
	$(".snsReplyUpdateButton").click(function(){
		var changeText = prompt("댓글 수정");
		var btn = $(this);
		$.ajax({
			url : "go.snsReply.update?hr_no="+btn.attr("rel")+"&hr_text="+changeText,
			success : function(data){
				if(data=='1'){
					if(changeText!=null){
						btn.parent().parent().find(".replyText").text(changeText);
					}else{
						return false;
					}
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


// ### 이미지 클릭 시 확대/축소 ###
function doImgPop(img){ 
	img1= new Image(); 
	img1.src=(img); 
	imgControll(img); 
}   
function imgControll(img){ 
	if((img1.width!=0)&&(img1.height!=0)){ 
		 viewImage(img); 
	} 
	else{ 
		controller="imgControll('"+img+"')"; 
	     intervalID=setTimeout(controller,20); 
	}  
}
function viewImage(img){ 
	W=img1.width; 
	H=img1.height; 
	if (W > 650) { W = 650; }
	if (H > 590) { H = 590; }
	O="width=" + W + ",height=" + H + ",scrollbars=yes"; 
	
	imgWin=window.open("","",O); 
	imgWin.document.write("<html><head><title>이미지 상세보기</title></head>");
	imgWin.document.write("<body topmargin=0 leftmargin=0>");
	imgWin.document.write("<img src=" + img + " onclick='self.close()' style='cursor:pointer; height:" + H + ";' title ='클릭하시면 창이 닫힙니다.'>");
	imgWin.document.close();
}


function aboutUsImgClick() {
	$("#hiImg").mouseenter(function() {
		$("#madeBy").css("color", "#2eb8b8");
	});
	$("#hiImg").mouseleave(function() {
		$("#madeBy").css("color", "grey");
	});
	$("#tionImg").mouseenter(function() {
		$("#howToUse").css("color", "#2eb8b8");
	});
	$("#tionImg").mouseleave(function() {
		$("#howToUse").css("color", "grey");
	});
	
	$("#hiImg").click(function() {
		$("#howToUse").css("text-decoration", "none");
		$("#madeBy").css("text-decoration", "underline");
		$("#howToUseTotal").css("left", "-2000px");
		$("#madeByTotal").css("left", "0px");
	});
	$("#tionImg").click(function() {
		$("#madeBy").css("text-decoration", "none");
		$("#howToUse").css("text-decoration", "underline");
		$("#madeByTotal").css("left", "-2000px");
		$("#howToUseTotal").css("left", "0px");
		
		pagingIndex = 1;
		$("#howToUseStep1").css("left", "0px");
		$("#howToUseStep2").css("left", "-1600px");
		$("#howToUseStep3").css("left", "-1600px");
		$("#howToUseStep4").css("left", "-1600px");
		$("#howToUseStep5").css("left", "-1600px");
		$("#howToUseStep6").css("left", "-1600px");
		$("#howToUseStep7").css("left", "-1600px");
	});
}

var pagingIndex = 1;
function howToUsePaging() {
	
	$(".howToUseBeforeButton").click(function() {
		$("#howToUseStep"+pagingIndex).css("left", "-1600px");
		pagingIndex -= 1;
		$("#howToUseStep"+pagingIndex).css("left", "0px")
	});
	$(".howToUseNextButton").click(function() {
		$("#howToUseStep"+pagingIndex).css("left", "-1600px");
		pagingIndex += 1;
		$("#howToUseStep"+pagingIndex).css("left", "0px");
	});
}



