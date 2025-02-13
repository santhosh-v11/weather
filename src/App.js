import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useState } from 'react';

import './App.css';
import search1 from "./icons/ic/search.png"
import rain from "./icons/ic/rain.png"
import win from "./icons/win.png"
import humidit from "./icons/hum1.png"
import clear from "./icons/ic/clear.png"
import cloud from "./icons/ic/cloud.png"
import drizzle from "./icons/ic/drizzle.png"
import snow from "./icons/ic/snow.png"


const WeatherDetails = ({icon,temp,city,country,lat,log,wind,humidity}) =>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt="smile" />
    </div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="Country">{country}</div>
    <div className="cord">
      <div>
        <span className='lat'>Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className='log'>Longitude</span>
        <span>{log}</span>
      </div>
    </div> 
    <div className="data-container">
      <div className="element">
        <img src={humidit} alt="humidity" className='icon'/>
        <div className="data">
          <div className="humidity_percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={win} alt="wind" className='icon'/>
        <div className="data">
          <div className="wind_percent">{wind}km/hr</div>
          <div className="text">WindSpeed</div>
        </div>
      </div>
    </div>
  </>
  );
};
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired  
};
function App() {
  let api_key = "42abcc382f145cf66c804f7bf02f1e07";
  const [text,setText] = useState("Chennai");
  const [icon, setIcon] = useState(rain);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("India");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound,setCityNotFound] = useState(false);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  const weatherIconMap = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "10n": rain,
    "10d": rain,
    "13d": snow,
    "13n": snow
  };

  const search=async ()=>{
    setLoading(true);
    // let api_key = "42abcc382f145cf66c804f7bf02f1e07";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  
    try{
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if(data.cod==='404'){
        console.error("City Not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat)
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clear);
      setCityNotFound(false);
    }
    catch(error){  
      console.error("An error occurred",error.message);
      setError("An Error Occured While Fetching Weather Data.");
    }
    finally{
      setLoading(false);
    }
 };

  const handlecity = (e) =>{
    setText(e.target.value);
  };
  const handleKeydown = (e) =>{
    if(e.key === 'Enter'){
      search();
    }
  };
  
  useEffect(function (){
    search();
  }, []);
  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text' className='cityinput' placeholder='Search City' onChange={handlecity} value={text} onKeyDown={handleKeydown}/>
          <div className='search-icon' onClick={()=>search()}>
            <img src={search1} alt='Search'></img>
          </div>  
        </div>
  
      {/* <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} /> */}
    
    {loading && <div className="loading-message">Loading...</div>}
    {error && <div className="errorr-message">{Error}</div>}
    {cityNotFound && <div className="city-not-found">City Not Found</div>}
    {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}
    </div>
    </>
  );
}

export default App;
