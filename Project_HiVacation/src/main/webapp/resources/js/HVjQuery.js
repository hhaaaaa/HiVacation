var no = 1;

function schedulingPaging() {
	$(".nextButtonScheDiv").click(function() {
		$("#step" + no + "Div").css("left", "1800px");
		no += 1;
		$("#step" + no + "Div").css("left", "305px");
	});
	$(".prevButtonScheDiv").click(function() {
		$("#step" + no + "Div").css("left", "-1200px");
		no -= 1;
		$("#step" + no + "Div").css("left", "305px");
	});
	$(".saveButtonScheDiv").click(function() {
		alert("저장할까요?");
	});
}

function connectSummonAddInputEvent() {
	$("#joinAddressSearchButton").click(function(){
		 new daum.Postcode({
		        oncomplete: function(data) {
		        	$("#joinPostNo").val(data.zonecode);
		        	$("#joinAddress").val(data.address);

		        }
		    }).open();
	});
}

function connectiIdCheckEvent() {
	$("#joinid").keyup(function() {
		var id = $(this).val();
		$.getJSON("member.id.check?hm_id="+id,function(data){
			if (id.length == 0) {
				$("#joinIdOk").text("미입력").css("color","grey");
			}else if (data.member[0] != null ) {
				$("#joinIdOk").text("id중복").css("color","red");
			}else{
				$("#joinIdOk").text("사용가능").css("color","grey");
			}
		});
	});
}