var request = require('request');

setInterval(function () {
	request('http://localhost:3030/api/read', function (error, response, body) {

		var result = JSON.parse(body).reverse()[0];
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
		send_event('kpiProjected', {text: result.kpiProjected});
		send_event('kpiRealized', {text: result.kpiRealized});
	});
},2000);
