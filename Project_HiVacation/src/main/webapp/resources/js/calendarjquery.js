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
			var tooltip = "<div>" + calEvent.content + "</div>";
			$("body").append(tooltip);
			$(this).mouseover(function(e) {
				$(this).css("z-index", "100");
			});
			
		}
	});
}

var eachdayPlan;
function putSchedule() {
	var events = [];

	$.ajax({
		url : "get.myPlan",
		success : function(data) {
			var plan = data.plan;

			var planCount = 1;
			var onedayPlan = [];
			onedayPlan.push(plan[0]);
			for (var i = 1; i < plan.length - 1; i++) {
				if (plan[i].hp_city == plan[i - 1].hp_city
						&& plan[i].hp_date == plan[i - 1].hp_date) {
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

			for (var i = 0; i < eachdayPlan.length; i++) {
				var title = eachdayPlan[i][0].hp_city;
				var content;
				for (var j = 0; j < eachdayPlan[i].length; j++) {
					if (j == 0) {
						content += eachdayPlan[i][j].hp_pname;
					} else {
//						content += 
						content += eachdayPlan[i][j].hp_pname;
					}
				}

				var date = new Date(eachdayPlan[i][0].hp_date);
				var year = date.getFullYear();
				var month = (date.getMonth() * 1 + 1);
					if (month < 10) {month = "0" + month;}
				var day = date.getDate();
					if (day < 10) {day = "0" + day;}
				var start = year + "-" + month + "-" + day;

				var eachEvent = {title : title, start : start, content: "hi"};
				events[i] = eachEvent;
			}
			makeCalendar(events);
		}
	});
}