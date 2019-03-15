var no = 1;
var map;
var service;
var serviceForDetail;
var locLatLng;
var markers = [];
var searchedResult = [];
var detailedResult = [];
var srIndex;

// ################################### Step1 ###################################
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
		
		// 각 찜 영역의 데이터 출력
		printLikedPlaceIntoEachArea();
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
		$("#step1ResultDiv").empty();
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

			    	// 상세 정보 요청해서 테이블 출력
			    	printDetailInfo(searchedResult);
			    }
			    
			}
		});
	});
}

// ### 여행검색하면 마커 찍히도록 ###
function dropAllMarker(data) {
	for (var i = 0; i < data.length; i++) {
		addMarkerWithTimeout(data[i]);
	}
}
	// 마커 추가, 마커 클릭하면 showPlaceInfo() 부르기
function addMarkerWithTimeout(data) {
	var marker = new google.maps.Marker({
		position: data.geometry.location,
		map: map,
		title: data.name
	})
	markers.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		var request = {
				placeId: data.place_id,
				fields: ['name', 'rating', 'formatted_phone_number',  
					'formatted_address', 'url', 'website', 'geometry', 'types']
		};
		serviceForDetail.getDetails(request, function(place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				// marker, nearby검색, detail응답 정보 파라미터로
				showPlaceInfo(marker, data, place);
			}
		});
	});
}
	// 검색 끝나면 마커 초기화
function clearMarkers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

// ### 마커 클릭했을 때, InfoWindow 뜨도록 설정 ###
function showPlaceInfo(marker, data, place) {
	var name = data.name;
	var rate = data.rating;
	var placeid = data.place_id;
	var phoneNo = place.formatted_phone_number;
	var address = place.formatted_address;
	var url = place.url;
	var website = place.website;
	var type;
	
	if (name == null) {name = "[장소명 정보 없음]";}
	if (rate == null) {rate = "[별점 정보 없음]";} 
	if (phoneNo == null) {phoneNo = "[전화번호 정보 없음]";} 
	if (address == null) {address = "[주소 정보 없음]";} 
	if (url == null) {url = "[구글url 정보 없음]";} 
		else {url = "<a href=\"" + url + "\">" + url + "</a>";}
	if (website == null) {website = "[사이트 정보 없음]";} 
		else {website = "<a href=\"" + website + "\">" + website + "</a>";}
	
	if (rate == 5) {
		rate = "<img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\">";
	} else if (rate >= 4) {
		rate = "<img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\">";
	} else if (rate >= 3) {
		rate = "<img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\">";
	} else if (rate >= 2) {
		rate = "<img src=\"resources/img/rating_star.png\"><img src=\"resources/img/rating_star.png\">";
	} else if (rate >= 1) {
		rate = "<img src=\"resources/img/rating_star.png\">";
	} else if (rate < 1) {
		rate = "<img src=\"resources/img/outline_star.png\">";
	}
	
	var infowindow = new google.maps.InfoWindow({
		// 표시하고싶은 정보 참고 : https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple?hl=ko
		content: "<table class=\"ifTable\">" +
				"	<tr>" +
						"<td class=\"ifPlaceName\">" + name + "</td>" +
						"<td align=\"right\">" +
							"<img class=\"ifLikeImg2\" src=\"resources/img/heart_full.png\">" +
							"<img class=\"ifLikeImg1\" src=\"resources/img/heart_outline.png\">   " +
						"</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td>" + rate + "</td>" +
				"		<td align=\"right\"  class=\"ifPlacePhone\">" + phoneNo + "  </td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"2\">" + address + "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"2\">" + url + "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"2\">" + website + "</td>" +
				"	</tr>" +
				"</table>",
		maxWidth: 330
	});
	infowindow.open(map, marker);
	
	var typeStr = place.types.join(' ');
	if (typeStr.indexOf("lodging") >= 0) {
		type = "자자";
	} else if (typeStr.indexOf("restaurant") >= 0 || typeStr.indexOf("food") >= 0) {
		type = "먹자";
	} else {
		type = "가자";
	}
	
	// 찜하기
	clickHeartImage(type, place);
}

