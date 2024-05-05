// $(document).ready(function () {
//   let amenities = {};
//   let i = 1;
//   $('input[type=checkbox]').change(function () {
//     let amenity_id = $(this).data('id');
//     let amenity_name = $(this).data('name') || i++;
//     console.log($(this).data('name'));
//     if (this.checked) {
//       console.log("Check");
//       amenities[amenity_id] = amenity_name;
//     } else {
//       console.log("Uncheck");
//       delete amenities[amenity_id];
//     }
//     console.log(amenities);
//     update_amenities();
//   });
//   function update_amenities() {
//     amty = Object.values(amenities);
//     var a_text = (amty.length > 0) ? amty.join(', ') : '';
//     $('.amenities h4').text(a_text);
//   }
// });
// const url = 'http://0.0.0.0:5001/api/v1/status/';
// document.addEventListener('DOMContentLoaded', function () {
//   $.get(url, function (data, textStatus) {
//     if (textStatus === 'success' && data.status === 'OK') {
//       $('div#api_status').addClass('available');
//       $('div#api_status').css('background-color', '#ff545f');
//     } else {
//       $('div#api_status').removeClass('available');
//     }
//   });
// });

// // const request = require('request');
// // function fetchPlaces() {
// //   const options = {
// //     url: 'http://0.0.0.0:5001/api/v1/places_search/',
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({})
// //   };
// //   request(options, (error, response, body) => {
// //     if (error || response.statusCode !== 200) {
// //       console.error('Failed to fetch places:', error || body);
// //       return;
// //     }
// //     console.log('Posted');
// //     try {
// //       const places = JSON.parse(body);
// //       const placesSection = document.querySelector('section.places');
// //       places.forEach(place => {
// //         const article = document.createElement('article');
// //         article.innerHTML = `
// //           <div class="title_box">
// //             <h2>${place.name}</h2>
// //             <div class="price_by_night">$${place.price_by_night}</div>
// //           </div>
// //           <div class="information">
// //             <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
// //             <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
// //             <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
// //           </div>
// //           <div class="description">
// //             ${place.description.replace(/<[^>]*>?/gm, '')}
// //           </div>
// //         `;
// //         placesSection.appendChild(article);
// //       });
// //     } catch (parseError) {
// //       console.error('Error parsing JSON:', parseError.message);
// //     }
// //   });
// // }
// async function fetch_places() {
//   const url = 'http://0.0.0.0:5001/api/v1/places_search';
//   const data = {};
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   };
//   fetch(url, options)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Network response was not ok.');
//       }
//     })
//     .then(jsonData => {
//       console.log(jsonData);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }
// fetch_places();




$(document).ready(() => {
  const amenities = {}; // Dictionary to store the checked amenities

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').on('change', function () {
    if (this.checked) {
      // If the checkbox is checked, store the Amenity ID in the dictionary
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      // If the checkbox is unchecked, remove the Amenity ID from the dictionary
      delete amenities[$(this).data('id')];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    $('div.amenities h4').text(Object.values(amenities).join(', '));
  });
});

// Request http://0.0.0.0:5001/api/v1/status/
$.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
  if (textStatus === 'success') {
    $('div#api_status').addClass('available');
  } else {
    $('div#api_status').removeClass('available');
  }
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({}),
  success: function (data) {
    for (const place of data) {
      const article = `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
          </div>
          <div class="description">
            ${place.description.replace(/<[^>]*>?/gm, '')}
          </div>
        </article>`;
      $('section.places').append(article);
    }
  }
});
