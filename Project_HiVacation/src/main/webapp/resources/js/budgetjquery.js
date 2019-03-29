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
		$("#tourTD3").text(tourSum);
		$("#totalCost").text(tourSum+foodSum+sleepSum);
	});
	
	$("#foodTextarea").keyup(function(e) {
		foodSum = 0;
		var tourinput = $("#foodTextarea").val();
		var arr = tourinput.split('\n');
		
		for (var i = 0; i < arr.length; i++) {
			foodSum = foodSum + (arr[i] * 1);
		}
		$("#foodTD3").text(foodSum);
		$("#totalCost").text(tourSum+foodSum+sleepSum);
	});
	
	$("#sleepTextarea").keyup(function(e) {
		sleepSum = 0;
		var tourinput = $("#sleepTextarea").val();
		var arr = tourinput.split('\n');
		
		for (var i = 0; i < arr.length; i++) {
			sleepSum = sleepSum + (arr[i] * 1);
		}
		$("#sleepTD3").text(sleepSum);
		$("#totalCost").text(tourSum+foodSum+sleepSum);
	});
	
	$("#numPeople").keyup(function(e) {
		if (e.keyCode == 13) {
			$("#calculate").trigger("click");
		}
	});
	
	$("#calculate").click(function(){
		var numPeople = $("#numPeople").val()*1;
		if(numPeople!=0){
			$("#perPerson").text((tourSum+foodSum+sleepSum)/numPeople);
		}else{  
			$("#perPerson").text(tourSum+foodSum+sleepSum);
		}
	});
	
	
}