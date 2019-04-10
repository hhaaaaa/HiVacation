var no = 1;
var map;
var service;
var serviceForDetail;			
var locLatLng;					// 지역 검색 위도경도 저장
var markers = [];				// 검색 결과들 한번에 마커 프린트 하기위한 배열
var searchedResult = [];		// nearby 검색 결과
var srIndex;					// nearby 검색 결과 저장 위한 index
var detailedResult = [];		// type, like 속성이 포함된 찜 목록 관리용 detail 데이터

// ################################### Step1 ###################################
// ### 홈 페이지 화면 조정 ###
function schedulingPaging(boolLogin) {
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
		if (!boolLogin){
			alert("로그인 후 이용 가능합니다.");
		} else {
			$("#step" + no + "Div").css("left", "-1200px");
			$("#step" + no + "Menu").css("background-color", "white");
			$("#step" + no + "Menu").css("color", "grey");
			no = 2; 
			$("#step" + no + "Div").css("left", "300px");
			$("#step" + no + "Menu").css("background-color", "grey");
			$("#step" + no + "Menu").css("color", "white");
			
			initMap2();
		} 
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
var nearbyLocation;
function searchLocationByQuery() {
	
	$("#step1SearchCity").keyup(function(e) {
		nearbyLocation = $(this).val();
		
		var request = {
			query: nearbyLocation,
			fields: ['name', 'geometry', 'place_id']
		};
		service = new google.maps.places.PlacesService(map);
		service.findPlaceFromQuery(request, function(results, status) {
	    	if (status === google.maps.places.PlacesServiceStatus.OK) {
	    		map.setCenter(results[0].geometry.location);
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
			    	// 상세 정보 요청해서 테이블 출력
			    	printDetailInfo(searchedResult);

			    	// 모든 검색 결과 마커로 출력
			    	dropAllMarker(searchedResult);
			    	
			    	// 날씨 출력
			    	searchWeather = [];
			    	$("#weatherMenuTd").empty();
			    	printWeatherOfSearchLocation();
			    }
			}
		});
	});
}

