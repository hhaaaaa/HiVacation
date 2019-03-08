var no = 1;
var map;
var service;
var serviceForDetail;
var locLatLng;
var markers = [];
var searchedResult = [];
var detailedResult = [];
var srIndex;
var infowindow;
var contentString = "hi";//"표시하고싶은 정보 참고 : https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=ko";

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
		searchedResult = [];
		detailedResult = [];
		srIndex = 0;
		
		clearMarkers();
		$("#step1ResultTd").empty();
		detail = $("#step1SearchCategory").val();

		var request = {
			location: locLatLng,
			radius: '4000',			// m단위
			fields: ['name', 'geometry', 'place_id', 'photos'],
			keyword: detail
		};
		service = new google.maps.places.PlacesService(map);
		// nearby 검색으로 위치, 장소명, place_id, 사진 챙기고,
		// detail 검색으로 별점, 전화번호, 주소, 웹사이트 챙기자!
		service.nearbySearch(request, function(results, status, pagination) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
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
			    } else {		// 더 이상 Nearby 검색 결과 페이지가 없을 경우에 다음과 같은 코드 수행
			    	// 모든 검색 결과 마커로 출력
			    	dropAllMarker(searchedResult);
			    	
			    	// 모든 검색 결과 테이블로 출력
			    	printSearchedResult(searchedResult);

			    	// 테이블, infowindow 출력 위한 상세 정보 검색
			    	printDetailInfo(searchedResult);
//			    	 -> 10개씩 처리해서 다음 다음 할 건지 고민해보기!
			    	
			    	// marker 클릭하면 infowindow 표시하기
//			    	google.maps.event.addListener(markers, 'click', function() {
//			    		alert('fff');
//			    		//showPlaceInfo();
//			    	});
			    	//google.maps.event.clearInstanceListeners(marker);
			    }
			    
			}
		});
	});
}
// ### 여행검색하면 마커 찍히도록 ###
function dropAllMarker(data) {
	for (var i = 0; i < data.length; i++) {
		addMarkerWithTimeout(data[i], 0);
	}
}
// ### 약간의 시간차가 있도록 마커 추가 (지금은 시간차 없게 0으로 설정) ###
function addMarkerWithTimeout(data, timeout) {
	window.setTimeout(function() {
		var marker = new google.maps.Marker({
			position: data.geometry.location,
			map: map,
			//animation: google.maps.Animation.BOUNCE,
			title: data.name
		})
		markers.push(marker);
		google.maps.event.addListener(marker, 'click', function() {
    		showPlaceInfo(marker);
    	});
	}, timeout);
}
// ### 검색 끝나면 마커 초기화 ###
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}
       
// ### 검색 결과 출력해주기 ###
function printSearchedResult(data) {
	var d;
	for (var i = 0; i < data.length; i++) {
		d = data[i];
		var td1 = $("<td></td>").html(d.name + "," + d.rating + "," + d.place_id);
//		테이블 클릭하면 맵 중앙 이동
//		$(td1).click(function() {
//			alert('ad');
//			map.setCenter(d.geometry.location);
//		});
//		// detail 정보 어떻게 받아와서 처리할 건지??
		var tr1 = $("<tr></tr>").append(td1);
		var table = $("<table></table>").append(tr1);
		$("#step1ResultTd").append(table);
	}
}

// ### 마커 클릭했을 때, InfoWindow 뜨도록 설정 ###
function showPlaceInfo(marker) {
	var infowindow = new google.maps.InfoWindow({
		content: contentString,
		maxWidth: 200
	});
	infowindow.open(map, marker);	// .open 공부 필요, markers 자리 어떻게 처리해야??
}

function printDetailInfo(searchedResult) {
	var requestsForDetail = [];
	serviceForDetail = new google.maps.places.PlacesService(map);
	
//[1] 10개씩 detail 요청하기
//	var resultLength = searchedResult.length;
//	var start = 0;
//	var end = 10;
//	for (var j = 0; j < 6; j++) {
//    	for (var i = start; i < end; i++) {
//    		if (i > resultLength) {
//				break;
//			}
//    		requestsForDetail[i] = {
//    			placeId: searchedResult[i].place_id,
//    			fields: ['name', 'rating', 'formatted_phone_number', 'international_phone_number',  
//    					'formatted_address', 'adr_address', 'url', 'website', 'geometry']
//    		};
//    		serviceForDetail.getDetails(requestsForDetail[i], function(place, status) {
//    			if (status == google.maps.places.PlacesServiceStatus.OK) {
//    				alert(place.formatted_phone_number + ", " + place.international_phone_number);
//    			}
//    		});
//		}
//    	start += 10;
//    	end += 10;
//	}
	
//[2] 한번에 다 요청받기
	for (var i = 0; i < searchedResult.length; i++) {
		requestsForDetail[i] = {
				placeId: searchedResult[i].place_id,
				fields: ['name', 'rating', 'formatted_phone_number', 'international_phone_number',  
					'formatted_address', 'adr_address', 'url', 'website', 'geometry']
		};
		serviceForDetail.getDetails(requestsForDetail[i], function(place, status) {
			// status가 OVER_QUERY_LIMIT일 때(빠른시간내 너무 많은 정보 요청), 1) 시간 텀을 둘 수 있게(요청당 2초?)
			// 													 2) 24시 이후에 요청
			//													 3) 새로운 응답만 DB로 저장해서, DB 데이터 사용
			if (status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {    
				setTimeout(function() {
					// ???
				}, 200);
			} else if (status == google.maps.places.PlacesServiceStatus.OK) {
				alert(place.formatted_phone_number + ", " + place.international_phone_number);
			}
		});
	}
}

function sleep(ms) 
{
    var start = new Date().getTime();
    var cur = start;
    while (cur - start < ms) 
    {
        cur = new Date().getTime();
    }
}

