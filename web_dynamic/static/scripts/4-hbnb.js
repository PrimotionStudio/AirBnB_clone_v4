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

const request = require('request');

// Function to send POST request and create article tags
function fetchPlaces() {
  const options = {
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  };

  request(options, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.error('Failed to fetch places:', error || body);
      return;
    }

    try {
      const places = JSON.parse(body);
      const placesSection = document.querySelector('section.places');
      places.forEach(place => {
        const article = document.createElement('article');
        article.innerHTML = `
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description.replace(/<[^>]*>?/gm, '')}
          </div>
        `;
        placesSection.appendChild(article);
      });
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError.message);
    }
  });
}

// Call the function to fetch and display places
fetchPlaces();
