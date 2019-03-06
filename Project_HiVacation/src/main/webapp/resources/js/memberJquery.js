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