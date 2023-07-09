import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { format } from "date-fns";

const WeatherIcons = {
  "01d": "Icons/01d.png",
  "01n": "Icons/01n.png",
  "02d": "Icons/02d.png",
  "02n": "Icons/02n.png",
  "03d": "Icons/03d.png",
  "03n": "Icons/03n.png",
  "04d": "Icons/04d.png",
  "04n": "Icons/04n.png",
  "09d": "Icons/09d.png",
  "09n": "Icons/09n.png",
  "10d": "Icons/10d.png",
  "10n": "Icons/10n.png",
  "11d": "Icons/11d.png",
  "11n": "Icons/11n.png",
  "13d": "Icons/13d.png",
  "13n": "Icons/13n.png",
  "50d": "Icons/50d.png",
  "50n": "Icons/50n.png",
};

const Day = ({ time, icon, temperature }) => (
  <div className="day">
    <p>{time}</p>
    <img src={WeatherIcons[icon]} className="SmallIcon"></img>
    <p>{temperature}°C</p>
  </div>
);

const Week = ({ day, icon, temperature }) => (
  <React.Fragment>
    <p>{day}</p>
    <img src={WeatherIcons[icon]} className="SmallIcon"></img>
    <p>{temperature}°C</p>
  </React.Fragment>
);

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");
  const [forecastdata, setForecast] = useState("");

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }
  }, []);

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const today = new Date().getDay();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=d5361793894cf8d28796278e1badfd15`;
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=d5361793894cf8d28796278e1badfd15`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      Promise.all([axios.get(url), axios.get(url2)]).then(
        ([response, response2]) => {
          setData(response.data);
          setForecast(response2.data);
          console.log(response.data);
          console.log(response2.data);
        }
      );
    }
  };

  function successCallback(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=d5361793894cf8d28796278e1badfd15`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=d5361793894cf8d28796278e1badfd15`;

    Promise.all([axios.get(weatherUrl), axios.get(forecastUrl)]).then(
      ([response, response2]) => {
        setData(response.data);
        setForecast(response2.data);
        console.log(response.data);
        console.log(response2.data);
      }
    );
  }

  function errorCallback(error) {}

  return (
    <div class="App">
      <div class="SearchBar">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div class="MainInfo">
        <div className="Info">
          <h1>{data.name}</h1>
          {data && <h1>{Math.round(data.main.temp - 273.15)}°C</h1>}
        </div>
        <div className="Icon">
          {data && (
            <img src={WeatherIcons[data.weather[0].icon]} className="BigIcon" />
          )}
        </div>
      </div>
      <div class="SecondaryInfo">
        <div className="AirConditions">
          <p>Air Conditions</p>
        </div>
        <div className="RealFeel">
          <p>Feel's like</p>
          {data && <p>{Math.round(data.main.feels_like - 273.15)}°C</p>}
        </div>
        <div className="Pressure">
          <p>Pressure</p>
          {data && <p>{data.main.pressure} hPa</p>}
        </div>
        <div className="Humidity">
          <p>Humidity</p>
          {data && <p>{data.main.humidity} %</p>}
        </div>
        <div className="WindSpeed">
          <p>Wind Speed</p>
          {data && <p>{data.wind.speed} km/h</p>}
        </div>
      </div>
      <div class="DayForecast">
        <div className="TodayForecast">
          <p>Today's Forecast</p>
        </div>
        {[
          {
            time:
              forecastdata &&
              format(new Date(forecastdata.list[0].dt_txt), "p"),
            icon: forecastdata && forecastdata.list[0].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(forecastdata.list[0].main.temp - 273.15),
          },
          {
            time:
              forecastdata &&
              format(new Date(forecastdata.list[1].dt_txt), "p"),
            icon: forecastdata && forecastdata.list[1].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(forecastdata.list[1].main.temp - 273.15),
          },
          {
            time:
              forecastdata &&
              format(new Date(forecastdata.list[2].dt_txt), "p"),
            icon: forecastdata && forecastdata.list[2].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(forecastdata.list[2].main.temp - 273.15),
          },
          {
            time:
              forecastdata &&
              format(new Date(forecastdata.list[3].dt_txt), "p"),
            icon: forecastdata && forecastdata.list[3].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(forecastdata.list[3].main.temp - 273.15),
          },
          {
            time:
              forecastdata &&
              format(new Date(forecastdata.list[4].dt_txt), "p"),
            icon: forecastdata && forecastdata.list[4].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(forecastdata.list[4].main.temp - 273.15),
          },
        ].map(({ time, icon, temperature }) => (
          <Day time={time} icon={icon} temperature={temperature} />
        ))}
      </div>
      <div class="WeekForecast">
        <div className="NextDaysForecast">
          <p>Week Forecast</p>
        </div>
        {[
          {
            day: weekdays[(today + 6) % 7],
            icon: forecastdata && forecastdata.list[0].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(
                (forecastdata.list[0].main.temp +
                  forecastdata.list[1].main.temp +
                  forecastdata.list[2].main.temp +
                  forecastdata.list[3].main.temp +
                  forecastdata.list[4].main.temp +
                  forecastdata.list[5].main.temp +
                  forecastdata.list[6].main.temp +
                  forecastdata.list[7].main.temp) /
                  8 -
                  273.15
              ),
          },
          {
            day: weekdays[(today + 7) % 7],
            icon: forecastdata && forecastdata.list[8].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(
                (forecastdata.list[8].main.temp +
                  forecastdata.list[9].main.temp +
                  forecastdata.list[10].main.temp +
                  forecastdata.list[11].main.temp +
                  forecastdata.list[12].main.temp +
                  forecastdata.list[13].main.temp +
                  forecastdata.list[14].main.temp +
                  forecastdata.list[15].main.temp) /
                  8 -
                  273.15
              ),
          },
          {
            day: weekdays[(today + 8) % 7],
            icon: forecastdata && forecastdata.list[16].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(
                (forecastdata.list[16].main.temp +
                  forecastdata.list[17].main.temp +
                  forecastdata.list[18].main.temp +
                  forecastdata.list[19].main.temp +
                  forecastdata.list[20].main.temp +
                  forecastdata.list[21].main.temp +
                  forecastdata.list[22].main.temp +
                  forecastdata.list[23].main.temp) /
                  8 -
                  273.15
              ),
          },
          {
            day: weekdays[(today + 9) % 7],
            icon: forecastdata && forecastdata.list[24].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(
                (forecastdata.list[24].main.temp +
                  forecastdata.list[25].main.temp +
                  forecastdata.list[26].main.temp +
                  forecastdata.list[27].main.temp +
                  forecastdata.list[28].main.temp +
                  forecastdata.list[29].main.temp +
                  forecastdata.list[30].main.temp +
                  forecastdata.list[31].main.temp) /
                  8 -
                  273.15
              ),
          },
          {
            day: weekdays[(today + 10) % 7],
            icon: forecastdata && forecastdata.list[32].weather[0].icon,
            temperature:
              forecastdata &&
              Math.round(
                (forecastdata.list[32].main.temp +
                  forecastdata.list[33].main.temp +
                  forecastdata.list[34].main.temp +
                  forecastdata.list[35].main.temp +
                  forecastdata.list[36].main.temp +
                  forecastdata.list[37].main.temp +
                  forecastdata.list[38].main.temp +
                  forecastdata.list[39].main.temp) /
                  8 -
                  273.15
              ),
          },
        ].map(({ day, icon, temperature }) => (
          <Week day={day} icon={icon} temperature={temperature} />
        ))}
      </div>
    </div>
  );
}

export default App;
