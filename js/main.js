
const apiUrl = "https://www.7timer.info/bin/civil.php?lon=4.904&lat=52.367&ac=0&unit=metric&output=json&tzshift=0";

async function checkWeather() {
    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data);

    const today = new Date();
    
    
    function addDays(date,  days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const sevenDays = [];
    for (let i = 0; i < 7; i++) {
        const nextDate = addDays(today, i);
        const currDay = nextDate.toLocaleString('en-us', { weekday: 'short'});
        const currMonth = nextDate.toLocaleString('en-us', { month: 'long'});
        const currDate = nextDate.getDate();
        const formattedDate = `${currDay} ${currMonth} ${currDate}`;
        sevenDays.push(formattedDate);
    }

    function setData() { 
        for(let i = 0; i < 7; i++) {
            const valPass = `.timeData-${i}`;
            // console.log(valPass);
            const timeData = document.querySelector(valPass);
            timeData.innerHTML = sevenDays[i];
        }
    }
    setData();

    const appear = document.querySelector(".appear");
    appear.style.display = "none";

    const selectElement = document.getElementById('drop-down');

        
    selectElement.addEventListener('input', function(event) {
        const selectValue = selectElement.value;
        if(event.target.value !== 0) {
            appear.style.display = "block"
        }
    });
    
    const text = document.querySelectorAll(".text");
    const img = document.querySelectorAll("img");
    for (let i = 0; i < 7; i++) {
        if(data.dataseries[i].weather === "clearday" || data.dataseries[i].weather === "clearnight") {
            img[i].src = "images/clear.png";
            text[i].innerHTML = "CLEAR";
        }

        else if(data.dataseries[i].weather === "pcloudyday" || data.dataseries[i].weather === "pcloudynight") {
            img[i].src = "images/pcloudy.png";
            text[i].innerHTML = "PARTLY CLOUDY";
        }
        
        else if(data.dataseries[i].weather === "mcloudyday" || data.dataseries[i].weather === "mcloudynight") {
            img[i].src = "images/mcloudy.png";
            text[i].innerHTML = "CLOUDY";
        }
        
        else if(data.dataseries[i].weather === "cloudyday" || data.dataseries[i].weather === "cloudynight") {
            img[i].src = "images/cloudy.png";
            text[i].innerHTML = "VERY CLOUDY";
        }
        
        else if(data.dataseries[i].weather === "humidday" || data.dataseries[i].weather === "humidnight") {
            img[i].src = "images/humid.png";
            text[i].innerHTML = "FOGGY";
        }
        
        else if(data.dataseries[i].weather === "lightrainday" || data.dataseries[i].weather === "lightrainnight") {
            img[i].src = "images/lightrain.png";
            text[i].innerHTML = "SHOWERS";
        }
        
        else if(data.dataseries[i].weather === "oshowerday" || data.dataseries[i].weather === "oshowernight") {
            img[i].src = "images/oshower.png";
            text[i].innerHTML = "OCCASIONAL SHOWERS";
        }
        
        else if(data.dataseries[i].weather === "ishowerday" || data.dataseries[i].weather === "ishowernight") {
            img[i].src = "images/ishower.png";
            text[i].innerHTML = "ISOLATED SHOWERS";
        }
        
        else if(data.dataseries[i].weather === "lightsnowday" || data.dataseries[i].weather === "lightsnownight") {
            img[i].src = "images/lightsnow.png";
            text[i].innerHTML = "LIGHT SNOW";
        }
        
        else if(data.dataseries[i].weather === "rainday" || data.dataseries[i].weather === "rainnight") {
            img[i].src = "images/rain.png";
            text[i].innerHTML = "RAIN";
        }
        
        else if(data.dataseries[i].weather === "snowday" || data.dataseries[i].weather === "snownight") {
            img[i].src = "images/snow.png";
            text[i].innerHTML = "SNOW";
        }
        
        else if(data.dataseries[i].weather === "rainsnowday" || data.dataseries[i].weather === "rainsnownight") {
            img[i].src = "images/rainsnow.png";
            text[i].innerHTML = "MIXED";
        }
        
        else if(data.dataseries[i].weather === "tsday" || data.dataseries[i].weather === "tsnight") {
            img[i].src = "images/tsrain.png";
            text[i].innerHTML = "THUNDERSTORM POSSIBLE";
        }
        
        else if(data.dataseries[i].weather === "tsrainday" || data.dataseries[i].weather === "tsrainnight") {
            img[i].src = "images/tstorm.png";
            text[i].innerHTML = "THUNDERSTORM";
        }
        else {
            img[i].src = "images/windy.png";
            text[i].innerHTML = "WINDY";
        }   
    }
}

checkWeather();

