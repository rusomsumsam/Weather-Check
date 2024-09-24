'use strict'

let catchInput = document.getElementById('inpt');
let catchButton = document.getElementById('btn');
let catchDiv = document.getElementById('output');
let catchPrevMsg = document.getElementById('prevMsg');

function responseApi() {
    let inputValue = catchInput.value;
    let apiLink = `http://api.weatherapi.com/v1/current.json?key=d246603bb4074379a2502550242409&q=${inputValue}&aqi=yes`;
    fetch(apiLink)
        .then(res => {
            if (!res.ok) {
                throw new Error('City Name Not Found!')
            }
            return res.json();
        })
        .then(res => apiData(res, inputValue))
        .catch(error => {
            alert('City Name Not Found! Please Enter Correct City Name.');
        })
}


function apiData(recieveData, recieveInputValue) {
    let storeData = recieveData;
    let storeInputValue = recieveInputValue.charAt(0).toUpperCase() + recieveInputValue.slice(1);//For Uppercase the first letter of user input value
    catchDiv.innerHTML= `<p class="header">${storeInputValue}</p>
                        <p class="item"><span class='icon_cus'><i class="fa-solid fa-temperature-three-quarters"></i></span> Temperature : <span class="item_one">${storeData.current.temp_c}</span> C / <span class="item_two">${storeData.current.temp_f}</span> F</p>
                        <p class="item"><span class='icon_cus'><i class="fa-solid fa-temperature-high"></i></span> Feels Like : <span class="item_one">${storeData.current.feelslike_c}</span> C / <span class="item_two">${storeData.current.feelslike_f}</span> F</p>
                        <p class="item"><span class='icon_cus'><i class="fa-solid fa-droplet"></i></span> Humidity : <span class="item_single">${storeData.current.humidity}</span></p>
                        <p class="item"><span class='icon_cus'><i class="fa-solid fa-wind"></i></span> Wind Chill : <span class="item_one">${storeData.current.windchill_c}</span> C / <span class="item_two">${storeData.current.windchill_f}</span> F</p>
                        <p class="item"><span class='icon_cus'><i class="fa-regular fa-flag"></i></span> Country : <span class="item_single">${storeData.location.country}</span></p>
                        <p class="item"><span class='icon_cus'><i class="fa-regular fa-clock"></i></span> Local Time : <span class="item_single">${storeData.location.localtime}</span></p>
                        `
}

catchButton.addEventListener('click', function () {
    catchPrevMsg.style.display = 'none';
    responseApi();
    catchInput.value = '';
})
