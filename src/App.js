import "./App.css";
import React, { useState } from "react";
import tachyons from 'tachyons'
import { Tilt } from "react-tilt";

function App() {
  const ApiKey = "b44f893c636261152d5b333c6838be6c";
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
 
 
  };

  return (<><div className="Background">
    <p  className="f2 tc blue font center headline">Welcome to the Weather App</p>
    <br />
    <br />
    <Tilt  style={{ height: 400}}>
    <div style={{height:'400px',fontFamily:'sans-serif'}} className="Tilt ba br4  shadow-3 yellow justify-center center items-center align-center tc w-50">
      <div className="pa4  upper-radius yellow">
        <input
        align-center
          type="text"
          placeholder="Enter your City....."
          className="w-50 pa3 center tc input blue"
          onChange={(event) => setCity(event.target.value)}
          value={city}
          onKeyPress={getWeather}
        />
        

        
      </div>
      <div>{typeof weatherData.city === "undefined" ? (
        <></>
        ) : (
          <div className="weather-data pa3  tc">
            <p className="city f2  mt2 tc">{weatherData.city.name}</p>
            <p className="temp center mt4  f1 lh-title br4 w5 ba tc">
              {Math.round(weatherData.list[0].main.temp)}°F
            </p>
            
            <p className="weather f3 mt4  tc">{weatherData.list[0].weather[0].main}</p>
          </div>
        )}</div>
        {weatherData.cod === "404" ? <p className="f2 mt5">City not found :(</p> : <></>}
    </div>
    </Tilt>
    </div>
    </>
  );
}

export default App;
