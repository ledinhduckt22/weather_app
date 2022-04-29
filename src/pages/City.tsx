import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchWeather } from "../actions/fetchActions";
import { randomInt } from "../utilities";
import dBG1 from "../assets/d_bg1.jpg";
import dBG2 from "../assets/d_bg2.jpg";
import dBG3 from "../assets/d_bg3.jpg";
import dBG4 from "../assets/d_bg4.jpg";
import { Card } from "../components/Card";
import { Desktop } from "../components/Desktop";

interface bgTypes {
  [key: string]: string;
}
const bgList: bgTypes = {
  dBG1: dBG1,
  dBG2: dBG2,
  dBG3: dBG3,
  dBG4: dBG4,
};

const cityLists = [
  "HaNoi", "HaiPhong", "HaGiang"
]

export const City = () => {
  const [imageSource, setImageSource] = useState("");
  const [random, setRandom] = useState(randomInt(1, 3));
  const weatherData = useSelector((state: any) => state.weather);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const params: any = useParams();

  if (!cityLists.includes(params.city)) {
    navigate("/");
  }

  if (!Object.keys(weatherData.weather).length) {
    fetchWeather()(dispatch);
  }

  useEffect(() => {
    // fetchWeather()(dispatch);
    updateDimensions();
  }, []);

  useEffect(() => {
    // setBg("default");
    updateDimensions();
  }, [window.innerWidth]);

  const setBg = (source: string): void => {
    const screenSize = window.innerWidth < 768 ? "p" : "d";

    if (source === "default") {
      const bgType = `${screenSize}_${params.city.toLowerCase()}${random}`;
      setImageSource(bgList[bgType]);
    }
  };

  const updateDimensions = () => {
    const screenSize = window.innerWidth < 768 ? "p" : "d";
    // const bgType = `${screenSize}_${params.city.toLowerCase()}${random}`;
    const bgType = `${screenSize}BG${random}`;

    setImageSource(bgList[bgType]);
  }

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${imageSource})` }}
      >
        <p>Geee</p>
        <Desktop city={params.city} info={weatherData.weather[params.city]} />
      </div>
    </>
  );
};
