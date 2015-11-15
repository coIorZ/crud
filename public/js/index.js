$(function () {
	var $table = $('table'),
		$edit = $('.edit'),
		// current editting span
		$span;

	$table.on('mouseover', '.list-item', function (e) {
		$(this).addClass('tr-active');
		$(this).find('.clear').css('visibility', 'visible');
	}).on('mouseout', '.list-item', function (e) {
		$(this).removeClass('tr-active');
		$(this).find('.clear').css('visibility', 'hidden');
	});

	$table.on('dblclick', '.list-item td', function (e) {
		var $edit = $(this).find('.edit');

		if (!$edit[0]) return;

		$span = $(this).find('span');
		$edit.css('visibility', 'visible').val($span.text()).select();
	});

	$edit.on('blur', function (e) {
		var newVal = $(this).val(),
			// bind 'id' and 'type' to input element when templating
			id = this.dataset.id,
			type = this.dataset.type,
			update = {};

		update[type] = newVal;

		if (newVal !== '' && newVal !== $span.text()) {
			$.post('/update/' + id, update, function (data) {
				if (data.success) $span.text(newVal);
				else alert(data.note);
			});
		}

		$(this).css('visibility', 'hidden');
	}).on('keyup', function (e) {
		if (e.which === 13)
			$(this).trigger('blur');
		else if(e.which === 27) {
			$(this).val($span.text()).trigger('blur');
		}
	});

});