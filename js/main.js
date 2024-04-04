
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

    // sevenDays.forEach(item => {
    //     console.log(item);
    // });

    function setData() { 
        for(let i = 0; i < 7; i++) {
            const valPass = `.timeData-${i}`;
            // console.log(valPass);
            const timeData = document.querySelector(valPass);
            timeData.innerHTML = sevenDays[i];
        }
    }
    setData();
}

checkWeather();

const appear = document.querySelector(".appear");
appear.style.display = "none";

const selectElement = document.getElementById('drop-down');

        
selectElement.addEventListener('input', function(event) {
     if(event.target.value !== 0) {
        appear.style.display = "block"
     }
});