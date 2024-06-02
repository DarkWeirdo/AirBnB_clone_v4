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
$(document).ready(function () {
    const selectedAmenities = {};

    // Update selected amenities
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }
        updateAmenitiesText();
    });

    function updateAmenitiesText() {
        const amenitiesList = Object.values(selectedAmenities);
        if (amenitiesList.length > 0) {
            $('div.amenities h4').text(amenitiesList.join(', '));
        } else {
            $('div.amenities h4').html('&nbsp;');
        }
    }

    // Fetch places based on amenities
    $('button').click(function () {
        const amenitiesIds = Object.keys(selectedAmenities);

        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenitiesIds }),
            success: function (data) {
                $('section.places').empty();
                for (const place of data) {
                    const article = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guests</div>
                                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>
                    `;
                    $('section.places').append(article);
                }
            },
            error: function (error) {
                console.error('Error fetching places:', error);
            }
        });
    });

    // Initial places fetch without filters
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            $('section.places').empty();
            for (const place of data) {
                const article = `
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guests</div>
                            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `;
                $('section.places').append(article);
            }
        },
        error: function (error) {
            console.error('Error fetching places:', error);
        }
    });
});
