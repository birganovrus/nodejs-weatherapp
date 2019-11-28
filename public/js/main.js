console.log('It works')

//Const for Forecast elements
const MessageField = document.querySelector('#message')
const ForecastField = document.querySelector('#forecast')
const ProbabilityField = document.querySelector('#probability')
const TemperatureField = document.querySelector('#temperaturetext')

//
const MainThumbnail =  document.querySelector('#MainThumbnail')

const currlocation = ''

const GetWeather = (location)=>{
fetch('/weather?address=' + location).then((response) =>{
    response.json().then((data) =>{
        if(data.error)
        MessageField.textContent = data.error
        else{
        ForecastField.textContent = data.forecast
        ProbabilityField.textContent = 'Probability of rain: ' + data.probability
        TemperatureField.textContent = data.temperature
        MessageField.textContent = 'Weather in: ' + data.address
        document.querySelector('#maintext').textContent = data.address
        }
    })
})
}

const GetTownImage = (location)=>{
    fetch('/usesearch?address=' + location).then((response) =>{
        response.json().then((data) =>{
            MainThumbnail.textContent = 'Url is ' + data.imurl
            ChangeImage(data.imurl);
        })
    })
}

const ChangeImage = (imurl)=>{

    document.getElementById("imgplaceholder").style.backgroundImage = "url("+imurl+")";
    document.getElementById("imgplaceholder").style.backgroundSize = 'cover';
    document.getElementById("imgplaceholder").style.backgroundColor= '#1f21228c';
    document.getElementById("imgplaceholder").style.backgroundBlendMode= 'overlay';

    document.getElementById("maintext").style.color = 'white';
    document.getElementById("maintext").style.fontWeight = '800';
    document.getElementById("maintext").style.fontSize = '40px';

    document.getElementById("temperaturetext").style.fontSize = '70px';
    document.getElementById("temperaturetext").style.color = 'white';
    document.getElementById("temperaturetext").style.fontWeight = '600';

    
}


    const Form = document.querySelector('form')
    const Search = document.querySelector('input')

    MessageField.textContent = 'Enter your location'

    Form.addEventListener('submit',(e) =>{
        e.preventDefault()
        if(Search.value){
        GetWeather(Search.value)
        GetTownImage(Search.value)
        ChangeImage()
        MessageField.textContent = 'Loading'
        }
        else
        MessageField.textContent = 'You have not entered your location'
    })