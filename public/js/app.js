const key = '379ff52848c1769b922c6f349a2d63b0';

document.querySelector('input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleClick();
    }
});

handleClick = () => {
    const city = document.querySelector('input').value;
    setData(city);
};

async function setData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`);
    const data = await response.json();
    console.log(data);
    renderData(data);
};

renderData = (data) => {
    const mainContent = document.querySelectorAll('p');
    const header = document.querySelector('h1');
    const description = document.querySelector('.description');
    const image = document.querySelector('img');

    if (data.cod === "404") {
        header.innerHTML = 'Cidade Inexistente!';
        description.innerHTML = 'Cidade Inexistente!';
    } else if (data.cod === 200) {
        header.innerHTML = `Tempo em ${data.name}`;
        mainContent[0].innerHTML = `${data.main.temp}ºC`;
        image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        description.innerHTML = data.weather[0].description;
        mainContent[2].innerHTML = `Umidade: ${data.main.humidity}%`;
    }
};

