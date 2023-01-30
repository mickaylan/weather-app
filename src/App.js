import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9153081f880e2b88e584057237f0eefc`;

  const search = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const doMath = (num) => {
    return Math.round(num - 273.15);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          placeholder="Enter location"
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={search}
          type="text"
        />
      </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{doMath(data.main.temp)}℃</h1> : null}
          </div>
          <div className="discription">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            <ul>
              <li>Feels like</li>
              {data.main ? <li>{doMath(data.main.feels_like)}℃</li> : null}
            </ul>
          </div>
          <div className="humidity">
            <ul>
              <li>Humidity</li>
              {data.main ? <li>{data.main.humidity}%</li> : null}
            </ul>
          </div>
          <div className="wind">
            <ul>
              <li>Wind speed</li>
              {data.wind ? <li>{data.wind.speed} km/h</li> : null}
            </ul>
          </div>
      </div>
    </div>
  );
}

export default App;
