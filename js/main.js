
const apiUrl = "https://www.7timer.info/bin/civil.php?lon=4.904&lat=52.367&ac=0&unit=metric&output=json&tzshift=0";

async function checkWeather() {
    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data);

    // document.querySelector()
}

checkWeather();

const appear = document.querySelector(".appear");
console.log(appear);
appear.style.display = "none";

const selectElement = document.getElementById('drop-down');

        
selectElement.addEventListener('input', function(event) {
     if(event.target.value !== 0) {
        appear.style.display = "block"
     }
});