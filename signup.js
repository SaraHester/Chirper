var validations = {
    pass: false,
    user: false,
    email: false,
    repeatPass: false
};

function enableButton() {
    if (
        validations.user === true &&
        validations.pass === true &&
        validations.repeatPass === true
    ) {
        $('.btn').attr('disabled', false);
    } else {
        $('.btn').attr('disabled', true);
    }
}

$('#username-input').on('input', function(event) {
    var username = event.currentTarget.value;
    var errorUl = $('#username-errors');
    if (username.length < 8) {
        errorUl.html('<li> Username must be at least 8 characters.</li>');
        validations.username = false;
    }
    if (username.length > 16) {
        errorUl.html('<li> Username must be less than 16 characters.</li>');
        validations.username = false;
    }
    if (/[!@#$%^&*]/.test(username)) {
        errorUl.html('<li>Password must only contain letters and numbers</li>');
        validations.username = false;
    } else {
        errorUl.html('');
        validations.user = true;
    }
    enableButton();
});
function showSearch() {
    if ($('#showSearch').css('color') === 'rgb(0, 0, 0)') {
        $('#showSearch').html(
            'Cancel Search   <i class="fa fa-minus" aria-hidden="true"></i>'
        );
        $('#showSearch').css('color', 'blue');
        $('#searchBox').removeAttr('hidden');
        $('#search').removeAttr('hidden');
    } else if ($('#showAddChirp').css('color') === 'rgb(0, 0, 255)') {
        $('#showSearch').html(
            'Search  <i class="fa fa-search" aria-hidden="true"></i>'
        );
        $('#showSearch').css('color', 'black');
        $('#searchBox').attr('hidden', 'true');
        $('#search').attr('hidden', 'true');
    }
}
$('#email-input').on('input', function(event) {
    var email = event.currentTarget.value;
    var errorUl = $('#email-errors');
    if (/[@]/.test(email) === false) {
        console.log('email must have a @');
        errorUl.html('<li>Email must have a @</li>');
        validations.email = false;
    }
    if (/[.]/.test(email) === false) {
        errorUl.html('<li>Email must have a trailing adress</li>');
        validations.email = false;
    } else {
        errorUl.html('');
        validations.email = true;
    }
    enableButton();
});
$('#password-input').on('input', function(event) {
    var password = event.currentTarget.value;
    var errorUl = $('#password-errors');
    if (password.length < 12) {
        errorUl.html('<li> Password must be at least 12 characters.</li>');
        validations.pass = false;
    } else if (password.length > 16) {
        errorUl.html('<li> Password must be less than 16 characters.</li>');
        validations.pass = false;
    }
    if (/[!@#$%^&*]/.test(password)) {
        errorUl.html('<li>Password must not contain symbols</li>');
        validations.pass = false;
    }
    if (/[a-zA-Z]/.test(password) === false) {
        errorUl.html('<li>Password must contain a letter</li>');
        validations.pass = false;
    }
    if (/\d/.test(password) === false) {
        errorUl.html('<li>Password must contain a number</li>');
        validations.repeatPass = false;
    } else {
        errorUl.html('');
        validations.pass = true;
    }
    enableButton();
});
$('#repeat-password-input').on('input', function(event) {
    var repeatPassword = event.currentTarget.value;
    var errorUl = $('#repeat-password-errors');
    if (repeatPassword === $('#password-input').val()) {
        console.log('passwords match' + $('#password-input'));
        errorUl.html('');
        validations.repeatPass = true;
    } else {
        console.log($('#password-input').val());
        errorUl.html('<li>Passwords do not match.</li>');
        validations.repeatPass = false;
    }
    enableButton();
});

function attachHandlers() {
    $('#signUp').on('click', function() {
        $('#signUp').addClass('wobble');
    });
}
function main() {
    attachHandlers();
}
$(main);
