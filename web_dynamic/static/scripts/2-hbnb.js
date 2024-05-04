$(document).ready(function () {
    let amenities = {};
    let i = 1;
    $('input[type=checkbox]').change(function () {
        let amenity_id = $(this).data('id');
        let amenity_name = $(this).data('name') || i++;
        console.log($(this).data('name'));
        if (this.checked) {
            console.log("Check");
            amenities[amenity_id] = amenity_name;
        } else {
            console.log("Uncheck");
            delete amenities[amenity_id];
        }
        console.log(amenities);
        update_amenities();
    });
    function update_amenities() {
        amty = Object.values(amenities);
        var a_text = (amty.length > 0) ? amty.join(', ') : '';
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
