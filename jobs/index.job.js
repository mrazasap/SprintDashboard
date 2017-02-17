var request = require('request');

// TODO: group the events based on data map

var dataItems = {
	sprintName : '',
	sprintHealth : '',
	storyNumCommitted : '',
	storyNumAchieved : '',
	storyPointCommitted : '',
	storyPointAchieved : '',
	sonarVoilationRaised : '',
	sonarVoilationFixedAem : '',
	sonarVoilationFixedWcs : '',
	unitTestCoverageWcs : '',
	unitTestCoverageFe : '',
	defectLeakage : '',
	kpiProjected : [],
	kpiRealized : []
};

setInterval(function () {
	request('http://localhost:3030/api/read', function (error, response, body) {
		var result = JSON.parse(body).reverse()[0];

		// TODO: group the events based on data map
		// for(var i in dataItems) {
		// 	if (dataItems[i] !== result[i]) {
		// 		dataItems[i] = result[i];
		// 		send_event('sprintName', {title: result.sprintName});
		// 	}
		// }

		// if (oldValues.sprintName !== result.sprintName) {
		// 	oldValues.sprintName = result.sprintName;
		// 	send_event('sprintName', {title: result.sprintName});
		// }
		send_event('sprintName', {title: result.sprintName});
		send_event('sprintHealth', {emoticons: result.sprintHealth});
		send_event('storyNumCommitted', {current: result.storyNumCommitted});
		send_event('storyNumAchieved', {min: 0, max: result.storyNumCommitted, value: result.storyNumAchieved});
		send_event('storyPointCommitted', {current: result.storyPointCommitted});
		send_event('storyPointAchieved', {min: 0, max: result.storyPointCommitted, value: result.storyPointAchieved});
		send_event('sonarVoilationRaised', {current: result.sonarVoilationRaised});
		send_event('sonarVoilationFixedWcs', {current: result.sonarVoilationFixedWcs});
		send_event('sonarVoilationFixedAem', {current: result.sonarVoilationFixedAem});
		send_event('unitTestCoverageWcs', {current: result.unitTestCoverageWcs});
		send_event('unitTestCoverageFe', {current: result.unitTestCoverageFe});
		send_event('defectLeakage', {current: result.defectLeakage});

		if (dataItems.kpiProjected.toString() !== result.kpiProjected.toString() || dataItems.kpiRealized.toString() !== result.kpiRealized.toString()) {
			dataItems.kpiProjected = result.kpiProjected;
			dataItems.kpiRealized = result.kpiRealized;

			var kpiRows = [];
			for (var i=0; i <result.kpiProjected.length; i++) {
				kpiRows.push({cols:[{value: result.kpiProjected[i]},{value: result.kpiRealized[i]}]});
			}
			var kpiList = {	hrows: [{cols: [{value: 'Projected'},{value: 'Realized'}]}],
							rows: kpiRows};

			send_event('kpiList', kpiList);
		}
	});
},2000);
