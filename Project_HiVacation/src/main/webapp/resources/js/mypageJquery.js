var map3;
// 지도 중심을 내 여행의 지역명으로 옮기기 위한 변수
var myPlanLocation;

//### MY PAGE 메뉴 눌렀을 때, map 설정 ###
function initMap3() {
	var loadMap = document.getElementById('myPageMap');
	if (loadMap != null) {
		map3 = new google.maps.Map(loadMap, {
			center: {lat: 37.5693619, lng: 126.9837841},
			zoom: 14,
			mapTypeControl: false
		});
	}
}

// ### MY PAGE 들어가면 내 여행 리스트와 지도 표기 ###
var eachdayPlan = [];
var eachdayIndex = 0;
function getMyPlan() {
	$.ajax({
		url: "get.myPlan",
		success: function(data) {
			var plan = data.plan;
			
			var planCount = 1;
			var onedayPlan = [];
			onedayPlan.push(plan[0]);
			for (var i = 1; i < plan.length-1; i++) {
				if (plan[i].hp_city == plan[i-1].hp_city
						&& plan[i].hp_date == plan[i-1].hp_date) {
					onedayPlan.push(plan[i]);
					continue;
				} else {
					eachdayPlan[eachdayIndex] = onedayPlan;
					
					onedayPlan = [];
					onedayPlan.push(plan[i]);
					
					eachdayIndex += 1;
					planCount += 1;
				}
			}
			
			for (var i = 0; i < planCount; i++) {
				var ep = eachdayPlan[i];
				
				var date = new Date(ep[0].hp_date);
				var year = date.getFullYear();
				var month = "" + (date.getMonth() + 1);
				var day = "" + date.getDate();
				if (month.length < 2) { month = "0" + month; }
				if (day.length < 2) { day = "0" + day; }
				date = year + "." + month + "." + day;
				
				var td1 = $("<td></td>").text(date).css("width", "100px").attr("align", "center");
				$(td1).css("font-weight", "normal");
				var td2 = $("<td></td>").text(ep[0].hp_city).css("width", "100px").attr("align", "center");
				var tr = $("<tr></tr>").append(td1, td2);
				var table = $("<table></table>").append(tr);
				$(table).css("cursor", "pointer").css("margin-top", "3px").css("margin-bottom", "3px;")
				$(table).attr("id", "mpTable"+i).css("border", "black solid 1px").css("border-radius", "5px");
				var div = $("<div></div>").attr("id", "mpDiv"+i);
				
				$("#myPlanDiv").append(table, div);
				
				changeCssMyPlanTable(i);
				
				// 각 여행 클릭
				printDetailPlanAndMap(ep, i);
			}
			
		}
	});
}

//		### 각 여행 hover하면 css 변화주기 ###
function changeCssMyPlanTable(index) {
	$(document).on("mouseover", "#mpTable"+index, function() {
		$("#mpTable"+index).css("box-shadow", "0px 0px 7px #2eb8b8");
		$("#mpTable"+index).css("border", "#2eb8b8 solid 1px").css("color", "#2eb8b8");
	});
	$(document).on("mouseleave", "#mpTable"+index, function() {
		$("#mpTable"+index).css("box-shadow", "none");
		$("#mpTable"+index).css("border", "black solid 1px").css("color", "black");
	});
}

// ### 각 여행 클릭하면 여행 상세정보와 지도 표기 ###
function printDetailPlanAndMap(eachPlan, index) {
	var clickBool = false;
	$(document).on("click", "#mpTable"+index, function() {
		if (!clickBool) {
			$("#mpTable"+index).css("border", "#2eb8b8 solid 1px");
			
			var table = $("<table></table>");
			for (var i = 0; i < eachPlan.length; i++) {
				if (i == 0) {
					var td = $("<td></td>").text(eachPlan[i].hp_pname).attr("align", "center").css("font-size", "10pt");
					var tr = $("<tr></tr>").append(td);
					$(table).append(tr);
				} else {
					var img = $("<img>").attr("src", "resources/img/down_arrow.png").css("width", "10px");
					var td1 = $("<td></td>").append(img).attr("align", "center");
					var tr1 = $("<tr></tr>").append(td1);
					var td2 = $("<td></td>").text(eachPlan[i].hp_pname).attr("align", "center").css("font-size", "10pt");
					var tr2 = $("<tr></tr>").append(td2);
					$(table).append(tr1, tr2).css("padding", "5px").css("padding-left", "10px").css("padding-right", "10px")
				}
				$(table).attr("id", "mpDetail"+index).css("color", "grey");
			}
			$("#mpDiv"+index).append(table);
			
			clickBool = true;
			
			// 지도 설정 (중앙이동, 마커)
			// 		placeid로 detail 검색 (location 받아오기 위해)
			setEachdayPlanToMap(eachPlan);
			
			
			// 내 여행 목록 중 첫번째 위치로 지도 center 이동
//			setEachPlanCenterToMap(eachPlan[0]);
			
			// 내 여행 마커 표시
//			printEachPlanMarkers(eachPlan);
			
			placesLoc = [];
			
		} else {
			$("#mpTable"+index).css("border", "black solid 1px");
			$("#mpDetail"+index).remove();
			clickBool = false;
		}
		
	});
}

var placesLoc = [];		// 하루 여행지의 location 받아오기 위한 배열
function setEachdayPlanToMap(places) {
	// proxy 서버로 ajax 요청해서 location 받아오기
	for (var i = 0; i < places.length; i++) {
		$.ajax({
			url: "get.detail.search",
			dataType: 'json',
			data: {placeid: places[i].hp_placeid, key: "AIzaSyAnIve1J3a9dk9LpwOvpXbKDW0fCSk_8wM"},
			success: function(data) {
				placesLoc.push(data.result.geometry.location);
				
				// 지도 center 이동
				map3.setCenter(placesLoc[0]);
				
				// marker 지도에 찍기
				printEachPlanMarkers(placesLoc[i], data.result.name);
			}
		});
	}
}

// ### 1~9 순서로 마커 찍기 ###
var markers3 = [];
var labels = '123456789';
var labelIndex = 0;
function printEachPlanMarkers(loc, name) {
	var marker = new google.maps.Marker({
		position: loc,
		map: map3,
		label: labels[labelIndex++ % labels.length],
		title: name
	});
	markers3.push(marker);
}