// ### 여행 검색 하면, 해당 지역 날씨 출력 ###
var searchWeather = [];
function printWeatherOfSearchLocation() {
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast",
		data: {lat: locLatLng.lat(), lon: locLatLng.lng(), units: "metric", 
			appid: "baff8f3c6cbc28a4024e336599de28c4", lang: "kr"},
		success: function(data) {
			var weather = data.list;
			var noonIndex = 3;			// 매일 12시를 날씨 기준으로 삼기 위한 index([3], [11], [18], ... 7씩 증가)
			
			for (var i = 0; i < weather.length; i++) {
				if (i == noonIndex) {
					var date = weather[i].dt_txt.substr(5, 5).replace("-", "/");
					
					searchWeather.push({
						temp: weather[i].main.temp,
						humidity: weather[i].main.humidity,
						icon: weather[i].weather[0].icon,
						description: weather[i].weather[0].description,
						date: date
					});
					
					noonIndex += 7;
					if (noonIndex > weather.length) {
						break;
					}
				}
			}
			
			// 출력 (총 6일치의 날씨정보를 출력할 수 있지만, 100이 6으로 나눠떨어지지 않기 때문에 당일 포함 5일치의 날씨 정보만 출력)
			for (var i = 0; i < searchWeather.length-1; i++) {
				var div = $("<div></div>").attr("id", "weatherDiv"+i)
						.html(searchWeather[i].date + " " + $("#step1SearchCity").val() 
								+ "<img src=\"https://openweathermap.org/img/w/" + searchWeather[i].icon +".png\" style=\"width: 30px; position: relative; top: 10px;\">"
								+ " " + searchWeather[i].description + " : " + searchWeather[i].temp + "℃ (" + searchWeather[i].humidity + "%)")
						.css("font-size", "10pt").css("color", "black").css("position", "absolute").css("right", "0px").css("top", "-5px");
				$("#weatherMenuTd").append(div);
			}  
		}
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
	});
	markers.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		for (var i = 0; i < detailedResult.length; i++) {
			if (data.place_id == detailedResult[i].place_id) {
				showPlaceInfo(marker, detailedResult[i], i);
				break;
			}
		}
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
function showPlaceInfo(marker, place, index) {
	var name = place.name;
	var rate = place.rating;
	var placeid = place.place_id;
	var phoneNo = place.formatted_phone_number;
	var address = place.formatted_address;
	var url = place.url;
	var website = place.website;
	
	if (name == null) {name = "[장소명 정보 없음]";}
	if (rate == null) {rate = "[별점 정보 없음]";} 
	if (phoneNo == null) {phoneNo = "[전화번호 정보 없음]";} 
	if (address == null) {address = "[주소 정보 없음]";} 
	if (url == null) {url = "[구글url 정보 없음]";} 
		else {url = "<a href=\"" + url + "\">" + url + "</a>";}
	if (website == null) {website = "[사이트 정보 없음]";} 
		else {website = "<a href=\"" + website + "\">" + website + "</a>";}
	
	// 별점 소수점 버림해서 별 갯수로 표시
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
	
	var imgPart = "<img id=\"ifLikeImg2_" + index + "\" src=\"resources/img/heart_full.png\" " +
		"style=\"width: 15px; cursor: pointer; opacity: 0; position: relative; top: -20px; left: 15px; z-index: 1;\">" +
		"<img id=\"ifLikeImg1_" + index + "\" src=\"resources/img/heart_outline.png\" " +
		"style=\"width: 15px; cursor: pointer; position: relative; opacity: 1; z-index: 5;\">   ";
	if (detailedResult[index].like) {
		imgPart = "<img id=\"ifLikeImg1_" + index + "\" src=\"resources/img/heart_outline.png\" " +
		"style=\"width: 15px; cursor: pointer; opacity: 0; position: relative; top: -20px; left: 15px; z-index: 1;\">" +
		"<img id=\"ifLikeImg2_" + index + "\" src=\"resources/img/heart_full.png\" " +
		"style=\"width: 15px; cursor: pointer; position: relative; opacity: 1; z-index: 5;\">   ";
	}
	
	var infowindow = new google.maps.InfoWindow({
		content: "<table class=\"ifTable ifTable1\">" +
				"	<tr>" +
						"<td class=\"ifPlaceName\" style=\"width: 210px;\" colspan=\"2\">" + name + "</td>" +
						"<td align=\"right\" style=\"width: 40px;\">" + imgPart	+ "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td style=\"width: 90px; font-size: 9pt;\">" + rate + "</td>" +
				"		<td align=\"right\" class=\"ifPlacePhone\" style=\"width: 160px;\" colspan=\"2\">" + phoneNo + "  </td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"3\" style=\"word-break: break-all;\">" + address + "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"3\" style=\"word-break: break-all;\">" + url + "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"3\" style=\"word-break: break-all;\">" + website + "</td>" +
				"	</tr>" +
				"</table>",
		maxWidth: 330
	});
	infowindow.open(map, marker);
	
	// 찜하기
	clickHeartImage(place, index);

}

// ### 찜하기 버튼 클릭했을 때 ###
function clickHeartImage(detail, index) {
	// [방법1]중복되는 click 이벤트 제거 후, 동적으로 이벤트 추가 
	// 		->아래처럼 하면 모든 click 이벤트가 제거돼서 하자영역 추가가 안되는 것 같다!!
//	$(document).off("click").on("click", "#ifLikeImg1_" + index, function() {
	$(document).on("click", "#ifLikeImg1_" + index, function() {
		$("#ifLikeImg1_" + index).css("opacity", "0").css("top", "-20px").css("z-index", "1");
		$("#ifLikeImg2_" + index).css("opacity", "1").css("top", "0px").css("z-index", "5");
		
		// 찜 목록 추가하기
		for (var i = 0; i < detailedResult.length; i++) {
			if (detailedResult[i].place_id == detail.place_id) {
				// [방법2]찜 되어있지 않은 것만 찜 목록에 등록하도록 하기 위한 조건문
				if (detailedResult[i].like == false) {
					detailedResult[i].like = true;
					
					// 각 찜 영역에 해당 데이터 등록
					printLikedPlaceIntoEachArea(index);
				}
				break;
			}
		}
		
	});
	$(document).on("click", "#ifLikeImg2_" + index, function() {
		$("#ifLikeImg1_" + index).css("opacity", "1").css("top", "0px").css("z-index", "5");
		$("#ifLikeImg2_" + index).css("opacity", "0").css("top", "-20px").css("z-index", "1");
		
		// 찜 목록 제거하기
		for (var i = 0; i < detailedResult.length; i++) {
			if (detailedResult[i].place_id == detail.place_id) {
				detailedResult[i].like = false;
			}
		}
		
		// 각 찜 영역에서 해당 데이터 삭제
		clearLikePlaceList(index);
	});
}


