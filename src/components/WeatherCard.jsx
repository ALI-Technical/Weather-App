import React, { useEffect, useState } from 'react'
import { FaBolt, FaCloud, FaCloudRain, FaCloudShowersHeavy, FaSmog, FaSnowflake } from 'react-icons/fa'
import './weather.css'

const WeatherCard = () => {
  const [search, setSearch] = useState('karachi');
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b2f89afe6a5b055be5ab05e61a8c7ebc`;
      const response = await fetch(url)
        .then((response) => response.json());
        // console.log(response);
        setCity(response.main);
        setWeather(response.weather[0]);
    }
    fetchApi();
  },[search]);
  
  // Dynamic Icons
  let icons = null;
  if(!city){
    if(weather.main == "Clouds"){
      icons = <FaCloud size={100} />;
    }
    else if(weather.main == "Thunderstorm"){
      icons = <FaBolt size={100} />;
    }
    else if(weather.main == "Drizzle"){
      icons = <FaCloudRain size={100} />;
    }
    else if(weather.main == "Rain"){
      icons = <FaCloudShowersHeavy size={100} />;
    }
    else if(weather.main == "Snow"){
      icons = <FaSnowflake size={100} />;
    }
    else{
      icons = <FaSmog size={100} />;
    }
  }

  // Getting Date

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default",{month:'long'});
  let day = d.toLocaleString("default",{weekday:'long'});
  
  // Getting Time

  let time = d.toLocaleString([],{
    hour : '2-digit',
    minute : '2-digit',
    second : '2-digit'
  })
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12">
            <div className="mainBox card text-center text-white">
              <img src={`https://source.unsplash.com/600x700/?${weather.main}`} className="card-img" alt="" />
              <div className="card-img-overlay mainDiv">
                <form>
                  <div>
                    <h1>Weather App</h1>
                  </div>
                  <div className="input-group searchBox mb-4 w-75 mx-auto">
                    <input 
                    onChange={(event) => { setSearch(event.target.value) }} 
                    type="search"
                    className="form-control" 
                    placeholder="Search City" 
                    aria-label="Search City" 
                    aria-describedby="basic-addon2" />
                    {/* <button type='submit' className="btn btn-info" id="basic-addon2">
                      <FaSearch size={20} color='white' />
                    </button> */}
                  </div>
                </form>
                {!city ? (
                  <h2>No Data Found</h2>
                ) : (
                  <div className="bg-dark info-Div bg-opacity-50">
                    <h2 className="card-title">{search}</h2>
                    <p className="card-text datePara lead">{day}, {month}, {date}, {year}</p>
                    <br />
                    <h3>{time}</h3>
                    <hr />
                    {icons}
                    <h1 className='fw-bolder'>{city.temp} &deg;C</h1>
                    <p className='lead fw-bolder mb-0'>{weather.main}</p>
                    <p className="lead">{city.temp_min} &deg;C | {city.temp_max} &deg;C</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
