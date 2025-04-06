const weatherForm = document.querySelector('#weatherForm')
const cityInput = document.querySelector('#cityInput')
const city = document.querySelector('#city')
const celsius = document.querySelector('#celsius')
const wind = document.querySelector('#wind')

const apiKey = '5c5596b38fb6b214d759d91f02a6d7cf'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const cityName = cityInput.value.trim()

    if (cityName) {
        checkWeather(cityName)
    } else {
        alert('Введите название города!')
        city.textContent = ''
        celsius.textContent = ''
        wind.textContent = ''
    }
})

async function checkWeather(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Город не найден!')
        }
        const data = await response.json()
        city.textContent = data.name
        celsius.textContent = `${Math.floor(data.main.temp)}°C`
        wind.textContent = `Wind: ${Math.floor(data.wind.speed)}km/h`
    } catch (error) {
        error.message === 'Город не найден!' ? alert(`Простите, но мы не смогли найти место под название "${cityName}".`) : alert('Что-то пошло не так! Пожалуйста, проверьте ваше соединение с интернетом и попробуйте снова.');
        city.textContent = ''
        celsius.textContent = ''
        wind.textContent = ''
    }
}