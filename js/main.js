  var apiUrl;
  const selectElement = document.getElementById('drop-down');
  const appear = document.querySelector(".appear");
  appear.style.display = "none";
  let cities = [];
//   const body = document.querySelector("body");
  
  selectElement.addEventListener('change', function(e) {
      var value = JSON.parse(this.value);
      console.log(value);
      apiUrl = `https://www.7timer.info/bin/civil.php?lon=${value.lon}&lat=${value['lat']}&ac=0&unit=metric&output=json&tzshift=0`;
      console.log(apiUrl);
      showLoader();
      checkWeather();
 });

 const csvFilePath = 'city_coordinates.csv';

 fetch(csvFilePath)
     .then(response => response.text())
     .then(data => {
         cities = parseCSV(data);
         populateDropdown(cities);
     })
     .catch(error => {
         console.error('Error fetching city coordinates:', error);
     });

 function parseCSV(data) {
     const lines = data.split('\n');
     

     for (let i = 1; i < lines.length; i++) {
         const [latitude, longitude, city, state] = lines[i].split(',');
         cities.push({ latitude, longitude, city, state });
     }
     console.log(cities);
     return cities;
 }

 function populateDropdown(cities) {
     cities.forEach(city => {
         const option = document.createElement('option');
         option.value = `{"lat": ${city.latitude},"lon": ${city.longitude}}`;
         option.textContent = `${city.city}, ${city.state}`;
         selectElement.appendChild(option);
     });
 }

async function checkWeather() {

    if(!apiUrl) {
        return;
    }

    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data);

    hideLoader();

    appear.style.display = "block";

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

    // selectElement.addEventListener('change', function() {
    //     console.log(this.value);
    // });
    
    const text = document.querySelectorAll(".text p");
    
    const img = document.querySelectorAll("img");
    console.log(img);


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

    const items = document.querySelectorAll(".item");
    console.log(items);
    
    items.forEach(element => {
        const existingMinMax = element.querySelector(".minMax");
        if (existingMinMax) {
            existingMinMax.remove(); // Remove existing minMax element if it exists
        }
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "minMax");
        element.appendChild(newDiv);
    });

    const minMax = document.querySelectorAll(".minMax");


    for (let i = 0; i < 7; i++) {
        minMax[i].innerHTML = `HI: ${maxTemp[i]} <br> LO: ${minTemp[i]}`;
    }

    // appear.innerHTML = '';
    // appear.style.display = "none";
    
    const weatherMap = new Map();
    let k = 0;
    for (let i = 0; i < data.dataseries.length && k < 7; i = i + 8) {
        weatherMap.clear();
        for (let j = i; j < i + 8; j++) {
            const weather = data.dataseries[j].weather;
            const cleanWeather = weather.replace('day', '').replace('night', '');
            console.log(cleanWeather);
            weatherMap.set(cleanWeather, 
                (weatherMap.get(cleanWeather) || 0) + 1);
        }
            
        console.log(weatherMap);

        let maxCountWord = "";
        let max = 0;
        
        for (const [word, count] of weatherMap.entries()) {
            if (count > max) {
                max = count;
                maxCountWord = word;
            }
        }
        console.log(max);
        console.log(maxCountWord);

        switch(maxCountWord) {
            case 'clear':
                img[k].src = "images/clear.png";
                text[k].innerHTML = "CLEAR";
                break;
            case 'pcloudy':
                img[k].src = "images/pcloudy.png";
                text[k].innerHTML = "PARTLY CLOUDY";
                break;
            case 'mcloudy':
                img[k].src = "images/mcloudy.png";
                text[k].innerHTML = "CLOUDY";
                break;
            case 'cloudy':
                img[k].src = "images/cloudy.png";
                text[k].innerHTML = "VERY CLOUDY";
                break;
            case 'humid':
                img[k].src = "images/humid.png";
                text[k].innerHTML = "FOGGY";
                break;
            case 'lightrain':
                img[k].src = "images/lightrain.png";
                text[k].innerHTML = "LIGHT RAIN";
                break;
            case 'oshower':
                img[k].src = "images/oshower.png";
                text[k].innerHTML = "OCCASIONAL SHOWERS";
                break;
            case 'ishower':
                img[k].src = "images/ishower.png";
                text[k].innerHTML = "ISOLATED SHOWERS";
                break;
            case 'lightsnow':
                img[k].src = "images/lightsnow.png";
                text[k].innerHTML = "LIGHT SNOW";
                break;
            case 'rain':
                img[k].src = "images/rain.png";
                text[k].innerHTML = "RAIN";
                break;
            case ('snow'):
                img[k].src = "images/snow.png";
                text[k].innerHTML = "SNOW";
                break;
            case 'rainsnow':
                img[k].src = "images/rainsnow.png";
                text[k].innerHTML = "MIXED";
                break;
            case 'ts':
                img[k].src = "images/tsrain.png";
                text[k].innerHTML = "THUNDERSTORM POSSIBLE";
                break;
            case 'tsrain':
                img[k].src = "images/tstorm.png";
                text[k].innerHTML = "THUNDERSTORM";
                break;
            default:
                img[k].src = "images/windy.png";
                text[k].innerHTML = "WINDY";
                break;
        }
    k++;
}
}

function showLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.remove("loader-hidden"); // Show loader
}

function hideLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden"); // Hide loader
}
