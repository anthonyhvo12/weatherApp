/**
 * Handle successful API calls for the current weather data.
 * @param {*} isImperial true if imperial is set, false if metric is set
 */
function handleSuccessCur(isImperial) {
    const data = JSON.parse(this.responseText);
    document.getElementsByTagName("img")[0].src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    document.getElementById("curOutlook").textContent = data.weather[0].main;
    if (isImperial) {
        document.getElementById("curTemp").textContent = data.main.temp.toFixed(1) + " Farenheit";
        document.getElementById("curWind").textContent = data.wind.speed.toFixed(1) + " mph";
    }
    else {
        document.getElementById("curTemp").textContent = data.main.temp.toFixed(1) + " Celsius";
        document.getElementById("curWind").textContent = data.wind.speed.toFixed(1) + " kph";
    }
}

/**
 * Handle successful API calls for the weather forecast data.
 * @param {*} isImperial true if imperial is set, false if metric is set
 */
function handleSuccessFc(isImperial) {
    const data = JSON.parse(this.responseText);
    for (i = 0; i < 8; i++) {
        document.getElementById("fc" + i).childNodes[1].src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
        document.getElementById("fc" + i).childNodes[3].textContent = (new Date(data.list[i].dt_txt)).toLocaleString('en-US', { hour: 'numeric', hour12: true });
        if (isImperial) {
            document.getElementById("fc" + i).childNodes[5].textContent = data.list[i].main.temp.toFixed(1) + "°F";
        }
        else {
            document.getElementById("fc" + i).childNodes[5].textContent = data.list[i].main.temp.toFixed(1) + "°C";
        }
    }
}

/**
 * Handle unsuccessful API calls for the current weather/forecast data.
 */
const handleError = () => {
    console.log("An error occured!")
}

/**
 * Update the currently displayed weather information on the page (currently for Carlisle, PA 17013).
 * This will update the current weather as well as the forecast data for the next day
 * in 3-hour increments.
 */
const updateWeather = () => {
    const curWeatherRequest = new XMLHttpRequest();
    const fcRequest = new XMLHttpRequest();
    let urlCur;
    let urlFc;
    let isImperial; 
    if (document.getElementById("imperial").checked) {
        urlCur = "http://api.openweathermap.org/data/2.5/weather?zip=17013,us&units=imperial&appid=1ffbfb4b9d54e88f644a2e3fbd4abb68";
        urlFc = "http://api.openweathermap.org/data/2.5/forecast?zip=17013,us&units=imperial&appid=1ffbfb4b9d54e88f644a2e3fbd4abb68";
        isImperial = true;
    }
    else {
        urlCur = 'http://api.openweathermap.org/data/2.5/weather?zip=17013,us&units=metric&appid=1ffbfb4b9d54e88f644a2e3fbd4abb68';
        urlFc = "http://api.openweathermap.org/data/2.5/forecast?zip=17013,us&units=metric&appid=1ffbfb4b9d54e88f644a2e3fbd4abb68";
        isImperial = false;
    }
    curWeatherRequest.open('GET', urlCur);
    fcRequest.open('GET', urlFc);
    curWeatherRequest.onload = handleSuccessCur.bind(curWeatherRequest, isImperial);  
    fcRequest.onload = handleSuccessFc.bind(fcRequest, isImperial);
    curWeatherRequest.onerror = handleError;
    fcRequest.onerror = handleError;
    curWeatherRequest.send();
    fcRequest.send();
}