import { Link } from "react-router-dom";
import { RiMapPinLine } from "react-icons/ri";
import { LeftComponent } from "./LeftComponent";
import { RightComponent } from "./RightComponent";
import { determineGif } from "../utilities";
import { Tomorrow } from "./Tomorrow";

interface FormProps {
  city: string;
  weather: any;
}

export const Card = ({ city, weather }: FormProps) => {
  const findMinAndMaxTemps = (list: any[]): [number, number] => {
    const currentDate = new Date();

    const today =
      currentDate.getDate() < 10
        ? `0${currentDate.getDate}`
        : currentDate.getDate();

    let min: number[] = [],
      max: number[] = [];

    list.forEach((e) => {
      if (`${e.dt_txt[8]}${e.dt_txt[9]}` === today.toString()) {
        min.push(e.main.temp_min);
        max.push(e.main.temp_max);
      }
    });

    return [
      Math.round(Math.min(...min) - 273.15),
      Math.round(Math.max(...max) - 273.15),
    ];
  };

  let temperature = 0,
    minTemperature = 0,
    maxTemperature = 0,
    stateOfWeather = "",
    feelsLike = 0,
    speed = 0,
    deg = 0,
    idOfWeather = 0,
    day = true,
    list: any[] = [];

  if (weather?.list) {
    const currentData = weather?.list[0];
    const { main, weather: weatherCurrent, wind, sys } = currentData;
    temperature = Math.round(main?.temp - 273.15);
    [minTemperature, maxTemperature] = findMinAndMaxTemps(weather.list);
    stateOfWeather = weatherCurrent[0]?.main;
    feelsLike = Math.round(main?.temp - 273.15);
    speed = wind.speed;
    deg = wind.deg;
    idOfWeather = currentData.weather[0].id;
    day = sys.pod === "d";
    list = [...weather.list];
  }

  const [classes, url] = determineGif(idOfWeather);

  return (
    <Link to={`/${city}`} className="h-40 w-full sm:w-410px">
      <div className="flex h-40 w-full sm:w-410px">
        <div
          className={`text-white m-2 rounded-lg flex-grow bg-left-bottom ${classes}`}
          style={{
            backgroundImage: `url(${url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "100%",
          }}
        >
          <div className="flex w-full h-full divide-x divide-gray-400">
            <div className="w-9/12">
              <div
                className="mt-2 ml-2 p-2 rounded-lg inline-block text-xs"
                style={{
                  boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.75)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <div className="flex items-center">
                  <RiMapPinLine />
                  <div className="ml-2">{city}</div>
                </div>
              </div>
              <div className="w-full flex justify-around items-center">
                <LeftComponent
                  stateOfWeather={stateOfWeather}
                  idOfWeather={idOfWeather}
                  day={day}
                />
                <div className="flex flex-col text-center">
                  <div className="text-5xl">{temperature}°</div>
                  <div className="text-lg">
                    {minTemperature}/{maxTemperature}°
                  </div>
                </div>
                <RightComponent feelsLike={feelsLike} deg={deg} speed={speed} />
              </div>
            </div>
            <Tomorrow idOfWeather={idOfWeather} day={day} list={list} />
          </div>
        </div>
      </div>
    </Link>
  );
};
