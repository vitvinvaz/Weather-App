const apiKey = process.env.API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const dispp = document.querySelector(".disp");
const error1 = document.querySelector(".error");

const weather_image = document.querySelector(".weather-img");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    if (response.status < 400) {
        var data = await response.json();
        console.log(data);

        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "<sup>o</sup>c";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("windspeed").innerHTML = data.wind.speed + "Km/hr";

        if (data.weather[0].main == "Clouds") {
            weather_image.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Rain") {
            weather_image.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Clear") {
            weather_image.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weather_image.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weather_image.src = "images/mist.png";
        }
        error1.style.display = "none";
        dispp.style.display = "block";
    } else {
        dispp.style.display = "none";
        error1.style.display = "block";
    }

}

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
    document.querySelector(".disp").style.display = "block";
})

