let head = document.getElementById("head");
let content = document.getElementById("content");
let weatherType= document.getElementById("weatherType");
let searchbutton= document.getElementById("searchbutton");
let name= document.getElementById("name");
let tempdetails= document.getElementById("tempdetails");
let humidity= document.getElementById("humidity");
let pressure= document.getElementById("pressure");
let sunrise= document.getElementById("sunrise");
let sunset= document.getElementById("sunset");
let maincontent= document.getElementById("maincontent");


let input= document.createElement("input");
head.appendChild(input);

input.setAttribute("type","text");
let datenormal= new Date();
let date = `${datenormal}`;
let newdate = date.slice(0,15);
console.log(newdate);

searchbutton.addEventListener("click",()=>{
    var cityname= input.value;
    console.log(cityname);
    inputing(cityname);
})

const  firstApi = "ff7c23f7fcfac7c7e1ba0abd18ac421e";

function inputing(cityname){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${firstApi}`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data[0].lat);
        seconsapi(data[0].lat,data[0].lon)

    
    })
    .catch((err)=>{
        console.log(err);
        maincontent.innerHTML= "<h2>Please Enter Valid Name</h2><br><div id='searchagain'>Search Again</div>"
        let searchagain = document.getElementById("searchagain")

searchagain.addEventListener("click",()=>{
    location.reload();
})
    })

}

function seconsapi(lat , long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${firstApi}`)
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data);
        dataall(data);
    })
    .catch((err)=>{
        console.log(err);
   })

}

function dataall(ourdata){
    let nameour = ourdata.name
    name.innerHTML=nameour;
    let windspeed = ourdata.wind.speed 
    content.innerHTML=  `WindSpeed : ${windspeed}`
    let weatherTypedata= ourdata.weather[0]
    weatherType.innerHTML = `Weather Type : ${weatherTypedata.main}`
    tempdetails.innerHTML = `Temprature : ${(ourdata.main.temp - 273).toFixed(1)} ' C`
    humidity.innerHTML =`Humidity : ${ourdata.main.humidity}`
    pressure.innerHTML = `Pressure : ${ourdata.main.pressure}`

    
    const sunriseTimestamp = ourdata.sys.sunrise;
    const sunsetTimestamp = ourdata.sys.sunset;
// Using different methods to get sunset time in our understandable manner
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);

    const formattedSunrise = sunriseDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    const formattedSunset = sunsetDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });

    sunrise.innerHTML = `Sunrise : ${formattedSunrise}`
    sunset.innerHTML = `Sunset : ${formattedSunset}`
    
}
