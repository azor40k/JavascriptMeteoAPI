//function lancé au chargement de la page
window.addEventListener('load', () => {

    //déclaration de variable
    let long;
    let lat;

    //déclaration variable et link relation à une class
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    // let locationDate = document.querySelector(".location-date");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector('.temperature span');
    let Icons = document.querySelector("img");

    //vérification d'existance de valeur obtenu 
    if (navigator.geolocation) {
        
        navigator.geolocation.getCurrentPosition(position => {

            //sauvegarde de la position actuelle
            long = position.coords.longitude
            lat = position.coords.latitude

            // //Coordonées New York
            // long = -74.0060152
            // lat = 40.7127281

            // //Coordonées Tokyo
            // long = 139.7594549
            // lat = 35.6828387
            
            //ajout des variables latitude et longitude à lapi
            const api = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${long}&lat=${lat}`
            
            //appelle de l'api
            fetch(api, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
                        "x-rapidapi-key": "b1db953994msh5aadefb5944dcabp1e9f24jsn3e11b8a8869b"
                    }
                })
                .then(response => {
                    // console.log(response);

                    //renvoie des données recu en JSON
                    return response.json();

                })
                .then(data => {
                    console.log(data);

                    //abréviation des variable récupéré de l'api 
                    const { temp, timezone, /*datetime*/ } = data.data[0];
                    const { description, icon } = data.data[0].weather;

                    //set des données recu de l'api
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimeZone.textContent = timezone;
                    // locationDate.textContent = datetime;

                    //changement de l'icon
                    Icons.src = `icons/${icon}.png`

                    //conversion de celsius en fahrenheit
                    let fahrenheit = (temp * (5 / 9) ) + 32 ;
                    
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

        });
    }

});