var PAGE_DATA = {};
var months = [
    'Janurary',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
function postNewChirp() {
    var d = new Date();
    chirp = {
        author: {
            name: 'Raymond Hettinger',
            username: 'raymondh'
        },
        date: {
            month: d.getMonth() + 1,
            day: d.getDate(),
            year: d.getFullYear()
        },
        message: $('#newChirpBox')
            .val()
            .replace(/\r\n|\r|\n/g, '<br />'),
        comments: [],
        rechirps: 0,
        hearts: 0
    };
    if ($('#newChirpBox').val() === '') {
        //message is empty
    } else {
        console.log($('#newChirpBox').val());
        PAGE_DATA.chirps.splice(0, 0, chirp);
        console.log(PAGE_DATA.chirps[0]);
        writeChirps();
        $('#newChirpBox').val('');
        console.log(PAGE_DATA.chirps);
    }
}
function showAddChirp() {
    if ($('#showAddChirp').css('color') === 'rgb(0, 0, 0)') {
        $('#showAddChirp').html(
            'Cancel Chirp   <i class="fa fa-minus" aria-hidden="true"></i>'
        );
        $('#showAddChirp').css('color', 'blue');
        $('#postNewChirp').removeAttr('hidden');
        $('#newChirpBox').removeAttr('hidden');
    } else if ($('#showAddChirp').css('color') === 'rgb(0, 0, 255)') {
        $('#showAddChirp').html(
            'Add new Chirp  <i class="fa fa-plus" aria-hidden="true"></i>'
        );
        $('#showAddChirp').css('color', 'black');
        $('#newChirpBox').attr('hidden', 'true');
        $('#postNewChirp').attr('hidden', 'true');
    }
}
function hashtags(string) {
    var array = string.split(' ');
    for (n = 0; n < array.length; n++) {
        if (/[#]/.test(array[n])) {
            array[n] =
                '<a target="_blank" href="https://www.google.com/search?q=' +
                array[n].substr(1) +
                '">' +
                array[n] +
                '</a>';
        }
    }
    return array.join((separater = ' '));
}
function writeChirps() {
    ('writing chirps...');
    PAGE_DATA.chirps;
    chirps = '';
    for (i = 0; i < PAGE_DATA.chirps.length; i++) {
        // comments = getComments(i);
        message = hashtags(PAGE_DATA.chirps[i].message);
        chirps +=
            '<hr><p><strong>' +
            PAGE_DATA.chirps[i].author.name +
            '</strong> @' +
            PAGE_DATA.chirps[i].author.username +
            ' - ' +
            //takes the month of the date from the chirp. subtracts 1 to corresponding with counting numbers
            //then takes the index of that month from the array months and returns the first three characters
            months[PAGE_DATA.chirps[i].date.month - 1].substring(0, 3) +
            ' ' +
            PAGE_DATA.chirps[i].date.day +
            '</p><p>' +
            message +
            '</p>';
    }
    $('#chirps').html(
        "<center><h2>Chirps</h2></center><button onclick='showAddChirp()' id='showAddChirp'>Add new Chirp<i class='fa fa-plus' aria-hidden='true'></i></button><br><textarea id='newChirpBox' type='text' cols='40' rows='5' hidden></textarea><br><button onclick='postNewChirp()' id='postNewChirp' hidden>Post<i class='fa fa-angle-double-right' aria-hidden='true'></i></button>" +
            chirps
    );
}
function writeInfo() {
    $('#info').append(
        '<div id="photo" ><img src=""></div>'
        //  + PAGE_DATA.chirper.picUrl +
    );
    $('#info').append(
        "<h2><a target='_blank' href='https://twitter.com/" +
            PAGE_DATA.chirper.username +
            "'>" +
            PAGE_DATA.chirper.name +
            '</a></h2>'
    );
    $('#info').append('<p>@' + PAGE_DATA.chirper.username + '</p>');

    $('#info').append('<p>' + PAGE_DATA.chirper.description + '</p>');
    $('#info').append(
        '<p><i class="fa fa-map-marker" aria-hidden="true"></i>&emsp;' +
            PAGE_DATA.chirper.location +
            '</p>'
    );
    $('#info').append(
        "<p><i class='fa fa-link' aria-hidden='true'></i>&emsp;<a target='_blank' href='https://" +
            PAGE_DATA.chirper.website +
            "'>" +
            PAGE_DATA.chirper.website +
            '</a></p>'
    );
    $('#info').append(
        '<p><i class="fa fa-calendar" aria-hidden="true"></i>&emsp;Joined: ' +
            months[PAGE_DATA.chirper.joined.month - 1] +
            ' ' +
            PAGE_DATA.chirper.joined.year +
            '</p>'
    );
    $('#info').append(
        "<p><i class='fa fa-picture-o' aria-hidden='true'></i>&emsp;<a href=''>Photos and Videos</a></p>"
    );
}
function draw() {
    writeInfo();
    writeChirps();
}
function main() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ('its ready');
            PAGE_DATA = xhttp.responseText;
            console.log(PAGE_DATA);
            PAGE_DATA = JSON.parse(PAGE_DATA);
            PAGE_DATA;

            draw();
        } else {
            ('failed');
        }
    };
    xhttp.open('GET', 'https://bcca-chirper.herokuapp.com/api/raymondh/', true);
    xhttp.send();
}
$(main);
