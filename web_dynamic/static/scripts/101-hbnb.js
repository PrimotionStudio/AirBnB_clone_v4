$(document).ready(function () {
	let amenities = {};
	let locations = {};
	let states = {};
	let cities = {};
	let i = 1;
	$("input.amen").change(function () {
		let amenity_id = $(this).data("id");
		let amenity_name = $(this).data("name") || i++;
		if (this.checked) {
			amenities[amenity_id] = amenity_name;
		} else {
			delete amenities[amenity_id];
		}
		update_amenities();
	});
	$("input.state").change(function () {
		let state_id = $(this).data("id");
		let state_name = $(this).data("name") || i++;
		if (this.checked) {
			locations[state_id] = state_name;
			states[state_id] = state_name;
		} else {
			delete locations[state_id];
			delete states[state_id];
		}
		update_loc();
	});
	$("input.city").change(function () {
		let city_id = $(this).data("id");
		let city_name = $(this).data("name") || i++;
		if (this.checked) {
			locations[city_id] = city_name;
			cities[city_id] = city_name;
		} else {
			delete locations[city_id];
			delete cities[city_id];
		}
		update_loc();
	});
	function update_amenities() {
		amty = Object.values(amenities);
		var a_text = amty.length > 0 ? amty.join(", ") : "";
		$(".amenities h4").text(a_text);
	}
	function update_loc() {
		loc = Object.values(locations);
		var l_text = loc.length > 0 ? loc.join(", ") : "";
		$(".locations h4").text(l_text);
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

const xhr = new XMLHttpRequest();
xhr.open("POST", "http://0.0.0.0:5001/api/v1/places_search/");
xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
const body = JSON.stringify({});
xhr.onload = () => {
	if (xhr.readyState == 4 && (xhr.status == 201 || xhr.status == 200)) {
		JSON.parse(xhr.responseText).forEach((place) => {
			const article = document.createElement("article");
			let art = ``;
			let _url = `http://0.0.0.0:5001/api/v1/places/${place.id}/reviews`;
			$.get(_url, function (data, textStatus) {
				if (textStatus === "success" && data.status === "OK") {
					console.log("Data", data);
				}
			});
			art = `<div class="title_box">
						<h2>${place.name || "Hotel"}</h2>
						<div class="price_by_night">$${place.price_by_night || 0.0}</div>
					  </div>
					  <div class="information">
						<div class="max_guest">${place.max_guest || 0} Guests</div>
						<div class="number_rooms">${place.number_rooms || 0} Bedrooms</div>
						<div class="number_bathrooms">${place.number_bathrooms || 0} Bathroom</div>
					  </div>
					  <div class="description">
						${
							place.description ||
							"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, aperiam."
						}
					  </div>
					  <div class="reviews">
					      <h3>Reviews</h3> <span>show</span>
					  	  <hr>
						  <ul id="_reviews" style="display: block">
							  <li>
								  <p>
									  From Bob Dylan the 27th January 2017
								  </p>
							  </li>
							  <li>
								  <p>From Bob Dylan the 27th January 2017</p>
							  </li>
						  </ul>
					  </div>`;
			article.innerHTML = art;
			document.querySelector("section.places").appendChild(article);
		});
	} else {
		console.log(`Error: ${xhr.status}`);
	}
};
xhr.send(body);

document
	.querySelector("button[type=search]")
	.addEventListener("click", function () {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "http://0.0.0.0:5001/api/v1/places_search/");
		xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
		const body = JSON.stringify({
			states: Object.keys(states),
			cities: Object.keys(cities),
			amenities: Object.keys(amenities),
		});
		xhr.onload = () => {
			if (
				xhr.readyState == 4 &&
				(xhr.status == 201 || xhr.status == 200)
			) {
				JSON.parse(xhr.responseText).forEach((place) => {
					document.querySelector("section.places").innerHTML = "";
					const article = document.createElement("article");
					let art = ``;
					art = `<div class="title_box">
						<h2>${place.name || "Hotel"}</h2>
						<div class="price_by_night">$${place.price_by_night || 0.0}</div>
					  </div>
					  <div class="information">
						<div class="max_guest">${place.max_guest || 0} Guests</div>
						<div class="number_rooms">${place.number_rooms || 0} Bedrooms</div>
						<div class="number_bathrooms">${place.number_bathrooms || 0} Bathroom</div>
					  </div>
					  <div class="description">
						${
							place.description ||
							"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, aperiam."
						}
					  </div>
					  <div class="reviews">
					      <h3>Reviews</h3> <span>show</span>
					  	  <hr>
						  <ul id="_reviews" style="display: block">
							  <li>
								  <p>
									  From Bob Dylan the 27th January 2017
								  </p>
							  </li>
							  <li>
								  <p>From Bob Dylan the 27th January 2017</p>
							  </li>
						  </ul>
					  </div>`;
					article.innerHTML = art;
					document
						.querySelector("section.places")
						.appendChild(article);
				});
			} else {
				console.log(`Error: ${xhr.status}`);
			}
		};
		xhr.send(body);
	});
