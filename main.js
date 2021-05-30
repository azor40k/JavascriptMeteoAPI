//déclaration de variable
let userLocation;
let long;
let lat;

//function lancé au chargement de la page
window.addEventListener("load", async () => {
	//position actuelle
	userLocation = await myLocation().then(position => {
		long = position.coords.longitude	;
		lat = position.coords.latitude;
	});
	//api
	fetchMeteo(long, lat)
});

//clique sur les boutons
document.querySelectorAll(".cities .city").forEach((item) => {
	item.addEventListener("click", async (event) => {
		const city = event.target;
		if (city.getAttribute("data-city") === "location") {
			userLocation = await myLocation().then(position => {
				long = position.coords.longitude;
				lat = position.coords.latitude;
			});
		} else {
			//récupération des coordonnées du bouton
			long = parseFloat(city.getAttribute("data-long"));
			lat = parseFloat(city.getAttribute("data-lat"));
		}
		//api
		fetchMeteo(long, lat);
	});
});

const myLocation = () => {
	if (navigator.geolocation) {
		return new Promise(function(position, error) {
			navigator.geolocation.getCurrentPosition(position, error);
		});
	}
}	
	
const fetchMeteo = (long, lat) => {
	//déclaration variable et link relation à une class
	let temperatureDescription = document.querySelector(
		".temperature-description"
	);
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimeZone = document.querySelector(".location-timezone");
	// let locationDate = document.querySelector(".location-date");
	let temperatureSection = document.querySelector(".temperature");
	let temperatureSpan = document.querySelector(".temperature span");
	let Icons = document.querySelector("img");

	//ajout des variables latitude et longitude à lapi
	const api = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${long}&lat=${lat}`;

	//call api
	fetch(api, {
		method: "GET",
		headers: {
			"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
			"x-rapidapi-key": "b1db953994msh5aadefb5944dcabp1e9f24jsn3e11b8a8869b",
		},
	})
		.then((response) => {
			console.log(response);
			//renvoie des données recu en JSON
			return response.json();
		})
		.then((data) => {
			console.log(data);

			//abréviation des variable récupéré de l'api
			const { temp, timezone /*datetime*/ } = data.data[0];
			const { description, icon } = data.data[0].weather;

			//set des données recu de l'api
			temperatureDegree.textContent = temp;
			temperatureDescription.textContent = description;
			locationTimeZone.textContent = timezone;
			// locationDate.textContent = datetime;

			//changement de l'icon
			Icons.src = `icons/${icon}.png`;

			//conversion de celsius en fahrenheit
			let fahrenheit = temp * (5 / 9) + 32;

			//changement d'unité
			temperatureSection.addEventListener("click", () => {
				if (temperatureSpan.textContent === "°C") {
					temperatureSpan.textContent = "°F";
					temperatureDegree.textContent = Math.floor(fahrenheit);
				} else {
					temperatureSpan.textContent = "°C";
					temperatureDegree.textContent = temp;
				}
			});
		});
};