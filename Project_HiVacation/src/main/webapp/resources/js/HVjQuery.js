// 지도 ##############################################################
var no = 1;
function schedulingPaging() {
	$("#step1Menu").click(function() {
		$("#step" + no + "Div").css("left", "-1200px");
		$("#step" + no + "Menu").css("background-color", "white");
		$("#step" + no + "Menu").css("color", "grey");
		no = 1;
		$("#step" + no + "Div").css("left", "300px");
		$("#step" + no + "Menu").css("background-color", "grey");
		$("#step" + no + "Menu").css("color", "white");
	});
	$("#step2Menu").click(function() {
		$("#step" + no + "Div").css("left", "-1200px");
		$("#step" + no + "Menu").css("background-color", "white");
		$("#step" + no + "Menu").css("color", "grey");
		no = 2;
		$("#step" + no + "Div").css("left", "300px");
		$("#step" + no + "Menu").css("background-color", "grey");
		$("#step" + no + "Menu").css("color", "white");
	});
	$("#step3Menu").click(function() {
		$("#step" + no + "Div").css("left", "-1200px");
		$("#step" + no + "Menu").css("background-color", "white");
		$("#step" + no + "Menu").css("color", "grey");
		no = 3;
		$("#step" + no + "Div").css("left", "300px");
		$("#step" + no + "Menu").css("background-color", "grey");
		$("#step" + no + "Menu").css("color", "white");
	});
	$(".saveButtonScheDiv").click(function() {
		alert("저장할까요?");
	});
}

// 홈 지도 불러오기
var map;
var markers = [];
var contentString = "표시하고싶은 정보 참고 : https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=ko";

function initMap() {
	map = new google.maps.Map(document.getElementById('step1Map'), {
		center: {lat: 37.5693619, lng: 126.9837841},
		zoom: 15,
		mapTypeControl: false
	});
	
	//검색하면 -> dropAllMarker();
	
	/*marker.addListener('click', function(e) {
		showPlaceInfo();
	});
	google.maps.event.clearInstanceListeners(marker);*/
}

// 여행검색하면 마커 찍히도록
/*
function dropAllMarker() {
	clearMarkers();
	for (var i = 0; i < "검색된데이터위치".length; i++) {
		addMarkerWithTimeout("검색된데이터위치"[i], i * 200);
	}
}
function addMarkerWithTimeout(position, timeout) {
	window.setTimeout(function() {
		markers.push(new google.maps.Marker({
			position: position,
			map: map,
			animation: google.maps.Animation.DROP,
			title: "검색된이름"
		}));
	}, timeout);
}
// 끝나면 초기화해주기 위함
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}*/
     

// 마커 클릭했을 때, 정보 뜨도록
/*
function showPlaceInfo() {
	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 200
	});
	infowindow.open(map, markers);	// .open 공부 필요, markers 자리 어떻게 처리해야??
}*/


// -----------------------------------------------------

// 멤버 ##############################################################
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

var isMyMenuClicked = 0;
function myMenuLocationControl() {
	$("#afterLoginMenuDiv").click(function() {
		if (isMyMenuClicked == 0) {
			$("#myMenuTable").css("top", "40px");
			isMyMenuClicked = 1;
		} else {
			$("#myMenuTable").css("top", "-130px");
			isMyMenuClicked = 0;
		}
	});
}