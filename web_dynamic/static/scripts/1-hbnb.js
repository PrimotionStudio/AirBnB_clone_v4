$(document).ready(function () {
    let amenity_id = [];
    $('input[type=checkbox]').change(function() {
        var amenityId = $(this).data('amenity-id');
        
        if ($(this).is(':checked')) {
            selectedAmenities.push(amenityId);
        } else {
            selectedAmenities = selectedAmenities.filter(function(item) {
                return item !== amenityId;
            });
        }

        updateSelectedAmenities();
    });

});