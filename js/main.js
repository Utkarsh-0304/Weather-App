document.addEventListener("DOMContentLoaded", function() {
    
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
        // const minMaxData = document.querySelectorAll(".minMax");
        // console.log(minMaxData);
    });
    
    const text = document.querySelectorAll(".text p");
    
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
    // console.log(data.dataseries.length);

//     const maxTemp = [];
//     const minTemp = []; 
    
//     for (let i = 0; i < data.dataseries.length - 8; i = i + 8) {
//         let max = 0;
//         for (let j = i; j < i + 8; j++) {
//             if( data.dataseries[j].temp2m > max) {
//                 max = data.dataseries[j].temp2m;
//             }
//        }
//        maxTemp.push(max);
//        let min = max;
//        for (let j = i; j < i + 8; j++) {
//         if( data.dataseries[j].temp2m < min) {
//             min = data.dataseries[j].temp2m;
//         }
//        }
//        minTemp.push(min);
//     }
//     console.log(maxTemp);
//     console.log(minTemp);

const maxTemp = [];
const minTemp = []; 

for (let i = 0; i < data.dataseries.length - 8; i = i + 8) {
    let max = -Infinity;
    let min = Infinity;
    for (let j = i; j < i + 8; j++) {
        const temperature = data.dataseries[j].temp2m;
        if (temperature > max) {
            max = temperature;
        }
        if (temperature < min) {
            min = temperature;
        }
    }
    maxTemp.push(max);
    minTemp.push(min);
}

    console.log(maxTemp);
    console.log(minTemp);

    
    text.forEach(element => {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "minMax");
        element.appendChild(newDiv);
    });
    // console.log(newDiv);
    // console.log(text[3]);
    const minMax = document.querySelectorAll(".minMax");
    // console.log(minMax[0]);

    for (let i = 0; i < 7; i++) {
        minMax[i].innerHTML = `HI: ${maxTemp[i]} <br> LO: ${minTemp[i]}`;
    }
}

checkWeather();
});