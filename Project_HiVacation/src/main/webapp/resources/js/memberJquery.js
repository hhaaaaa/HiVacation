// ### 회원가입 시, 우편검색하면 input에 주소값 들어가게 ###
function connectSummonAddInputEventJoin() {
	$("#joinAddressSearchButton").click(function(){
		new daum.Postcode({
			oncomplete: function(data) {
		    	$("#joinPostNo").val(data.zonecode);
		    	$("#joinAddress").val(data.address);
			}
		}).open();
	});
}

// ### 회원정보 수정 시, 우편검색하면 input에 주소값 들어가게 ###
function connectSummonAddInputEventUpdate() {
	$("#updateAddressSearchButton").click(function(){
		new daum.Postcode({
			oncomplete: function(data) {
		    	$("#updatePostNo").val(data.zonecode);
		    	$("#updateAddress").val(data.address);
			}
		}).open();
	});
}

// ### 회원가입 시, ID 사용가능 여부 보여주는 ###
function connectIdCheckEvent() {
	$("#joinid").keyup(function() {
		var id = $(this).val();
		$.getJSON("member.id.check?hm_id="+id,function(data){
			if (id.length == 0) {
				$("#joinIdOk").text("미입력").css("color","grey");
			}else if (data.member[0] != null ) {
				$("#joinIdOk").text("id중복").css("color","red");
			}else{
				$("#joinIdOk").text("사용가능").css("color","green");
			}
		});
	});
}

// ### 회원 가입 후, 나의메뉴 보여주기/감추기 ###
var isMyMenuClicked = 1;
function myMenuLocationControl() {
	$("#afterLoginMenuDiv").click(function() {
		if (isMyMenuClicked == 1) {
			$("#myMenuTable").css("top", "40px");
		} else {
			$("#myMenuTable").css("top", "-130px");
		}
		isMyMenuClicked *= -1;
	});
}

//sns 글쓸때 file받아오기
var imgInputC = 0;
var imgI = 0;
function addFile(){
	$("#addFile").click(function(){
		imgInputC = imgInputC + 1;
		var input = $("<input>").attr("type","file").attr("name","file"+imgI).css("margin-left","-251px");
		imgI=imgI+1;
		var aTag = $("<a></a>").text("삭제");
		$(aTag).attr("onclick", "deleteFile(this)");
		var div = $("<div></div>").append(input,aTag);
		$("#fileTD").append(div);
	});
}

function deleteFile(addedFile){
	$(addedFile).parent().remove();
}
function getFileIndex(){
	$("#snsWriteButton").click(function(){
		$("#fileIndex").attr("value", imgInputC);
	});
}

var imgUpdateC = 0; //카운트
var imgUpdateI = 0; //인덱스
function addUpdateFile(){
	$("#addUpdateFile").click(function(){
		imgUpdateC = imgUpdateC + 1;
		var input = $("<input>").attr("type","file").attr("name","updateFile"+imgUpdateI).css("margin-left","-251px");
		imgUpdateI=imgUpdateI+1;
		var aTag = $("<a></a>").text("삭제");
		$(aTag).attr("onclick", "deleteFile(this)");
		var div = $("<div></div>").append(input,aTag);
		$("#fileTD").append(div);
	});
}

function getUpdateFileIndex(){
	$("#snsUpdateButton").click(function(){
		alert(imgUpdateC);
		$("#updateFileIndex").attr("value", imgUpdateC);
	});
}