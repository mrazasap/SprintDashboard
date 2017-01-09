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

	$(".add-kpi").on("click", function () {
		var lastContent = $(".kpi-content:last"),
			newContent = lastContent.clone(true);

		lastContent.after(newContent);
	});

	$(".delete-kpi").on("click", function () {
		if ($(".delete-kpi").length === 1)  {
			return false;
		}
		$(this).closest(".kpi-content").remove();
	});
});