// ### 상세 검색 출력 ###
function printDetailInfo(searchedResult) {
 	// 주소까지 출력하고 싶었지만, [주소 포기]
	//		google maps api에서 제공해주는 method를 사용 -> 한번에 너무 많은 정보를 요청해서 10개 이외에는 결과가 안나오고,
	//		proxy 서버로 ajax 요청보내고 응답 받기 -> 모든 결과는 나오지만 주소 값이 영어로만 받아짐...
	var requestsForDetail = []; 
	serviceForDetail = new google.maps.places.PlacesService(map);
	
	for (var i = 0; i < searchedResult.length; i++) {
		requestsForDetail[i] = {
				placeId: searchedResult[i].place_id,
				fields: ['name', 'rating', 'formatted_phone_number', 'international_phone_number',  
					'formatted_address', 'adr_address', 'url', 'website', 'geometry', 'types']
		};
		
		// Proxy서버를 통해 json 파일 ajax요청
		$.ajax({
			url: "get.detail.search",
			dataType: 'json',
			data: {placeid: searchedResult[i].place_id, 
					key: "AIzaSyAnIve1J3a9dk9LpwOvpXbKDW0fCSk_8wM"},
			//async: false,		// 동기식으로 ajax 요청하기
			success: function(data) {
				var d = data.result;
				
				// 모든 detail 검색 결과에 찜 영역 설정하기(객체에 동적으로 값 할당)
				var typeStr = d.types.join(' ');
				if (typeStr.indexOf("lodging") >= 0) {
					d.type = "자자";
				} else if (typeStr.indexOf("restaurant") >= 0 || typeStr.indexOf("food") >= 0) {
					d.type = "먹자";
				} else {
					d.type = "가자";
				}
				// 모든 detail 검색 결과에 찜 했는지 여부 넣기(객체에 동적으로 값 할당)
				d.like = false;
				d.no = -1;
				
				detailedResult.push(d);
				
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




//################################### Step2 ###################################
var map2;					// step2 지도

// ### 각 찜목록 영역에 데이터 추가하기 ###
function printLikedPlaceIntoEachArea(index) {
	// 각 찜 영역 데이터 form 설정
	var td1 = $("<td></td>").text(detailedResult[index].name).css("width", "53%").css("font-size", "11pt").css("height", "23px");
	$(td1).css("cursor", "pointer").attr("id", "setMapByName" + index);
	
	var td2 = $("<td></td>").text(detailedResult[index].formatted_phone_number).css("width", "33%").css("height", "23px");
	$(td2).css("font-weight", "normal").css("font-size", "10pt");
	
	var td3 = $("<td></td>").text("+").css("width", "7%").css("cursor", "pointer").css("font-size", "13pt").css("height", "23px");
	$(td3).attr("id", "saveLikePlace" + index).attr("align", "center");
	$(td3).mouseover(function() {$(td3).text("추가").css("font-size", "8pt").css("text-shadow", "0px 0px 10px white");});
	$(td3).mouseleave(function() {$(td3).text("+").css("font-size", "13pt").css("text-shadow", "none");});
	
	var td4 = $("<td></td>").text("x").css("width", "7%").css("cursor", "pointer").css("height", "23px");
	$(td4).attr("id", "deleteLikePlace" + index).attr("align", "center");
	$(td4).mouseover(function() {$(td4).text("삭제").css("font-size", "8pt").css("text-shadow", "0px 0px 10px white");});
	$(td4).mouseleave(function() {$(td4).text("x").css("font-size", "12pt").css("text-shadow", "none");});
	
	var tr = $("<tr></tr>").append(td1, td2, td3, td4).css("width", "100%");
	$(tr).mouseleave(function() {$(tr).css("background-color", "transparent").css("color", "black");});
	
	var table = $("<table></table>").append(tr).css("width", "100%").css("border-spacing", "0px");
	$(table).attr("id", "lpTable" + index).css("padding-left", "7px").css("padding-right", "7px").css("padding-top", "2px").css("padding-bottom", "2px");
	
	// 각 찜 영역 hover시에 각 영역의 색으로 변하도록
	if (detailedResult[index].type == "가자") {
		$(tr).mouseover(function() {$(tr).css("background-color", "#00AA00").css("color", "white");});
		$("#step2GoAreaDiv").append(table);
	} else if (detailedResult[index].type == "먹자") {
		$(tr).mouseover(function() {$(tr).css("background-color", "#0000FF").css("color", "white");});
		$("#step2EatAreaDiv").append(table);
	} else if (detailedResult[index].type == "자자") {
		$(tr).mouseover(function() {$(tr).css("background-color", "#FF0000").css("color", "white");});
		$("#step2SleepAreaDiv").append(table);
	}
	
	// 찜 목록 장소명 클릭
	moveMapCenterToLikePlace(index);
	
	// 찜 목록 + 클릭
	registerIntoDoList(index);
	
	// 찜 목록 x 클릭
	clearLikePlaceListInStep2(index);
}

// ### 각 찜목록 영역에 데이터 삭제하기 ###
function clearLikePlaceList(index) {
	$("#lpTable" + index).remove();
}

// ### step2 지도 불러오기 ###
var goMarkers = [];
var eatMarkers = [];
var sleepMarkers = [];
function initMap2() {
	var loadMap = document.getElementById('step2Map');
	if (loadMap != null) {
		map2 = new google.maps.Map(loadMap, {
			center: locLatLng,
			zoom: 14,
			mapTypeControl: false
		});
		
		// 각 찜 영역 마커 불러오기
		printEachColorMarkers();
	}
}

// ### 각 찜 영역의 마커들 step2 지도에 출력 ###
function printEachColorMarkers() {
	for (var i = 0; i < detailedResult.length; i++) {
		if (detailedResult[i].like) {
			var marker = new google.maps.Marker({
				position: detailedResult[i].geometry.location,
				map: map2,
				title: detailedResult[i].name
			});
			// 찜 목록에 대한 마커 삭제할 때 값 비교 위해 설정해주는 값
			marker.placeid = detailedResult[i].place_id;
			
			// 찜 영역 별로 초록(가자), 파랑(먹자), 빨강(자자)으로 마커 색 설정
			if (detailedResult[i].type == "가자") {
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
				goMarkers.push(marker);
			} else if (detailedResult[i].type == "먹자") {
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
				eatMarkers.push(marker);
			} else if (detailedResult[i].type == "자자") {
				marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
				sleepMarkers.push(marker);
			}
			
			// 반복문 안에 직접 click listener 설정하면, 해당 index에 대한 값이 전달되지 않아서 따로 함수로 만들어서 처리!
			listenClickEventFromMarker(marker, detailedResult[i]);
		}
	}
}

// ### 마커 클릭하면 infowindow 출력 ###
function listenClickEventFromMarker(marker, place) {
	google.maps.event.addListener(marker, 'click', function() {
		// infowindow 표시
		showPlaceInfo2(marker, place);
	});
}

	// InfoWindow 설정
function showPlaceInfo2(marker, place) {
	var name = place.name;
	var rate = place.rating;
	var phoneNo = place.formatted_phone_number;
	var address = place.formatted_address;
	var url = place.url;
	var website = place.website;

	if (name == null) {name = "[장소명 정보 없음]";}
	if (rate == null) {rate = "[별점 정보 없음]";} 
	if (phoneNo == null) {phoneNo = "[전화번호 정보 없음]";} 
	if (address == null) {address = "[주소 정보 없음]";} 
	if (url == null) {url = "[구글url 정보 없음]";} 
		else {url = "<a href=\"" + url + "\">" + url + "</a>";}
	if (website == null) {website = "[사이트 정보 없음]";} 
		else {website = "<a href=\"" + website + "\">" + website + "</a>";}
	
	// 별점 소수점 버림해서 별 갯수로 표시
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
		content: "<table class=\"ifTable\">" +
				"	<tr>" +
						"<td colspan=\"2\" class=\"ifPlaceName\" style=\"width: 250px;\">" + name + "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td style=\"width: 90px; font-size: 9pt;\">" + rate + "</td>" +
				"		<td align=\"right\" class=\"ifPlacePhone\" style=\"width: 160px;\">" + phoneNo + "  </td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"2\" style=\"word-break: break-all;\">" + address + "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"2\" style=\"word-break: break-all;\">" + url + "</td>" +
				"	</tr>" +
				"	<tr>" +
				"		<td colspan=\"2\" style=\"word-break: break-all;\">" + website + "</td>" +
				"	</tr>" +
				"</table>",
		maxWidth: 330
	});
	infowindow.open(map2, marker);
}

// ### 찜 목록 장소명 클릭하면 지도 중앙 이동 ###
function moveMapCenterToLikePlace(index) {
	$(document).on("click", "#setMapByName" + index, function() {
		map2.setCenter(detailedResult[index].geometry.location);
	});
}

// ### 찜목록 + 누르면 하자영역에 등록
var doList = [];
var doListIndex = 0;
function registerIntoDoList(index) {
	$(document).on("click", "#saveLikePlace" + index, function() {
		var img = "<img src=\"resources/img/down_arrow.png\" style=\"width: 15px;\">";
		var arrowTd1 = $("<td></td>").html(img).attr("align", "center").css("width", "90%");
		var arrowTd2 = $("<td></td>").html("&nbsp;").attr("align", "center").css("width", "10%");
		var arrowTr1 = $("<tr></tr>").attr("id", "dlTr" + doListIndex).append(arrowTd1, arrowTd2);
		
		var saveTd1 = $("<td></td>").text(detailedResult[index].name).attr("align", "center").css("width", "90%");
		var saveTd2 = $("<td></td>").text("x").attr("id", "deleteDoList" + doListIndex).attr("align", "center").css("width", "10%").css("cursor", "pointer");
		$(saveTd2).mouseover(function() {$(saveTd2).text("삭제").css("font-size", "8pt").css("text-shadow", "0px 0px 10px white");});
		$(saveTd2).mouseleave(function() {$(saveTd2).text("x").css("font-size", "12pt").css("text-shadow", "none");});
		var saveTr1 = $("<tr></tr>").append(saveTd1, saveTd2);
		var saveTable = $("<table></table>").append(arrowTr1, saveTr1).css("width", "100%");
		$(saveTable).attr("id", "dlTable" + doListIndex).css("padding-left", "7px").css("padding-right", "7px").css("padding-top", "2px").css("padding-bottom", "2px");
		
		$("#step2DoListDiv").append(saveTable);
		
		detailedResult[index].no = doListIndex;
		// 객체는 call by reference
		// 직접 detailedRestul[index]를 push하면 주소값으로 참조하기 때문에,
		// 하자영역에 같은 장소가 있을 때 모두 같은 값을 참조하게 돼서 곤란해짐
		// -> JSON.parse(JSON.stringify())로 객체 깊은 복사해서 push.
		doList.push(JSON.parse(JSON.stringify(detailedResult[index])));
		
		// 하자 영역의 x를 클릭했을 때
		deletePlaceInDoList(doListIndex);
		
		doListIndex += 1;
	});
}

// ### 찜 목록 x 누르면 => [찜 목록 삭제, step1 infowindow 빈 하트로, step2 마커 제거] ###
function clearLikePlaceListInStep2(index) {
	$(document).on("click", "#deleteLikePlace" + index, function() {
		// 찜 영역에서 제거
		clearLikePlaceList(index);
		
		// step1 infowindow 빈 하트로
		$("#ifLikeImg1_" + index).css("opacity", "1").css("top", "0px").css("z-index", "5");
		$("#ifLikeImg2_" + index).css("opacity", "0").css("top", "-20px").css("z-index", "1");
		detailedResult[index].like = false;
		
		// step2 찜 마커 제거
		if (detailedResult[index].type == "가자") {
			for (var i = 0; i < goMarkers.length; i++) {
				if (goMarkers[i].placeid == detailedResult[index].place_id) {
					goMarkers[i].setMap(null);
					goMarkers.splice(i, 1);
					break;
				}
			}
		} else if (detailedResult[index].type == "먹자") {
			for (var i = 0; i < eatMarkers.length; i++) {
				if (eatMarkers[i].placeid == detailedResult[index].place_id) {
					eatMarkers[i].setMap(null);
					eatMarkers.splice(i, 1);
					break;
				}
			}
		} else if (detailedResult[index].type == "자자") {
			for (var i = 0; i < sleepMarkers.length; i++) {
				if (sleepMarkers[i].placeid == detailedResult[index].place_id) {
					sleepMarkers[i].setMap(null);
					sleepMarkers.splice(i, 1);
					break;
				}
			}
		}
	});
}

// ### 하자영역 x 누르면 목록 삭제 ###
function deletePlaceInDoList(clickIndex) {
	$(document).on("click", "#deleteDoList" + clickIndex, function() {
		$("#dlTable" + doList[clickIndex].no).remove();
		doList[clickIndex].no = -1;
	});
}

// ### 하자영역 데이터 DB에 저장 ###
function saveDoListInDB(uid) {
	var year = $("#step2SaveYear").val();
	var month = $("#step2SaveMonth").val();
	var day = $("#step2SaveDay").val();
	
	var lastDay = (new Date(year, month, 0)).getDate() * 1;
	
	if (year == null) {
		alert("년도를 선택해주세요.");
		$("#step2SaveYear").find("option:first").prop("selected", true);
	} else if (month == null) {
		alert("월을 선택해주세요.");
		$("#step2SaveMonth").find("option:first").prop("selected", true);
	} else if (day == null) {
		alert("일을 선택해주세요.");
		$("#step2SaveDay").find("option:first").prop("selected", true);
	} else if (day > lastDay) {
		alert("일을 다시 선택해주세요.");
		$("#step2SaveDay").find("option:first").prop("selected", true);
	} else {
		if (month < 10) {month = "0" + month;}
		if (day < 10) {day = "0" + day;}
		var date = year + "" + month + "" + day;
		var date2 = new Date(year, month-1, day);
		var rating; var paddress; var url; var website; var phone;
		
		// doList의 목록을 DB로 저장 (서버로 ajax요청)
		for (var i = 0; i < doList.length; i++) {
			if (doList[i].no >= 0) {
				rating = doList[i].rating;
				paddress = doList[i].formatted_address;
				url = doList[i].url;
				website = doList[i].website;
				phone = doList[i].formatted_phone_number;
				
				if (rating == null) { rating = 0; }
				if (paddress == null) { paddress = "[주소 정보 없음]"; }
				if (url == null) { url = "[구글url 정보 없음]"; }
				if (website == null) { website = "[사이트 정보 없음]"; }
				if (phone == null) { phone = "[전화번호 정보 없음]"; }
				
				$.ajax({
					url: "go.save.schedule",
					data: {hp_uid: uid, hp_date: date2, hp_city: nearbyLocation, 
							hp_placeid: doList[i].place_id, hp_pname: doList[i].name, 
							hp_rating: rating, hp_paddress: paddress, hp_url: url, 
							hp_website: website, hp_phone: phone, hp_order: doList[i].no},
					success: function(data) {
						// i번째 하자영역, doList 초기화 (data로 doList[i].no 리턴되도록)
						initializeAfterSaveSchedule(data.result);
						
						if (doList.length-1 == data.result) {
							doList = [];
							doListIndex = 0;
						}
					}
				});
			}
		}
		
		alert(uid + " 님, " + year + "년 " + month + "월 " + day + "일 여행 일정이 저장 됐습니다.");
		
		// 년, 월, 일 select 초기화
		$("#step2SaveYear").find("option:first").prop("selected", true);
		$("#step2SaveMonth").find("option:first").prop("selected", true);
		$("#step2SaveDay").find("option:first").prop("selected", true);
	}
	
	return false;
}

// 		### DB 저장 후, 하자영역 & doList 초기화 ###
function initializeAfterSaveSchedule(completeIndex) {
	$("#dlTable" + completeIndex).remove();
}

// ### 찜 목록 초기화 ###
function initializeLikeArea() {
	$("#step2InitializeAreaSpan").click(function() {
		if (doList.length > 0) {
			$("#step2DoListDiv").empty();
			doList = [];
		}
		if (detailedResult.length > 0) {
			for (var i = 0; i < detailedResult.length; i++) {
				if (detailedResult[i].like == true) {
					// 찜 영역에서 제거
					clearLikePlaceList(i);
					
					// step1 infowindow 빈 하트로
					$("#ifLikeImg1_" + i).css("opacity", "1").css("top", "0px").css("z-index", "5");
					$("#ifLikeImg2_" + i).css("opacity", "0").css("top", "-20px").css("z-index", "1");
				
					// detailedResult 자체를 초기화 시키려했는데,
					// 		여행 검색을 하면 detailedResult에 추가되게 했기때문에
					//		detailedResult를 초기화시키면 step1으로 돌아갔을 때 다시 찜할 수 없게 됨!
					//		-> like 속성만 false로 ! (다시 홈으로 가면 detailedResult 초기화됨)
					detailedResult[i].like = false;
				}
			}
			clearStep2Markers();
		}
	});
}

// 		### 찜 목록 마커들 초기화 ###
function clearStep2Markers() {
	for (var i = 0; i < goMarkers.length; i++) {
		goMarkers[i].setMap(null);
	}
	for (var i = 0; i < eatMarkers.length; i++) {
		eatMarkers[i].setMap(null);
	}
	for (var i = 0; i < sleepMarkers.length; i++) {
		sleepMarkers[i].setMap(null);
	}
	goMarkers = [];
	eatMarkers = [];
	sleepMarkers = [];
}






