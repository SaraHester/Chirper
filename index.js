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
    console.log(PAGE_DATA);
    var d = new Date();
    chirp = {
        author: {
            name: PAGE_DATA.chirper.name,
            username: PAGE_DATA.chirper.username
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
    $('#info').html(
        '<div id="photo" ><img src=""></div>' +
            "<h2><a target='_blank' href='https://twitter.com/" +
            PAGE_DATA.chirper.username +
            "'>" +
            PAGE_DATA.chirper.name +
            '</a></h2>' +
            '<p>@' +
            PAGE_DATA.chirper.username +
            '</p>' +
            '<p>' +
            PAGE_DATA.chirper.description +
            '</p>' +
            '<p><i class="fa fa-map-marker" aria-hidden="true"></i>&emsp;' +
            PAGE_DATA.chirper.location +
            '</p>' +
            "<p><i class='fa fa-link' aria-hidden='true'></i>&emsp;<a target='_blank' href='https://" +
            PAGE_DATA.chirper.website +
            "'>" +
            PAGE_DATA.chirper.website +
            '</a></p>' +
            '<p><i class="fa fa-calendar" aria-hidden="true"></i>&emsp;Joined: ' +
            months[PAGE_DATA.chirper.joined.month - 1] +
            ' ' +
            PAGE_DATA.chirper.joined.year +
            '</p>' +
            "<p><i class='fa fa-picture-o' aria-hidden='true'></i>&emsp;<a href=''>Photos and Videos</a></p>"
    );
}
function writeYma() {
    for (i = 0; i < PAGE_DATA.youMayAlsoLike.length; i++) {
        $('#yma').append(
            '<hr><div id="ymaperson"><img src="' +
                PAGE_DATA.youMayAlsoLike[i].picUrl +
                '"> <div id="ymainfo">' +
                PAGE_DATA.youMayAlsoLike[i].name +
                '<br>' +
                PAGE_DATA.youMayAlsoLike[i].username +
                '</div></div>'
        );
    }
}
function draw() {
    writeInfo();
    writeChirps();
    writeYma();
}
function main() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ('its ready');
            PAGE_DATA = xhttp.responseText;
            console.log(PAGE_DATA);
            PAGE_DATA = JSON.parse(PAGE_DATA);
            PAGE_DATA.youMayAlsoLike = [
                {
                    name: 'David Beasly',
                    username: '@dabeaz',
                    picUrl:
                        'https://pbs.twimg.com/profile_images/848508178639749120/x8ltNamO_bigger.jpg'
                },
                {
                    name: 'Guido van Rossum',
                    username: '@gvanrossum',
                    picUrl:
                        'https://pbs.twimg.com/profile_images/424495004/GuidoAvatar_bigger.jpg'
                },
                {
                    name: 'Brandon Rhodes',
                    username: '@brandon_rhodes',
                    picUrl:
                        'https://pbs.twimg.com/profile_images/378800000204519400/f6f79294738b8b6afa67dd21c5463633_bigger.jpeg'
                },
                {
                    name: 'Python Software',
                    username: '@ThePSF',
                    picUrl:
                        'https://pbs.twimg.com/profile_images/439154912719413248/pUBY5pVj_bigger.png'
                },
                {
                    name: 'Pycoders Weekly',
                    username: '@pycoders',
                    picUrl:
                        'https://pbs.twimg.com/profile_images/429285908953579520/InZKng9-_bigger.jpeg'
                }
            ];

            draw();
        } else {
            ('failed');
        }
    };
    xhttp.open('GET', 'https://bcca-chirper.herokuapp.com/api/raymondh/', true);
    xhttp.send();
}
$('#search').click(function() {
    search_username = $('#searchBox').val();
    // take search-area id and see if the username exists.
    // maybe console.log it for later
    $.get(
        'https://bcca-chirper.herokuapp.com/api/username_exists/' +
            search_username +
            '/'
    )
        .then(function handleFeedResponse(response) {
            if (response.exists === true) {
                console.log("It's True!");
                $.get(
                    'https://bcca-chirper.herokuapp.com/api/' +
                        search_username +
                        '/'
                ).then(function(feed) {
                    PAGE_DATA = feed;
                    console.log(search_username);
                    draw();
                    chirpybox();
                });
            } else {
                console.log('It does not exist!');
            }
        })
        .catch(function handleFeedReason(reason) {
            console.log('Failure:', reason);
        });
});
$(main);
