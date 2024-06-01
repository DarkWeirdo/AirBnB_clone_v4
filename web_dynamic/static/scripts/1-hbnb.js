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
