import React from "react";
// import { useState } from "react";
import cloud from "../assets/images/cloud.png";

import clear from "../assets/images/clear.png";

import rain from "../assets/images/rain.png";
import mist from "../assets/images/mist.png";
import SearchIcon from "@mui/icons-material/Search";
import err from "../assets/images/error.webp";
import { Box, Grid, Typography, TextField, IconButton } from "@mui/material";
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
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(68, 65, 65)",
          height: "100vh",
        }}
      >
        <Box className="container">
          <Grid
            container
            direction="row"
            style={{
              // display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "15px", sm: "20px", md: "30px", lg: "35px" },
              }}
            >
              Weather App
            </Typography>
          </Grid>
          <Box className="input-section">
            <Grid
              className="input-field"
              sx={{
                backgroundColor: "white",
                fontSize: {
                  xs: "15px",
                  sm: "20px",
                  md: "30px",
                  lg: "35px",
                },
              }}
            >
              <TextField
                // label="Size"
                id="outlined-size-small"
                // defaultValue="Small"
                size="small"
                placeholder="Enter City, Country"
                onChange={handleClick}
                className="textfield"
                sx={{}}
              />
              <IconButton aria-label="search" size="small" onClick={My_fun}>
                <SearchIcon />
              </IconButton>
            </Grid>
          </Box>
          <div
            className="error"
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
                <img src={err} className="error-img" />
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
                className="image"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: "2px",
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
              {/* <Box className="main"> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="temp"
              >
                <h3
                  style={{
                    marginLeft: "50px",
                    fontSize: {
                      xs: "15px",
                      sm: "10px",
                      md: "30px",
                      lg: "35px",
                    },
                  }}
                  // className="temp"
                >
                  {Math.trunc(data.main.temp) / 10}°C
                </h3>

                <p
                  style={{
                    fontSize: {
                      xs: "25px",
                      sm: "20px",
                      md: "30px",
                      lg: "35px",
                    },
                    marginLeft: "10px",
                  }}
                >
                  {data.weather[0].description}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="wind"
              >
                <h3>{data.wind.speed}Km/h</h3>
                <p
                  style={{
                    fontSize: {
                      xs: "15px",
                      sm: "15px",
                      md: "30px",
                      lg: "35px",
                    },
                    marginLeft: "10px",
                  }}
                >
                  Wind speed
                </p>
              </div>
              {/* </Box> */}
            </div>
          ) : (
            ""
          )}
        </Box>
        {/* </div> */}
      </Grid>
    </>
  );
};
export default Weather;
