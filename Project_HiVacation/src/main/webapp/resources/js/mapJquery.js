var no = 1;
var map;
var service;
var locLatLng;
var markers = [];
var searchedResult = [];
var srIndex;
//var contentString = "표시하고싶은 정보 참고 : https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=ko";

// ### 홈 페이지 화면 조정 ###
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

// ### 홈 지도 불러오기 ###
function initMap() {
	var loadMap = document.getElementById('step1Map');
	if (loadMap != null) {
		map = new google.maps.Map(loadMap, {
			center: {lat: 37.5693619, lng: 126.9837841},
			zoom: 15,
			mapTypeControl: false
		});
	}
}

// ### 지역 검색 -> 지도 중앙 변경 ###
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

// ### 돋보기 클릭 -> 카테고리 검색 ###
function searchDetailByKeyword() {
	// 엔터쳐도 검색될 수 있도록
	$("#step1SearchCategory").keyup(function(e) {
		if (e.keyCode == 13) {
			$("#step1SearchImg").trigger("click");
		}
	});
	
	var detail;
	$("#step1SearchImg").click(function() {
		var start = -20;
		var end = -1;
		searchedResult = [];
		srIndex = 0;
		detail = $("#step1SearchCategory").val();

		var request = {
			location: locLatLng,
			radius: '4000',			// m단위
			fields: ['name', 'geometry', 'place_id', 'formatted_address', 
					 'formatted_phone_number', 'icon', 'photos', 'rating', 
					 'url', 'website'],
			keyword: detail
			//type: ['restaurant']
		};
		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, function(results, status, pagination) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				start += 20;
				if (results.length < 20) {end += results.length;} 
				else {end += 20;}
				
				for (var i = 0; i < results.length; i++) {
					// 모든 페이지의 마커 한번에 출력할 수 있도록
					searchedResult[srIndex] = results[i];
					srIndex += 1;
				}
				
				// 검색 결과 20개보다 많을경우(페이지 넘어갈 때) 처리
				getNextPage = pagination.hasNextPage && function() {
			    	pagination.nextPage();
			    };
			    if (getNextPage) {
			    	getNextPage();
			    }
			    // 모든 검색 결과 마커로 출력
			    dropAllMarker(searchedResult);
			    
			    // 모든 검색 결과 테이블로 출력
			    printSearchedResult(searchedResult, start, end);
			    
				/*marker.addListener('click', function(e) {
					showPlaceInfo();
				});
				google.maps.event.clearInstanceListeners(marker);*/
			}
		});
		// 여기다하면 2초문제 해결할 수 있을것같은데...
		//dropAllMarker(searchedResult);
	});
}
// ### 여행검색하면 마커 찍히도록 ###
function dropAllMarker(data) {
	//clearMarkers();
	for (var i = 0; i < data.length; i++) {
		addMarkerWithTimeout(data[i], 0);
	}
}
// ### 약간의 시간차가 있도록 마커 추가 (지금은 시간차 없게 0으로 설정) ###
function addMarkerWithTimeout(data, timeout) {
	window.setTimeout(function() {
		markers.push(new google.maps.Marker({
			position: data.geometry.location,
			map: map,
			//animation: google.maps.Animation.BOUNCE,
			title: data.name
		}));
	}, timeout);
}
// ### 검색 끝나면 마커 초기화 ###
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}
       
// 검색 결과 출력해주기
function printSearchedResult(data, start, end) {
	//alert(data.length);
	alert(end - start + 1);
//	for (var i = start; i < end; i++) {
//		alert(searchedResult[i].name);
//	}
//	alert(searchedResult[1].photos);
//	alert(searchedResult[1].formatted_phone_number);
//	alert(searchedResult[1].formatted_address);
//	alert(searchedResult[1].url);
//	alert(searchedResult[1].website);
//	alert(searchedResult[1].rating);
//	alert(searchedResult[0].icon);
//	var td1 = $("<td></td>").
//  var tr1 = $("<tr></tr>").append(td1, );
//    $("<table></table>").append(tr1, );
}

// ### 마커 클릭했을 때, InfoWindow 뜨도록 설정 ###
/*
function showPlaceInfo() {
	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 200
	});
	infowindow.open(map, markers);	// .open 공부 필요, markers 자리 어떻게 처리해야??
}*/

