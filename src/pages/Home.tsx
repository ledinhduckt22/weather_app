import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../actions/fetchActions";
import { randomInt } from "../utilities";
import dBG1 from "../assets/d_bg1.jpg";
import dBG2 from "../assets/d_bg2.jpg";
import dBG3 from "../assets/d_bg3.jpg";
import dBG4 from "../assets/d_bg4.jpg";
import { Card } from "../components/Card";

interface bgTypes {
  [key: string]: string;
}
const bgList: bgTypes = {
  dBG1: dBG1,
  dBG2: dBG2,
  dBG3: dBG3,
  dBG4: dBG4,
};

export const Home = () => {
  const [imageSource, setImageSource] = useState("");
  const [random, setRandom] = useState(randomInt(1, 5));
  const weatherData = useSelector((state: any) => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchWeather()(dispatch);
  }, []);

  useEffect(() => {
    setBg("default");
  }, [window.innerWidth]);

  const setBg = (source: string): void => {
    const screenSize = window.innerWidth < 768 ? "p" : "d";

    if (source === "default") {
      const bgType = `${screenSize}BG${random}`;
      setImageSource(bgList[bgType]);
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${imageSource})` }}
      >
        <div className="flex flex-col justify-center items-center w-screen h-screen">
          {Object.keys(weatherData.weather).map((e: any, i) => {
            return <Card city={e} key={i} weather={weatherData.weather[e]} />;
          })}
        </div>
      </div>
    </>
  );
};
