function budgetAdd() {
	var tourSum=0; 
	var foodSum=0;
	var sleepSum=0;
	var totalCost=0;
	$("#tourTextarea").keyup(function(e) {
		tourSum = 0;
		var tourinput = $("#tourTextarea").val();
		var arr = tourinput.split('\n');
		for (var i = 0; i < arr.length; i++) {
			tourSum = tourSum + (arr[i] * 1);
		}
		$("#tourTD3").text(numberWithCommas(tourSum));
		$("#totalCost").text(numberWithCommas(tourSum+foodSum+sleepSum));
	});
	
	$("#foodTextarea").keyup(function(e) {
		foodSum = 0;
		var tourinput = $("#foodTextarea").val();
		var arr = tourinput.split('\n');
		
		for (var i = 0; i < arr.length; i++) {
			foodSum = foodSum + (arr[i] * 1);
		}
		$("#foodTD3").text(numberWithCommas(foodSum));
		$("#totalCost").text(numberWithCommas(tourSum+foodSum+sleepSum));
	});
	
	$("#sleepTextarea").keyup(function(e) {
		sleepSum = 0;
		var tourinput = $("#sleepTextarea").val();
		var arr = tourinput.split('\n');
		
		for (var i = 0; i < arr.length; i++) {
			sleepSum = sleepSum + (arr[i] * 1);
		}
		$("#sleepTD3").text(numberWithCommas(sleepSum));
		$("#totalCost").text(numberWithCommas(tourSum+foodSum+sleepSum));
	});
	
	$("#numPeople").keyup(function(e) {
		if (e.keyCode == 13) {
			$("#calculate").trigger("click");
		}
	});
	
	$("#calculate").click(function(){
		var numPeople = $("#numPeople").val()*1;
		if(numPeople!=0){
			$("#perPerson").text(numberWithCommas((tourSum+foodSum+sleepSum)/numPeople));
		}else{  
			$("#perPerson").text(numberWithCommas(tourSum+foodSum+sleepSum));
		}
	});
	
}

// ### 숫자 3자리마다 , 붙이고 소수점 이하 버리기 ###
function numberWithCommas(double) {
	var parts = double.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	return parts[0];
}


