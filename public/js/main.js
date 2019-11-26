console.log('It works')

const MessageField = document.querySelector('#message')
const ForecastField = document.querySelector('#forecast')
const ProbabilityField = document.querySelector('#probability')

const GetWeather = (location)=>{
fetch('/weather?address=' + location).then((response) =>{
    response.json().then((data) =>{
        if(data.error)
        MessageField.textContent = data.error
        else{
        ForecastField.textContent = data.forecast
        ProbabilityField.textContent = 'Probability of rain: ' + data.probability
        MessageField.textContent = 'Weather in: ' + data.address
        }
    })
})
}

    const Form = document.querySelector('form')
    const Search = document.querySelector('input')

    MessageField.textContent = 'Enter your location'

    Form.addEventListener('submit',(e) =>{
        e.preventDefault()
        if(Search.value){
        GetWeather(Search.value)
        MessageField.textContent = 'Loading'
        }
        else
        MessageField.textContent = 'You have not entered your location'
    })