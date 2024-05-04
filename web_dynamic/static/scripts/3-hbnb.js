$(document).ready(function () {
    let amenity_ids = [];
    $('input[type=checkbox]').change(function() {
        let amenity_id = $(this).data('id');
        if ($(this).is(':checked')) {
            amenity_ids.push(amenity_id);
        } else {
            let i = amenity_ids.indexOf(amenity_id);
            if (i !== -1) {
                amenity_ids.splice(i, 1);
            }
            amenity_ids = amenity_ids.filter(function(item) {
                return item !== amenity_id;
            });
        }
        update_amenities();
    });
    function update_amenities() {
        var a_text = amenity_ids.length ? amenity_ids.join(', ') : 'None';
        $('.amenities h4').text(a_text);
    }
    
});
const url = 'http://0.0.0.0:5001/api/v1/status/';
document.addEventListener('DOMContentLoaded', function () {
    $.get(url, function (data, textStatus) {
        if (textStatus === 'success' && data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });
});
