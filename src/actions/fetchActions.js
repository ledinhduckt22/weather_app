import { FETCH_WEATHER } from "../actionTypes";

export const fetchWeather = () => async (dispatch) => {
  const idsCountry = {
    HaNoi: 1581130,
    HaiPhong: 1581297,
    HaGiang: 1581349,
  };

  const fetches = await Promise.all(
    Object.values(idsCountry).map((e) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${e}&appid=5bc23d22a76526a33fc5be797f8c0a36`
      ).then((e) => e.json())
    )
  );

  dispatch({
    type: FETCH_WEATHER,
    payload: {
      HaNoi: fetches[0],
      HaiPhong: fetches[1],
      HaGiang: fetches[2],
    },
  });
};
