$(document).ready(function () {
	let amenities = {};
	let i = 1;
	$("input[type=checkbox]").change(function () {
		let amenity_id = $(this).data("id");
		let amenity_name = $(this).data("name") || i++;
		console.log($(this).data("name"));
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
		var a_text = amty.length > 0 ? amty.join(", ") : "";
		$(".amenities h4").text(a_text);
	}
});
const url = "http://0.0.0.0:5001/api/v1/status/";
document.addEventListener("DOMContentLoaded", function () {
	$.get(url, function (data, textStatus) {
		if (textStatus === "success" && data.status === "OK") {
			$("div#api_status").addClass("available");
			$("div#api_status").css("background-color", "#ff545f");
		} else {
			$("div#api_status").removeClass("available");
		}
	});
});

const _url = "http://0.0.0.0:5001/api/v1/status/";
document.addEventListener("DOMContentLoaded", function () {
	$.get(url, function (data, textStatus) {
		if (textStatus === "success" && data.status === "OK") {
			console.log("Yay");
		} else {
			console.log("Neh!");
		}
	});
});

// Make a POST request to the API
fetch('http://0.0.0.0:5001/api/v1/places_search/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
})
.then(response => response.json())
.then(data => {
  // Loop through the result and create article tags for each place
  data.forEach(place => {
    const article = document.createElement('article');
    article.innerHTML = `
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guests</div>
        <div class="number_rooms">${place.number_rooms} Bedrooms</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
      </div>
      <div class="description">
        ${place.description.replace(/<[^>]*>?/gm, '')}
      </div>
    `;
    document.querySelector('.places').appendChild(article);
  });
})
.catch(error => console.error('Error:', error));
