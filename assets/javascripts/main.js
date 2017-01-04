$(function() {
	$("form").on("submit", function () {
		$.post('http://localhost:3030/api/write', $("form").serialize()).success(function (result){
			$(".message .success").removeClass('hidden');
			$(".message .error").addClass('hidden');
			setTimeout(function () {
				$(".message .success").addClass('hidden');
			}, 5000);
		}).error(function () {
			$(".message .success").addClass('hidden');
			$(".message .error").removeClass('hidden');
			setTimeout(function () {
				$(".message .error").addClass('hidden');
			}, 5000);
		});
		return false;
	});

	var kpiContentLength = $(".kpi-content")[0].length;

	$("#addKpi").on("click", function () {
		var kpiContent = $(".kpi-content:last").clone();
		$(".kpi-content:last").after(kpiContent);
	});
});