// ### 상세 검색 출력 ###
// 		주소까지 출력하고 싶었지만, [주소 포기]
//			google maps api에서 제공해주는 method를 사용 -> 한번에 너무 많은 정보를 요청해서 10개 이외에는 결과가 안나오고,
//			proxy 서버로 ajax 요청보내고 응답 받기 -> 모든 결과는 나오지만 주소 값이 영어로만 받아짐...
function printDetailInfo(searchedResult) {
	var requestsForDetail = []; 
	serviceForDetail = new google.maps.places.PlacesService(map);
	
	for (var i = 0; i < searchedResult.length; i++) {
		requestsForDetail[i] = {
				placeId: searchedResult[i].place_id,
				fields: ['name', 'rating', 'formatted_phone_number', 'international_phone_number',  
					'formatted_address', 'adr_address', 'url', 'website', 'geometry']
		};
		
		// Proxy서버를 통해 json 파일 ajax요청
		$.ajax({
			url: "get.detail.search",
			dataType: 'json',
			data: {placeid: searchedResult[i].place_id, 
					key: "AIzaSyCCrYnDphc_WgUlfkKoTWY3KbrE-IufZjY"},
			//async: false,		// 동기식으로 ajax 요청하기
			success: function(data) {
				var d = data.result;
				
				// 모든 detail 검색 결과에 찜 했는지 여부 넣기(객체에 동적으로 값 할당)
				d.like = false;
				detailedResult[i] = d;
				
				var td1 = $("<td></td>").text(d.name);
				$(td1).css("font-weight", "900").css("cursor", "pointer").css("padding-left", "5px");
				$(td1).attr("class", "clickableResultTd");
				// 테이블 클릭하면 맵 중앙 이동
				$(td1).attr("onclick", "moveToResultData(" + d.geometry.location.lat + "," + d.geometry.location.lng + ")");
				$(td1).mouseenter(function() {
					$(td1).css("text-shadow", "1px 1px 1px black");
				});
				$(td1).mouseleave(function() {
					$(td1).css("text-shadow", "none");
				});
				var tr1 = $("<tr></tr>").append(td1);
				
				var td2 = $("<td></td>").text(d.formatted_phone_number);
				$(td2).attr("align", "right").css("padding-right", "5px").css("font-size", "10pt");
				var tr2 = $("<tr></tr>").append(td2);
				
				var website = d.website;
				var td3;
				if (d.website==null) {
					website = "사이트 정보 없음";
					td3 = $("<td></td>").text(website);
				} else {
					td3 = $("<td></td>").html("<a href=\"" + website + "\" class=\"websiteAtag\">" + website + "</a>");
				}
				$(td3).css("font-size", "10pt").css("padding-left", "5px");
				var tr3 = $("<tr></tr>").append(td3);
				
				var td4 = $("<td></td>").text(d.place_id);
				$(td4).attr("align", "center").css("font-size", "5pt");
				var tr4 = $("<tr></tr>").append(td4);
				
				var table = $("<table></table>").append(tr1, tr2, tr3, tr4);
				
				$(table).css("font-weight", "normal").css("width", "320px").css("height", "150px").css("max-width", "320px");
				$(table).css("word-break", "break-all").css("margin", "1px");
				$(table).css("border", "grey solid 2px").css("float", "left");
				$(table).css("border-radius", "7px");
				$(table).mouseenter(function() {
					$(table).css("box-shadow","0px 0px 10px #2eb8b8").css("border", "#2eb8b8 solid 2px");
				});
				$(table).mouseleave(function() {
					$(table).css("box-shadow","0px 0px 0px grey").css("border", "grey solid 2px");
				});
				
				$("#step1ResultDiv").append(table);
			}
		});
	}
}

// ### 검색 결과 목록의 장소명을 클릭했을 때, 해당 장소로 지도 중앙 이동 ###
function moveToResultData(lat, lng) {
	var resultLatLng = new google.maps.LatLng({lat: lat, lng: lng});
	map.setCenter(resultLatLng);
}

// ### 찜하기 버튼 클릭했을 때 ###
//		여행일정 저장하고 나면 배열들 초기화하도록??????????????????????????????
var likedResult = [];
function clickHeartImage(type, detail) {
	$(document).on("click", ".ifLikeImg1", function() {
		$(".ifLikeImg1").css("opacity", "0").css("top", "-20px").css("z-index", "1");
		$(".ifLikeImg2").css("opacity", "1").css("top", "0px").css("z-index", "5");
		
//		 찜 목록 추가하기 (detail객체에 type 동적 할당해서) 되나?????????????????????????????????
		detail.type = type;
		likedResult.push(detail);
		
		alert("찜 목록에 추가 됐습니다.");
	});
	$(document).on("click", ".ifLikeImg2", function() {
		$(".ifLikeImg1").css("opacity", "1").css("top", "0px").css("z-index", "5");
		$(".ifLikeImg2").css("opacity", "0").css("top", "-20px").css("z-index", "1");
		
		var i = likedPlaceid.indexOf(detail.place_id);
		if (i > -1) {
			likedPlaceid.splice(i, 1);
			likedPname.splice(i, 1);
			likedRating.splice(i, 1);
			likedPaddress.splice(i, 1);
			likedUrl.splice(i, 1);
			likedWebsite.splice(i, 1);
			likedPhone.splice(i, 1);
			likedType.splice(i, 1);
		}
		
		alert("찜 목록에서 삭제 됐습니다.");
	});
}



//################################### Step2 ###################################

// ### 각 찜목록 영역에 데이터 추가하기 ###
function printLikedPlaceIntoEachArea() {
//	for (var i = 0; i < likedPlaceid.length; i++) {
//		if (likedType.equals("가자")) {
//			var td1 = $("<td></td>").text(likedPname);
//			var td1 = $("<td></td>").text(likedPhone);
//			var td1 = $("<td></td>").text("x");
//			var tr1 = $("<tr></tr>").append(td1);
//			$("#step2GoAreaTable").append(td1);
//			
//		} else if (likedType.equals("먹자")) {
//			
//		} else if (likedType.equals("자자")) {
//			
//		}
//	}
}





