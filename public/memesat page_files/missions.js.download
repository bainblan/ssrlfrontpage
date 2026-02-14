$(document).ready(function () {
	//add buttons to list
	var satButtons = [];
	var missions = [];
	satButtons.push(g("Sat-button-0"));
	satButtons.push(g("Sat-button-1"));
	satButtons.push(g("Sat-button-2"));
	satButtons.push(g("Sat-button-3"));
	satButtons.push(g("Sat-button-4"));
	satButtons.push(g("Sat-button-5"));

	missions.push(g("Mission-0"));
	missions.push(g("Mission-1"));
	missions.push(g("Mission-2"));
	missions.push(g("Mission-3"));
	missions.push(g("Mission-4"));
	missions.push(g("Mission-5"));

	g("Sat-button-0").addEventListener("click", function () {
		buttonStuff(0);
	});

	g("Sat-button-1").addEventListener("click", function () {
		buttonStuff(1);
	});
	g("Sat-button-2").addEventListener("click", function () {
		buttonStuff(2);
	});

	g("Sat-button-3").addEventListener("click", function () {
		buttonStuff(3);
	});
	g("Sat-button-4").addEventListener("click", function () {
		buttonStuff(4);
	});
	g("Sat-button-5").addEventListener("click", function () {
		buttonStuff(5);
	});

	function buttonStuff(x) {
		satButtons.forEach(function (el) {
			el.setAttribute("class", "sat-button-unselected");
		});
		satButtons[x].setAttribute("class", "sat-button-selected");
		missions.forEach(function (el) {
			el.setAttribute("class", "mission-panel out");
		});
		missions[x].setAttribute("class", "mission-panel in");
	}
});

function g(id) {
	return document.getElementById(id);
}
