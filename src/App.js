import './App.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function App() {
  const [search, setSearch] = useState('Hyderabad');
  var yDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    month = '' + (yDate.getMonth() + 1),
    day = '' + yDate.getDate(),
    year = yDate.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  yDate = [year, month, day].join('-');
  const [yesterdayDate, setYesterdayDate] = useState(yDate);
  const [TodData, setTodData] = useState({
    weatherCondition: '',
    weatherIcon: '',
    tempC: '',
    maxTemp: '',
    minTemp: '',
    feelsLike: '',
    hourWiseForecast: [],
    sunrise: '',
    sunset: '',
    moonrise: '',
    moonset: '',
    uvindex: '',
    humidity: '',
    rainchance: '',
    snowchance: '',
    airquality: ''
  });
  const [TomData, setTomData] = useState({
    weatherCondition: '',
    weatherIcon: '',
    maxTemp: '',
    minTemp: '',
    hourWiseForecast: [],
    sunrise: '',
    sunset: '',
    moonrise: '',
    moonset: '',
    uvindex: '',
    humidity: '',
    rainchance: '',
    snowchance: '',
    airquality: ''
  });
  const [YData, setYData] = useState({
    weatherCondition: '',
    weatherIcon: '',
    maxTemp: '',
    minTemp: '',
    hourWiseForecast: [],
    astro: '',
    uvindex: '',
    humidity: '',
    precipitationMM: '',
    day: ''
  });
  const searchText = useRef(null);

  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=9cdd53a0947443c081c100021230102&q=${search}&days=2&aqi=yes&alerts=yes`).then((response) => {
      console.log(response);
      setTodData({
        weatherCondition: response.data.current.condition.text,
        weatherIcon: response.data.current.condition.icon,
        tempC: response.data.current.temp_c,
        maxTemp: response.data.forecast.forecastday[0].day.maxtemp_c,
        minTemp: response.data.forecast.forecastday[0].day.mintemp_c,
        feelsLike: response.data.current.feelslike_c,
        hourWiseForecast: response.data.forecast.forecastday[0].hour,
        sunrise: response.data.forecast.forecastday[0].astro.sunrise,
        sunset: response.data.forecast.forecastday[0].astro.sunset,
        moonrise: response.data.forecast.forecastday[0].astro.moonrise,
        moonset: response.data.forecast.forecastday[0].astro.moonset,
        uvindex: response.data.forecast.forecastday[0].day.uv,
        humidity: response.data.forecast.forecastday[0].day.avghumidity,
        rainchance: response.data.forecast.forecastday[0].day.daily_will_it_rain,
        snowchance: response.data.forecast.forecastday[0].day.daily_will_it_snow,
        airquality: response.data.forecast.forecastday[0].day.air_quality
      });
      setTomData({
        weatherCondition: response.data.forecast.forecastday[1].day.condition.text,
        weatherIcon: response.data.forecast.forecastday[1].day.condition.icon,
        maxTemp: response.data.forecast.forecastday[1].day.maxtemp_c,
        minTemp: response.data.forecast.forecastday[1].day.mintemp_c,
        hourWiseForecast: response.data.forecast.forecastday[1].hour,
        sunrise: response.data.forecast.forecastday[1].astro.sunrise,
        sunset: response.data.forecast.forecastday[1].astro.sunset,
        moonrise: response.data.forecast.forecastday[1].astro.moonrise,
        moonset: response.data.forecast.forecastday[1].astro.moonset,
        uvindex: response.data.forecast.forecastday[1].day.uv,
        humidity: response.data.forecast.forecastday[1].day.avghumidity,
        rainchance: response.data.forecast.forecastday[1].day.daily_will_it_rain,
        snowchance: response.data.forecast.forecastday[1].day.daily_will_it_snow,
        airquality: response.data.forecast.forecastday[1].day.air_quality
      })
      console.log(TodData);
    }).catch((error) => { console.log(error); });
    axios.get(`https://api.weatherapi.com/v1/history.json?key=9cdd53a0947443c081c100021230102&q=${search}&dt=${yesterdayDate}`).then((response) => {
      console.log(response);
      setYData({
        weatherCondition: response.data.forecast.forecastday[0].day.condition.text,
        weatherIcon: response.data.forecast.forecastday[0].day.condition.icon,
        maxTemp: response.data.forecast.forecastday[0].day.maxtemp_c,
        minTemp: response.data.forecast.forecastday[0].day.mintemp_c,
        hourWiseForecast: response.data.forecast.forecastday[0].hour,
        astro: response.data.forecast.forecastday[0].astro,
        uvindex: response.data.forecast.forecastday[0].day.uv,
        humidity: response.data.forecast.forecastday[0].day.avghumidity,
        day: response.data.forecast.forecastday[0].day,
        precipitationMM: response.data.forecast.forecastday[0].day.totalprecip_mm,
      });
      console.log(YData);
    }).catch((error) => { console.log(error); });
  }, [search]);

  function makeApiCall() {
    if (searchText.current.value) {
      if (searchText.current.value !== search) {
        setSearch(searchText.current.value);
        searchText.current.value = ''
      }
    }
  }

  function leftScroll(e) {
    e.target.className === 'fa-solid fa-arrow-left' ? e.target.parentElement.parentElement.nextElementSibling.scrollBy(-410, 0) : e.target.className === 'left' ? e.target.parentElement.nextElementSibling.scrollBy(-410, 0) : e.target.nextElementSibling.scrollBy(-410, 0);
  }

  function rightScroll(e) {
    e.target.className === 'fa-solid fa-arrow-right' ? e.target.parentElement.parentElement.previousElementSibling.scrollBy(410, 0) : e.target.className === 'right' ? e.target.parentElement.previousElementSibling.scrollBy(410, 0) : e.target.previousElementSibling.scrollBy(410, 0);
  }

  return (
    <motion.div layout className="App">
      <div className="Yesterday">
        <h2>Yesterday in {search}</h2>
        <div>
          <img className="weatherIcon" src={YData.weatherIcon !== '' ? YData.weatherIcon : '//cdn.weatherapi.com/weather/64x64/day/113.png'} alt="Weather icon" />
          {YData.weatherCondition !== '' ?
            <table>
              <tbody>
                <tr>
                  <td><strong>Max&nbsp;Temp:</strong></td>
                  <td><strong>{YData.maxTemp}&nbsp;°C</strong></td>
                </tr>
                <tr>
                  <td><strong>Min&nbsp;Temp:</strong></td>
                  <td><strong>{YData.minTemp}&nbsp;°C</strong></td>
                </tr>
              </tbody>
            </table> : ''}
        </div>
        <div>
          <h3>{YData.weatherCondition !== '' ? YData.weatherCondition : ''}</h3>
        </div>
        <div>{YData.hourWiseForecast.length > 0 ?
          <><h2 className='hourHeading'>Hourly forecast</h2>
            <div className="cover">
              <div onClick={(e) => leftScroll(e)} className='arrows'>
                <button className="left"><i className="fa-solid fa-arrow-left"></i></button>
              </div>
              <div className="scroll-images">
                <div className="child">
                  <strong>12:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[0].condition.icon} />
                  <strong>{YData.hourWiseForecast[0].temp_c}&nbsp;°C, {YData.hourWiseForecast[0].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>01:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[1].condition.icon} />
                  <strong>{YData.hourWiseForecast[1].temp_c}&nbsp;°C, {YData.hourWiseForecast[1].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>02:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[2].condition.icon} />
                  <strong>{YData.hourWiseForecast[2].temp_c}&nbsp;°C, {YData.hourWiseForecast[2].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>03:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[3].condition.icon} />
                  <strong>{YData.hourWiseForecast[3].temp_c}&nbsp;°C, {YData.hourWiseForecast[3].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>04:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[4].condition.icon} />
                  <strong>{YData.hourWiseForecast[4].temp_c}&nbsp;°C, {YData.hourWiseForecast[4].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>05:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[5].condition.icon} />
                  <strong>{YData.hourWiseForecast[5].temp_c}&nbsp;°C, {YData.hourWiseForecast[5].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>06:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[6].condition.icon} />
                  <strong>{YData.hourWiseForecast[6].temp_c}&nbsp;°C, {YData.hourWiseForecast[6].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>07:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[7].condition.icon} />
                  <strong>{YData.hourWiseForecast[7].temp_c}&nbsp;°C, {YData.hourWiseForecast[7].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>08:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[8].condition.icon} />
                  <strong>{YData.hourWiseForecast[8].temp_c}&nbsp;°C, {YData.hourWiseForecast[8].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>09:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[9].condition.icon} />
                  <strong>{YData.hourWiseForecast[9].temp_c}&nbsp;°C, {YData.hourWiseForecast[9].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>10:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[10].condition.icon} />
                  <strong>{YData.hourWiseForecast[10].temp_c}&nbsp;°C, {YData.hourWiseForecast[10].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>11:00 AM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[11].condition.icon} />
                  <strong>{YData.hourWiseForecast[11].temp_c}&nbsp;°C, {YData.hourWiseForecast[11].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>12:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[12].condition.icon} />
                  <strong>{YData.hourWiseForecast[12].temp_c}&nbsp;°C, {YData.hourWiseForecast[12].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>1:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[13].condition.icon} />
                  <strong>{YData.hourWiseForecast[13].temp_c}&nbsp;°C, {YData.hourWiseForecast[13].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>2:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[14].condition.icon} />
                  <strong>{YData.hourWiseForecast[14].temp_c}&nbsp;°C, {YData.hourWiseForecast[14].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>03:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[15].condition.icon} />
                  <strong>{YData.hourWiseForecast[15].temp_c}&nbsp;°C, {YData.hourWiseForecast[15].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>04:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[16].condition.icon} />
                  <strong>{YData.hourWiseForecast[16].temp_c}&nbsp;°C, {YData.hourWiseForecast[16].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>05:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[17].condition.icon} />
                  <strong>{YData.hourWiseForecast[17].temp_c}&nbsp;°C, {YData.hourWiseForecast[17].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>06:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[18].condition.icon} />
                  <strong>{YData.hourWiseForecast[18].temp_c}&nbsp;°C, {YData.hourWiseForecast[18].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>07:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[19].condition.icon} />
                  <strong>{YData.hourWiseForecast[19].temp_c}&nbsp;°C, {YData.hourWiseForecast[19].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>08:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[20].condition.icon} />
                  <strong>{YData.hourWiseForecast[20].temp_c}&nbsp;°C, {YData.hourWiseForecast[20].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>09:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[21].condition.icon} />
                  <strong>{YData.hourWiseForecast[21].temp_c}&nbsp;°C, {YData.hourWiseForecast[21].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>10:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[22].condition.icon} />
                  <strong>{YData.hourWiseForecast[22].temp_c}&nbsp;°C, {YData.hourWiseForecast[22].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>11:00 PM</strong>
                  <img alt='wicon' src={YData.hourWiseForecast[23].condition.icon} />
                  <strong>{YData.hourWiseForecast[23].temp_c}&nbsp;°C, {YData.hourWiseForecast[23].condition.text}</strong>
                </div>
              </div>
              <div onClick={(e) => rightScroll(e)} className='arrows'>
                <button className="right" ><i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
            <h3>Weather condition</h3>
            <div>
              <div>
                <table className='flexTable'>
                  <tbody>
                    <tr>
                      <td><strong>Humidity: </strong></td>
                      <td><strong>{YData.humidity}&nbsp;g.m-<sup>3</sup></strong></td>
                    </tr>
                    <tr>
                      <td><strong>UV Index: </strong></td>
                      <td><strong>{YData.uvindex}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Total precipitation(mm):</strong></td>
                      <td><strong>{YData.precipitationMM}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Wind speed max(kph):</strong></td>
                      <td><strong>{YData.day.maxwind_kph}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Average visibility(km):</strong></td>
                      <td><strong>{YData.day.avgvis_km}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
              <h3>Astrology</h3>
              <div>
                <table className='flexTable'>
                  <tbody>
                    <tr>
                      <td><strong>Sunrise: </strong></td>
                      <td><strong>{YData.astro.sunrise}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Sunset: </strong></td>
                      <td><strong>{YData.astro.sunset}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moonrise: </strong></td>
                      <td><strong>{YData.astro.moonrise}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moonset: </strong></td>
                      <td><strong>{YData.astro.moonset}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moon phase:</strong></td>
                      <td><strong>{YData.astro.moon_phase}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moon illumination:</strong></td>
                      <td><strong>{YData.astro.moon_illumination}&#37;</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </>
          : ''}</div>
      </div>

      <div className="Today">
        <div className="searchElements">
          <input className='searchInput' type="text" name="w-search" placeholder="Enter desired location" ref={searchText} onKeyDown={(key) => key.code === 'Enter' ? makeApiCall() : ''} /><button className='searchButton' onClick={() => { makeApiCall() }}>Search</button>
        </div>
        <h1>Today in {search}</h1>
        <div className='tempDetails'>
          <div>
            <div className='tempDetails-c1'><img className="weatherIcon" src={TodData.weatherIcon !== '' ? TodData.weatherIcon : '//cdn.weatherapi.com/weather/64x64/day/113.png'} alt="Weather icon" />
              <div><h1>{TodData.tempC !== '' ? TodData.tempC : ''}&nbsp;°C</h1></div>
            </div>
            <strong className='tempDetails-c2'>{TodData.weatherCondition !== '' ? TodData.weatherCondition : ''}, feels like {TodData.feelsLike !== '' ? TodData.feelsLike : ''}&nbsp;°C</strong>
          </div>
          <div className='maxMinDetails'>
            {TodData.weatherCondition !== '' ?
              <table>
                <tbody>
                  <tr>
                    <td><strong>Max&nbsp;Temp:</strong></td>
                    <td><strong>{TodData.maxTemp}&nbsp;°C</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Min&nbsp;Temp:</strong></td>
                    <td><strong>{TodData.minTemp}&nbsp;°C</strong></td>
                  </tr>
                </tbody>
              </table> : ''}
          </div>
        </div>

        {TodData.hourWiseForecast.length > 0 ?
          <><h2 className='hourHeading'>Hourly forecast</h2>
            <div className="cover">
              <div onClick={(e) => leftScroll(e)} className='arrows'>
                <button className="left"><i className="fa-solid fa-arrow-left"></i></button>
              </div>
              <div className="scroll-images">
                <div className="child">
                  <strong>12:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[0].condition.icon} />
                  <strong>{TodData.hourWiseForecast[0].temp_c}&nbsp;°C, {TodData.hourWiseForecast[0].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>01:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[1].condition.icon} />
                  <strong>{TodData.hourWiseForecast[1].temp_c}&nbsp;°C, {TodData.hourWiseForecast[1].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>02:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[2].condition.icon} />
                  <strong>{TodData.hourWiseForecast[2].temp_c}&nbsp;°C, {TodData.hourWiseForecast[2].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>03:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[3].condition.icon} />
                  <strong>{TodData.hourWiseForecast[3].temp_c}&nbsp;°C, {TodData.hourWiseForecast[3].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>04:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[4].condition.icon} />
                  <strong>{TodData.hourWiseForecast[4].temp_c}&nbsp;°C, {TodData.hourWiseForecast[4].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>05:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[5].condition.icon} />
                  <strong>{TodData.hourWiseForecast[5].temp_c}&nbsp;°C, {TodData.hourWiseForecast[5].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>06:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[6].condition.icon} />
                  <strong>{TodData.hourWiseForecast[6].temp_c}&nbsp;°C, {TodData.hourWiseForecast[6].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>07:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[7].condition.icon} />
                  <strong>{TodData.hourWiseForecast[7].temp_c}&nbsp;°C, {TodData.hourWiseForecast[7].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>08:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[8].condition.icon} />
                  <strong>{TodData.hourWiseForecast[8].temp_c}&nbsp;°C, {TodData.hourWiseForecast[8].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>09:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[9].condition.icon} />
                  <strong>{TodData.hourWiseForecast[9].temp_c}&nbsp;°C, {TodData.hourWiseForecast[9].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>10:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[10].condition.icon} />
                  <strong>{TodData.hourWiseForecast[10].temp_c}&nbsp;°C, {TodData.hourWiseForecast[10].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>11:00 AM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[11].condition.icon} />
                  <strong>{TodData.hourWiseForecast[11].temp_c}&nbsp;°C, {TodData.hourWiseForecast[11].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>12:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[12].condition.icon} />
                  <strong>{TodData.hourWiseForecast[12].temp_c}&nbsp;°C, {TodData.hourWiseForecast[12].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>01:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[13].condition.icon} />
                  <strong>{TodData.hourWiseForecast[13].temp_c}&nbsp;°C, {TodData.hourWiseForecast[13].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>02:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[14].condition.icon} />
                  <strong>{TodData.hourWiseForecast[14].temp_c}&nbsp;°C, {TodData.hourWiseForecast[14].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>03:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[15].condition.icon} />
                  <strong>{TodData.hourWiseForecast[15].temp_c}&nbsp;°C, {TodData.hourWiseForecast[15].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>04:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[16].condition.icon} />
                  <strong>{TodData.hourWiseForecast[16].temp_c}&nbsp;°C, {TodData.hourWiseForecast[16].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>05:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[17].condition.icon} />
                  <strong>{TodData.hourWiseForecast[17].temp_c}&nbsp;°C, {TodData.hourWiseForecast[17].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>06:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[18].condition.icon} />
                  <strong>{TodData.hourWiseForecast[18].temp_c}&nbsp;°C, {TodData.hourWiseForecast[18].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>07:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[19].condition.icon} />
                  <strong>{TodData.hourWiseForecast[19].temp_c}&nbsp;°C, {TodData.hourWiseForecast[19].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>08:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[20].condition.icon} />
                  <strong>{TodData.hourWiseForecast[20].temp_c}&nbsp;°C, {TodData.hourWiseForecast[20].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>09:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[21].condition.icon} />
                  <strong>{TodData.hourWiseForecast[21].temp_c}&nbsp;°C, {TodData.hourWiseForecast[21].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>10:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[22].condition.icon} />
                  <strong>{TodData.hourWiseForecast[22].temp_c}&nbsp;°C, {TodData.hourWiseForecast[22].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>11:00 PM</strong>
                  <img alt='wicon' src={TodData.hourWiseForecast[23].condition.icon} />
                  <strong>{TodData.hourWiseForecast[23].temp_c}&nbsp;°C, {TodData.hourWiseForecast[23].condition.text}</strong>
                </div>
              </div>
              <div onClick={(e) => rightScroll(e)} className='arrows'>
                <button className="right" ><i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
            <h3>Weather condition and Astrology</h3>
            <div className="flexcontainer">
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Humidity: </strong></td>
                      <td><strong>{TodData.humidity}&nbsp;g.m-<sup>3</sup></strong></td>
                    </tr>
                    <tr>
                      <td><strong>UV Index: </strong></td>
                      <td><strong>{TodData.uvindex}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Will it rain?</strong></td>
                      <td><strong>{TodData.rainchance !== 0 ? <>Yes</> : <>No</>}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Will it snow?</strong></td>
                      <td><strong>{TodData.snowchance !== 0 ? <>Yes</> : <>No</>}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Sunrise: </strong></td>
                      <td><strong>{TodData.sunrise}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Sunset: </strong></td>
                      <td><strong>{TodData.sunset}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moonrise: </strong></td>
                      <td><strong>{TodData.moonrise}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moonset: </strong></td>
                      <td><strong>{TodData.moonset}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3>Air quality details</h3>
              <table className='flexTable'>
                <tbody>
                  <tr>
                    <td><strong>Carbon Monoxide</strong></td>
                    <td><strong>{TodData.airquality.co.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>Ozone</strong></td>
                    <td><strong>{TodData.airquality.no2.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>Nitrogen dioxide</strong></td>
                    <td><strong>{TodData.airquality.o3.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>Sulphur dioxide</strong></td>
                    <td><strong>{TodData.airquality.so2.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>PM2.5</strong></td>
                    <td><strong>{TodData.airquality.pm2_5.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>PM10 </strong></td>
                    <td><strong>{TodData.airquality.pm10.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
          : ''}
      </div>

      <div className="Tomorrow">
        <h2>Tomorrow in {search}</h2>
        <div>
          <img className="weatherIcon" src={TomData.weatherIcon !== '' ? TomData.weatherIcon : '//cdn.weatherapi.com/weather/64x64/day/113.png'} alt="Weather icon" />
          {TomData.weatherCondition !== '' ?
            <table>
              <tbody>
                <tr>
                  <td><strong>Max&nbsp;Temp:</strong></td>
                  <td><strong>{TomData.maxTemp}&nbsp;°C</strong></td>
                </tr>
                <tr>
                  <td><strong>Min&nbsp;Temp:</strong></td>
                  <td><strong>{TomData.minTemp}&nbsp;°C</strong></td>
                </tr>
              </tbody>
            </table> : ''}
        </div>
        <div>
          <h3>{TomData.weatherCondition !== '' ? TomData.weatherCondition : ''}</h3>
        </div>
        {TomData.hourWiseForecast.length > 0 ?
          <><h2 className='hourHeading'>Hourly forecast</h2>
            <div className="cover">
              <div onClick={(e) => leftScroll(e)} className='arrows'>
                <button className="left"><i className="fa-solid fa-arrow-left"></i></button>
              </div>
              <div className="scroll-images">
                <div className="child">
                  <strong>12:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[0].condition.icon} />
                  <strong>{TomData.hourWiseForecast[0].temp_c}&nbsp;°C, {TomData.hourWiseForecast[0].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>01:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[1].condition.icon} />
                  <strong>{TomData.hourWiseForecast[1].temp_c}&nbsp;°C, {TomData.hourWiseForecast[1].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>02:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[2].condition.icon} />
                  <strong>{TomData.hourWiseForecast[2].temp_c}&nbsp;°C, {TomData.hourWiseForecast[2].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>03:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[3].condition.icon} />
                  <strong>{TomData.hourWiseForecast[3].temp_c}&nbsp;°C, {TomData.hourWiseForecast[3].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>04:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[4].condition.icon} />
                  <strong>{TomData.hourWiseForecast[4].temp_c}&nbsp;°C, {TomData.hourWiseForecast[4].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>05:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[5].condition.icon} />
                  <strong>{TomData.hourWiseForecast[5].temp_c}&nbsp;°C, {TomData.hourWiseForecast[5].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>06:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[6].condition.icon} />
                  <strong>{TomData.hourWiseForecast[6].temp_c}&nbsp;°C, {TomData.hourWiseForecast[6].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>07:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[7].condition.icon} />
                  <strong>{TomData.hourWiseForecast[7].temp_c}&nbsp;°C, {TomData.hourWiseForecast[7].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>08:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[8].condition.icon} />
                  <strong>{TomData.hourWiseForecast[8].temp_c}&nbsp;°C, {TomData.hourWiseForecast[8].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>09:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[9].condition.icon} />
                  <strong>{TomData.hourWiseForecast[9].temp_c}&nbsp;°C, {TomData.hourWiseForecast[9].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>10:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[10].condition.icon} />
                  <strong>{TomData.hourWiseForecast[10].temp_c}&nbsp;°C, {TomData.hourWiseForecast[10].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>11:00 AM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[11].condition.icon} />
                  <strong>{TomData.hourWiseForecast[11].temp_c}&nbsp;°C, {TomData.hourWiseForecast[11].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>12:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[12].condition.icon} />
                  <strong>{TomData.hourWiseForecast[12].temp_c}&nbsp;°C, {TomData.hourWiseForecast[12].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>01:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[13].condition.icon} />
                  <strong>{TomData.hourWiseForecast[13].temp_c}&nbsp;°C, {TomData.hourWiseForecast[13].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>02:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[14].condition.icon} />
                  <strong>{TomData.hourWiseForecast[14].temp_c}&nbsp;°C, {TomData.hourWiseForecast[14].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>03:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[15].condition.icon} />
                  <strong>{TomData.hourWiseForecast[15].temp_c}&nbsp;°C, {TomData.hourWiseForecast[15].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>04:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[16].condition.icon} />
                  <strong>{TomData.hourWiseForecast[16].temp_c}&nbsp;°C, {TomData.hourWiseForecast[16].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>05:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[17].condition.icon} />
                  <strong>{TomData.hourWiseForecast[17].temp_c}&nbsp;°C, {TomData.hourWiseForecast[17].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>06:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[18].condition.icon} />
                  <strong>{TomData.hourWiseForecast[18].temp_c}&nbsp;°C, {TomData.hourWiseForecast[18].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>07:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[19].condition.icon} />
                  <strong>{TomData.hourWiseForecast[19].temp_c}&nbsp;°C, {TomData.hourWiseForecast[19].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>08:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[20].condition.icon} />
                  <strong>{TomData.hourWiseForecast[20].temp_c}&nbsp;°C, {TomData.hourWiseForecast[20].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>09:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[21].condition.icon} />
                  <strong>{TomData.hourWiseForecast[21].temp_c}&nbsp;°C, {TomData.hourWiseForecast[21].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>10:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[22].condition.icon} />
                  <strong>{TomData.hourWiseForecast[22].temp_c}&nbsp;°C, {TomData.hourWiseForecast[22].condition.text}</strong>
                </div>
                <div className="child">
                  <strong>11:00 PM</strong>
                  <img alt='wicon' src={TomData.hourWiseForecast[23].condition.icon} />
                  <strong>{TomData.hourWiseForecast[23].temp_c}&nbsp;°C, {TomData.hourWiseForecast[23].condition.text}</strong>
                </div>
              </div>
              <div onClick={(e) => rightScroll(e)} className='arrows'>
                <button className="right" ><i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
            <h3>Weather condition and Astrology</h3>
            <div className="flexcontainer">
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Humidity: </strong></td>
                      <td><strong>{TomData.humidity}&nbsp;g.m-<sup>3</sup></strong></td>
                    </tr>
                    <tr>
                      <td><strong>UV Index: </strong></td>
                      <td><strong>{TomData.uvindex}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Will it rain?</strong></td>
                      <td><strong>{TomData.rainchance !== 0 ? <>Yes</> : <>No</>}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Will it snow?</strong></td>
                      <td><strong>{TomData.snowchance !== 0 ? <>Yes</> : <>No</>}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Sunrise: </strong></td>
                      <td><strong>{TomData.sunrise}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Sunset: </strong></td>
                      <td><strong>{TomData.sunset}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moonrise: </strong></td>
                      <td><strong>{TomData.moonrise}</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Moonset: </strong></td>
                      <td><strong>{TomData.moonset}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h3>Air quality details</h3>
              <table className='flexTable'>
                <tbody>
                  <tr>
                    <td><strong>Carbon Monoxide</strong></td>
                    <td><strong>{TomData.airquality.co.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>Ozone</strong></td>
                    <td><strong>{TomData.airquality.no2.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>Nitrogen dioxide</strong></td>
                    <td><strong>{TomData.airquality.o3.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>Sulphur dioxide</strong></td>
                    <td><strong>{TomData.airquality.so2.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>PM2.5</strong></td>
                    <td><strong>{TomData.airquality.pm2_5.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                  <tr>
                    <td><strong>PM10 </strong></td>
                    <td><strong>{TomData.airquality.pm10.toString().substring(0, 7)}&nbsp;μg/m<sup>3</sup></strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
          : ''}
      </div>
      { }
    </motion.div>
  );
}

export default App;