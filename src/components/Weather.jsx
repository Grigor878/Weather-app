import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import './Weather.scss'
import { timeConverter, kToC, update } from '../helpers/Utils';
import { CgTime, CgRename } from 'react-icons/cg';
import { AiOutlineColumnWidth, AiOutlineColumnHeight } from 'react-icons/ai';
import { BsThermometerSun } from 'react-icons/bs';
import { FaTemperatureLow, FaTemperatureHigh, FaCompressAlt } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

const fetchLocalStorage = JSON.parse(localStorage.getItem('DATA') || '[]')

function Weather() {
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [data, setData] = useState(fetchLocalStorage);

  const fetchWeather = useCallback(async () => {
    const API = 'https://api.openweathermap.org/data/2.5/weather?';
    const API_KEY = 'bf65d8b174418831a16055a19f50144f';
    try {
      const response = await axios.get(`${API}lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      setData([response.data]);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }, [lat, lon]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather()
      console.log('updated')
    }, 30000)
    return () => clearInterval(interval)
  }, [fetchWeather])

  const getWeather = (e) => {
    e.preventDefault();
    fetchWeather();
    // setLat('');
    // setLon('');
  }

  useEffect(() => {
    localStorage.setItem('DATA', JSON.stringify(data))
  }, [data]);

  return (
    <main className='main'>
      <form className='main__form' onSubmit={getWeather}>
        <label>Enter latitude</label>
        <input type="number" required name='lat' value={lat} onChange={e => setLat(e.target.value)} />
        <label>Enter longitude</label>
        <input type="number" required name='lon' value={lon} onChange={e => setLon(e.target.value)} />
        <button>Search</button>
      </form>

      {data && data.map((el) => {
        return (
          <div className='main__result' key={el.id}>
            <div className='main__indicators'>
              <CgTime className='main__icons' />
              <p>Time - {timeConverter(el.dt)}</p>
            </div>
            <div className='main__indicators'>
              <CgRename className='main__icons' />
              <p>Name - {el.name}</p>
            </div>
            <div className='main__indicators'>
              <AiOutlineColumnWidth className='main__icons' />
              <p>Latitude - {el.coord.lat}</p>
            </div>
            <div className='main__indicators'>
              <AiOutlineColumnHeight className='main__icons' />
              <p>Longitude - {el.coord.lon}</p>
            </div>
            <div className='main__indicators'>
              <BsThermometerSun className='main__icons' />
              <p>Temperature - {kToC(el.main.temp)}</p>
            </div>
            <div className='main__indicators'>
              <FaCompressAlt className='main__icons' />
              <p>Pressure - {el.main.pressure}</p>
            </div>
            <div className='main__indicators'>
              <WiHumidity className='main__icons' />
              <p>Humidity - {el.main.humidity}</p>
            </div>
            <div className='main__indicators'>
              <FaTemperatureLow className='main__icons' />
              <p>MIN Temperature - {el.main.temp_min + ' K'}</p>
            </div>
            <div className='main__indicators'>
              <FaTemperatureHigh className='main__icons' />
              <p>MAX Temperature - {el.main.temp_max + ' K'}</p>
            </div>
            <p className='main__update'>Last Update - {update()}</p>
          </div>
        )
      })}
    </main>
  );
}

export default Weather;
