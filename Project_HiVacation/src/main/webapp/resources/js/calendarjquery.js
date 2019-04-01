var tooltip;
function makeCalendar(events) {
	$("#calendar").fullCalendar({
		resourceOrder : 'order',
		header : { left : 'prev,next', center : 'title', right : 'today' },
		editable : false,
		monthNames : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		dayNamesShort : [ "일", "월", "화", "수", "목", "금", "토" ],
		buttonText : { today : "오늘" },
		defaultDate : new Date(),
		eventLimit : false, // allow "more" link when too many events
		events : events,
		eventMouseover : function(calEvent, jsEvent) {
			tooltip =$("<div></div>").attr("id", "eventTooltip").html(calEvent.content).css("position", "absolute")
						.css("top", jsEvent.pageY+15+"px").css("left", jsEvent.pageX+"px")
						.css("background-color", "#009999CC").css("color", "white").css("text-align", "center")
						.css("padding", "5px").css("font-weight", "900").css("border-radius", "5px")
						.css("z-index", "90").css("font-size", "10pt").css("width", "140px").css("word-break", "break-all");
			$("body").append(tooltip);
			$(this).mouseleave(function() {
				$("#eventTooltip").remove();
			});
		}
	});
}

var eachdayPlan2 = [];
var eachdayIndex2 = 0;
function putSchedule() {
	var events = [];

	$.ajax({
		url : "get.myPlan",
		success : function(data) {
			var plan = data.plan;

			var planCount = 1;
			var onedayPlan = [];
			onedayPlan.push(plan[0]);
			for (var i = 1; i < plan.length; i++) {
				if (plan[i].hp_city == plan[i-1].hp_city
						&& plan[i].hp_date == plan[i-1].hp_date) {
					onedayPlan.push(plan[i]);
					if (i == plan.length - 1) {
						eachdayPlan2[eachdayIndex2] = onedayPlan;
						onedayPlan = [];
						break;
					}
					continue;
				} else {
					eachdayPlan2[eachdayIndex2] = onedayPlan;

					onedayPlan = [];
					onedayPlan.push(plan[i]);

					eachdayIndex2 += 1;
					planCount += 1;
				}
			}

			for (var i = 0; i < eachdayPlan2.length; i++) {
				var title = eachdayPlan2[i][0].hp_city;
				var content = "";
				for (var j = 0; j < eachdayPlan2[i].length; j++) {
					if (j == 0) {
						content += eachdayPlan2[i][j].hp_pname + "<br>";
					} else {
						content += "↓<br>";
						content += eachdayPlan2[i][j].hp_pname + "<br>";
					}
				}

				var date = new Date(eachdayPlan2[i][0].hp_date);
				var year = date.getFullYear();
				var month = (date.getMonth() * 1 + 1);
					if (month < 10) {month = "0" + month;}
				var day = date.getDate();
					if (day < 10) {day = "0" + day;}
				var start = year + "-" + month + "-" + day;
 
				var eachEvent = {title : title, start : start, content: content};
				events[i] = eachEvent;
			}
			makeCalendar(events);
		}
	});
}