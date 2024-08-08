import React, { useState } from 'react'
import cloud from "../src/images/Clouds.png"
import rain from "../src/images/Rain.png"
import clear from "../src/images/Clear.png"
import mist from "../src/images/mist.png"
import err from "../src/images/error.png"
import drizzle from "../src/images/Drizzle.jpg";
import '../src/WeatherApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const WeatherApp = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState()
    const [error, setError] = useState()

    const API_KEY ="6d83156e4e40ca97d0c6924b832fe00c"
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

    const handleInput = (event) =>{
        setSearch(event.target.value)
        console.log(event.target.value);
    }
 
    const myFun = async () =>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
        
        const jsonData = await get.json()
        console.log(jsonData);
        setData(jsonData);

        if(search === ""){
            // alert("Enter name")
            setError("Please Enter Name")
        }
        else if(jsonData.cod === '404'){
            setError("Please Enter Valid Name !")
        }else{
            setError("")
        }
        setSearch("")
    }
    
  return (
     <>
        <div className='container'>
            <div className='inputs'>
                <input placeholder='Enter city, Country' value={search} onChange={handleInput} />
                <button onClick={myFun}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <div>
            {
                error ?
                <div className='errorPage'>
                    <p>{error}</p>
                    <img src={err} alt=""/>
                </div> : ""
            }
            {
                data && data.weather ?
                <div className='weathers'>
                    <h2 className='cityName'>{data.name}</h2>
                    <img src={data.weather[0].main === "Clouds" ? cloud : "" } alt="" />
                    <img src={data.weather[0].main === "Rain" ? rain : "" } alt="" />
                    <img src={data.weather[0].main === "Clear" ? clear : "" }  alt=""/>
                    <img src={data.weather[0].main === "Mist" ? mist : "" } alt=""/>
                    <img src={data.weather[0].main === "Haze" ? cloud : "" } alt=""/>
                    <img src={data.weather[0].main === "Drizzle" ? drizzle : "" } alt=""/>
                    <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
                    <p  className='climate'>{data.weather[0].description}</p>

                </div> : ""
            }

            </div>
        </div>
     </>
  )
}

export default WeatherApp;