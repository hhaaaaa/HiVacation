function makeCalendar(){
	$("#calendar").fullCalendar({
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,basicWeek,basicDay'
		},
		defaultDate : new Date(),
		navLinks : true, // can click day/week names to navigate
							// views
		editable : true,
		eventLimit : false,
	// allow "more" link when too many events
		events: [{ title: 'All Day Event', start: '2019-03-01' }, 
				{ title: 'Long Event', start: '2017-03-07', end: '2019-03-10' }, 
				{ title: 'Repeating Event', start: '2019-03-09T16:00:00' }]
	});
}

function putSchedule(){//나중에 현오빠 다끝나면 getJson으로....
	var title = [];
	var startD = [];
	var endD = [];
	var events =[];
	events= { title: 'All Day Event', start: '2017-04-01' }, { title: 'Long Event', start: '2017-04-07', end: '2017-04-10' }, { id: 999, title: 'Repeating Event', start: '2017-04-09T16:00:00' };

	
	makeCalendar(events);
}