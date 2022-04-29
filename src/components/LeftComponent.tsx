interface LeftInterface {
  stateOfWeather: string;
  idOfWeather: number;
  day: boolean;
}

export const LeftComponent = ({ stateOfWeather, idOfWeather, day}: LeftInterface) => {
  return (
    <div className="flex flex-col text-center">
      <div>{stateOfWeather}</div>
    </div>
  )
}