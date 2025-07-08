const weatherform = document.querySelector(".weatherForm");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const APIkey = "// put your API-key here";

weatherform.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityinput.value;
    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayweatherInfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error);
        }
    }
    else{
        displayerror("please enter a city!");
    }
});

async function getweatherdata(city){
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
    
    const response = await fetch(APIurl);

    if(!response.ok){
        throw new Error("could not fetch data!");
    }
    return await response.json();
}

function displayweatherInfo(data){
    const { name: city, 
            main: {temp, humidity}, 
            weather : [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descdisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");

    citydisplay.textContent = city;
    citydisplay.classList.add(".citydisplay");
    card.appendChild(citydisplay);

    tempdisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempdisplay.classList.add(".temp_diplay");
    card.appendChild(tempdisplay);

    humiditydisplay.textContent = `humidity: ${humidity}%`;
    humiditydisplay.classList.add(".humidty_display");
    card.appendChild(humiditydisplay); 
    
    descdisplay.textContent = description;
    descdisplay.classList.add(".description");
    card.appendChild(descdisplay); 
    
    weatheremoji.textContent = getweatherEmoji(id);
    weatheremoji.classList.add(".waetheremoji");
    card.appendChild(weatheremoji);  
}
function getweatherEmoji(weatherId){
    switch(true){
        case (weatherId >=200 && weatherId < 300):
            return "⛈";
        case (weatherId >=300 && weatherId < 400):
            return "🌧";
        case (weatherId >=500 && weatherId < 600):
            return "🌨";
        case (weatherId >=600 && weatherId < 700):
            return "❄";
        case (weatherId >=700 && weatherId < 800):
            return "🌫";
        case (weatherId ===800):
            return "🌞";
        case (weatherId >=801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}
function displayerror(message){
    const error = document.createElement("p");
    error.textContent = message;  
    error.classList.add("error_display");  

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(error);
}