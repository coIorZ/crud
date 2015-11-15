$(function () {
	var $nameSignin = $('#nameSignin'),
		$pwdSignin = $('#pwdSignin'),
		$nameSignup = $('#nameSignup'),
		$pwdSignup = $('#pwdSignup'),
		$repwdSignup = $('#repwdSignup'),
		$noteSignin = $('.note-signin'),
		$noteSignup = $('.note-signup'),
		
		EMPTY_NAME_NOTE = 'username cannot be empty',
		EMPTY_PWD_NOTE = 'password cannot be empty',
		PWD_MATCH_NOTE = "repassword doesn't match";

	$('#signinBtn').on('click', function (e) {
		e.preventDefault();
		if($nameSignin.val() === '') {
			$noteSignin.text(EMPTY_NAME_NOTE);
			return;
		}
		if($pwdSignin.val() === '') {
			$noteSignin.text(EMPTY_PWD_NOTE);
			return;
		}
		$.post('/login', {
			username: $nameSignin.val(),
			password: $pwdSignin.val()
		}, function (data) {
			if (data.redirect)
				window.location.replace(data.redirect);
			else $noteSignin.text(data.note);
		});
	});

	$('#signupBtn').on('click', function (e) {
		e.preventDefault();
		if ($nameSignup.val() === '') {
			$noteSignup.text(EMPTY_NAME_NOTE);
			return;
		}
		if($pwdSignup.val() === '') {
			$noteSignup.text(EMPTY_PWD_NOTE);
			return;
		}
		if($pwdSignup.val() !== $repwdSignup.val()) {
			$noteSignup.text(PWD_MATCH_NOTE);
			return;
		}
		$.post('/register', {
			username: $nameSignup.val(),
			password: $pwdSignup.val()
		}, function (data) {
			if (data.redirect)
				window.location.replace(data.redirect);
			else $noteSignup.text(data.note);
		});
	});
});