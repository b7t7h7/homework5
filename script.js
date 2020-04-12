$(function() {});


var now = moment().format("H A");
var today = moment().format("dddd, MMMM Do");


var planDay = [
	{ time: "9 AM", event: "" },
	{ time: "10 AM", event: "" },
	{ time: "11 AM", event: "" },
	{ time: "12 PM", event: "" },
	{ time: "1 PM", event: "" },
	{ time: "2 PM", event: "" },
	{ time: "3 PM", event: "" },
	{ time: "4 PM", event: "" },
	{ time: "5 PM", event: "" }
];


var checkPrevious = JSON.parse(localStorage.getItem("dayPlanner"));
if (checkPrevious !== null) {
	planDay = checkPrevious;
}


$("#currentDay").text(today);


planDay.forEach(function(timeBlock, index) {

	var timeLabel = timeBlock.time;
	var blockColor = colorMe(timeLabel);
	var block =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm-2 col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		' description">' +
		timeBlock.event +
		'</textarea><div class="col-sm-2 col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="far fa-save"></i></button></div></div></div>';


	$(".container").append(block);
});


function colorMe(time) {
	var testNow = moment(now, "H A");
	var testBlock = moment(time, "H A");
	if (testNow.isBefore(testBlock) === true) {
		return "future";
	} else if (testNow.isAfter(testBlock) === true) {
		return "past";
	} else {
		return "present";
	}
}


$(".saveBtn").on("click", function(event) {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);

	
	planDay[blockID].event = userEntry;
	localStorage.setItem("dayPlanner", JSON.stringify(planDay));
});
