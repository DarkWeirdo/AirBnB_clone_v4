$(document).ready(function() {
    var amenities = {};

    $('input[type="checkbox"]').change(function() {
        var id = $(this).data('data-id');
        var name = $(this).data('data-name');

        if($(this).is(':checked')) {
            amenities[id] = name;
        } else {
            delete amenities[id];
        }

        var amenityList = Object.values(amenities).join(', ');
        $('h4.amenities').text(amenityList);
    });
});

$(document).ready(function() {
    var apiStatusDiv = $('div#api_status');

    $.get('http://0.0.0.0:5001/api/v1/status/')
        .done(function(data) {
            if (data.status === 'OK') {
                apiStatusDiv.addClass('available');
            }
        })
        .fail(function() {
            apiStatusDiv.removeClass('available');
        });
});
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the list of places
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        const placesSection = document.querySelector('section.places');
        data.forEach(place => {
            const article = document.createElement('article');

            const titleBox = document.createElement('div');
            titleBox.classList.add('title_box');

            const name = document.createElement('h2');
            name.textContent = place.name;

            const priceByNight = document.createElement('div');
            priceByNight.classList.add('price_by_night');
            priceByNight.textContent = `$${place.price_by_night}`;

            titleBox.appendChild(name);
            titleBox.appendChild(priceByNight);
            article.appendChild(titleBox);

            const information = document.createElement('div');
            information.classList.add('information');

            const maxGuest = document.createElement('div');
            maxGuest.classList.add('max_guest');
            maxGuest.textContent = `${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`;

            const numberRooms = document.createElement('div');
            numberRooms.classList.add('number_rooms');
            numberRooms.textContent = `${place.number_rooms} Room${place.number_rooms !== 1 ? 's' : ''}`;

            const numberBathrooms = document.createElement('div');
            numberBathrooms.classList.add('number_bathrooms');
            numberBathrooms.textContent = `${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`;

            information.appendChild(maxGuest);
            information.appendChild(numberRooms);
            information.appendChild(numberBathrooms);
            article.appendChild(information);

            const description = document.createElement('div');
            description.classList.add('description');
            description.textContent = place.description;

            article.appendChild(description);

            placesSection.appendChild(article);
        });
    })
    .catch(error => console.error('Error:', error));
});