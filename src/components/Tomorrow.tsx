import { RiArrowRightSLine } from "react-icons/ri";
import { determineIcon } from "../utilities";

interface TomorrowInterface {
  idOfWeather: number,
  day: boolean,
  list: any[]
}

export const Tomorrow = ({ idOfWeather, day, list }: TomorrowInterface) => {
  const determineNextDayAbb = (): string => {
    const weekdays = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];

    let date = new Date();
    let index: number = 0;
    if (date.getDay() === 6) {
      index = 0;
    } else {
      index = date.getDay() + 1;
    }

    return weekdays[index];
  }

  const crawlNextDayTemps = (list: any[]): [number, number] | void => {
    const currentTime = new Date();

    currentTime.setDate(currentTime.getDate() + 1); // Tomorrow

    const tomorrow = currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : currentTime.getDate();

    let min: number[] = [],
    max: number[] = [];

    list.forEach((e) => {
      if (`${e["dt_txt"][8]}${e["dt_txt"][9]}` === tomorrow.toString()) {
        min.push(e.main.temp_min);
        max.push(e.main.temp_max);
      }
    })

    return [
      Math.round(Math.min(...min) - 273.15),
      Math.round(Math.max(...max) - 273.15),
    ]
  }

  const nextDayTemps = crawlNextDayTemps(list);

  return (
    <div className="w-3/12">
      <div className="flex justify-between p-2">
        <div className="text-xs">
          {determineNextDayAbb()}
        </div>
        <div className="text-xs flex items-center">
          <div>More</div>
          <RiArrowRightSLine />
        </div>
      </div>
      <div className="flex flex-col text-center">
        <div className="w-full">
          {determineIcon(idOfWeather, day, "h-16 w-16 mx-auto")}
        </div>
        <div className="text-lg">
          {Array.isArray(nextDayTemps) ? nextDayTemps[0] : "?"}/
          {Array.isArray(nextDayTemps) ? nextDayTemps[1] : "?"}°
        </div>
      </div>
    </div>
  )
}