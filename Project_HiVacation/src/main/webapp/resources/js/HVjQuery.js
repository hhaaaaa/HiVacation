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
var service;
var locLatLng;
var markers = [];
//var contentString = "표시하고싶은 정보 참고 : https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=ko";

function initMap() {
	var loadMap = document.getElementById('step1Map');
	if (loadMap != null) {
		map = new google.maps.Map(loadMap, {
			center: {lat: 37.5693619, lng: 126.9837841},
			zoom: 15,
			mapTypeControl: false
		});
	}
	//검색하면 -> dropAllMarker();
	
	/*marker.addListener('click', function(e) {
		showPlaceInfo();
	});
	google.maps.event.clearInstanceListeners(marker);*/
}

// 지역 검색 -> 지도 중앙 변경
function searchLocationByQuery() {
	var location;
	
	$("#step1SearchCity").keyup(function(e) {
		location = $(this).val();
		
		var request = {
			query: location,
			fields: ['name', 'geometry', 'place_id']
		};
		service = new google.maps.places.PlacesService(map);
		service.findPlaceFromQuery(request, function(results, status) {
	    	if (status === google.maps.places.PlacesServiceStatus.OK) {
	    		map.setCenter(results[0].geometry.location);
	    		// results[0].name/geometry/place_id 로 접근가능!
	    		locLatLng = new google.maps.LatLng({lat:map.getCenter().lat(), lng:map.getCenter().lng() });
	    	}
		});
	});
}

// 돋보기 클릭 -> 카테고리 검색
function searchDetailByKeyword() {
	// 엔터쳐도 검색될 수 있도록
	$("#step1SearchCategory").keyup(function(e) {
		if (e.keyCode == 13) {
			$("#step1SearchImg").trigger("click");
		}
	});
	
	var detail;
	$("#step1SearchImg").click(function() {
		detail = $("#step1SearchCategory").val();

		var request = {
			location: locLatLng,
			radius: '1000',			// m단위
			fields: ['name', 'geometry', 'place_id'],
			keyword: detail
			//type: ['restaurant']
		};
		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, function(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					alert(place);
					//createMarker(results[i]);
				}
			}
		});
	});
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