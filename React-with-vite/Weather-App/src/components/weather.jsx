import React from "react";
// import { useState } from "react";
import cloud from "../assets/images/cloud.png";

import clear from "../assets/images/clear.png";

import rain from "../assets/images/rain.png";
import mist from "../assets/images/mist.png";
import SearchIcon from "@mui/icons-material/Search";
import err from "../assets/images/error.webp";
import "./style.css";
import { useState } from "react";
const Weather = () => {
  const [search, setSearch] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  const API_KEY = "74b3da76eb05425ec50c682aba1d3b9f";
  const API =
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric";
  const handleClick = (event) => {
    setSearch(event.target.value);
    console.log(search, "search");
  };
  const My_fun = async () => {
    const get = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`
    );
    const jsonData = await get.json();
    console.log(jsonData);
    setData(jsonData, "data");
    if (search == "") {
      alert("Please Enter City Name");
      setError("Please Enter City Name");
    } else if (jsonData.cod == "404") {
      setError("Invalid name, City or Country Not Fount");
    } else {
      setError("");
    }
  };
  console.log(data, "data");
  return (
    <>
      <div
        style={{
          backgroundColor: "rgb(68, 65, 65)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <h1 style={{ margin: "auto", width: "38%", color: "#0a3b0a" }}>
            Weather App
          </h1>
          <div className="input-section">
            <input
              style={{
                height: "40px",
                width: "244px",
                borderRadius: "40px",
                fontSize: "28px",
              }}
              type="text"
              placeholder="Enter City, Country"
              onChange={handleClick}
            />
            <button
              style={{
                height: "43px",
                width: "43px",
                borderRadius: "50%",
                marginLeft: "10px",
              }}
              onClick={My_fun}
              name="btn"
            >
              <SearchIcon />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {" "}
            {error ? (
              <div className="errorPage">
                <h2>Opps</h2>
                <p>{error}</p>
                <img src={err} />
              </div>
            ) : (
              ""
            )}
          </div>
          {data && data.weather ? (
            <div>
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                {data.name}
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                {data.weather[0].main === "Clouds" && (
                  <img src={cloud} alt="Cloudy" />
                )}
                {data.weather[0].main === "Rain" && (
                  <img src={rain} alt="Rainy" />
                )}
                {data.weather[0].main === "Clear" && (
                  <img src={clear} alt="Clear Sky" />
                )}
                {data.weather[0].main === "Mist" && (
                  <img src={mist} alt="Misty" />
                )}
                {data.weather[0].main === "Haze" && (
                  <img src={haze} alt="Hazy" />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3 style={{ marginLeft: "50px", fontSize: "35px" }}>
                  {Math.trunc(data.main.temp) / 10}°C
                </h3>
                <p style={{ fontSize: "25px", marginLeft: "20px" }}>
                  {data.weather[0].description}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3 style={{ fontSize: "35px" }}>{data.wind.speed}Km/h</h3>
                <p style={{ fontSize: "25px", marginLeft: "20px" }}>
                  Wind speed
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
export default Weather;
