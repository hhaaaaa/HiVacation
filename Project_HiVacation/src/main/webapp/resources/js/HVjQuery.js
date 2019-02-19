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