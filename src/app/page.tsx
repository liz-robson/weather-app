'use client' 
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from 'date-fns';
import Container from '../components/Container';
import convertKelvinToCelsius from '../utils/convertKelvintoCelsius';
import WeatherIcon from '../components/WeatherIcon';
import getDayOrNightIcon from '../utils/getDayOrNightIcon';
import WeatherDetails from '../components/WeatherDetails';
import convertMetresToKilometres from "@/utils/convertMetersToKilometres";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeather from "@/components/ForecastWeather";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { placeAtom , loadingCityAtom } from "@/app/atom";
 

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: City;
}

interface WeatherListItem {
  dt: number;
  main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
  };
  weather: Weather[];
  clouds: {
      all: number;
  };
  wind: {
      speed: number;
      deg: number;
      gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
      pod: string;
  };
  dt_txt: string;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface City {
  id: number;
  name: string;
  coord: {
      lat: number;
      lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}


export default function Home() {

  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_KEY;

  const { isLoading, error, data , refetch } = useQuery<WeatherData>(
    'repoData', 
    async () => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=dorking&appid=${API_KEY}&cnt=56`
    );
    return data;
}
);

useEffect(() => {
  refetch();
}, [place, refetch]);


const firstData = data?.list[0];

    console.log("data", firstData);

    const uniqueDates = [
      ...new Set(
        data?.list.map(
          (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
        )
      )
    ];

    // Filtering data to get the first entry after 6am for each unique date
    const firstDataForEachDay = uniqueDates.map((date) => {
      return data?.list.find(
        (entry) => {
          const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
          const entryTime = new Date(entry.dt * 1000).getHours();
          return entryDate === date && entryTime >= 6;
        });
    });
  
    if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
    <p className="animate-bounce">Loading...</p>
    </div>
    );

  return (
   <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
    <Navbar />
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      <section className="space-y-4">
        {/** Todays data */}
      <div className="space-y-2">
      {/* <h2 className="flex gap-1 text-2xl  items-end ">
                  <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                  <p className="text-lg">
                    ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
                  </p>
                </h2> */}
      </div>
      <Container className="gap-10 px-6 items-center">
        {/** Temperature */}
      <div className="flex flex-col px-4">
        <span className="text-5xl">
        {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
        </span>
        <p className="text-xs space-x-1 white-nowrap"></p>
        <p className="text-xs space-x-2">
          <span>
            Feels likes {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
          </span>
        </p>
        </div>
        {/** Time and weather icon */}
        <div className="flex gap-16 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
          {data?.list.map((d, i) => (
            <div
            key={i} 
            className="flex flex-col items-center justify-between gap-2 text-xs font-semibold"
            >
              <p className="whitespace-nowrap">
              {format(parseISO(d.dt_txt), 'h:mm a')}</p>
              <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}/>
              <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
        </div>
          ))}             
          </div>
      </Container>
      <div className="flex gap-4">
      {/** Left */}
      <Container className="w-fit justify-center flex-col px-4 items-center">
        <p className=" capitalize text-center">    {firstData?.weather[0].description}    </p>
          <WeatherIcon 
          iconName={getDayOrNightIcon(
            firstData?.weather[0].icon ?? "",
            firstData?.dt_txt ?? "" 
          )}
          />
      </Container>
                  {/** Right */}
      <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
        <WeatherDetails 
        visibility={convertMetresToKilometres(firstData?.visibility ?? 10000)}
        airPressure={`${firstData?.main.pressure} hPa`}
        humidity={`${firstData?.main.humidity}%`}
        windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)}
        sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "h:mm a")}
        sunset={format(fromUnixTime(data?.city.sunset ?? 0), "h:mm a")}
        />
        </Container>

            </div>
      </section>
                 {/** 7 Day Forecast */}
      <section className="flex w-full flex-col gap-4">
<p className="text-2xl">7 Day Forecast</p>
{firstDataForEachDay.map((d, i) => (
<ForecastWeather 
  key={i}
  description={d?.weather[0].description ?? ""}
  weatherIcon={d?.weather[0].icon ?? ""}
  date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
  day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
  feelsLike={d?.main.feels_like ?? 0}
  temp={d?.main.temp ?? 0}
  temp_max={d?.main.temp_max ?? 0}
  temp_min={d?.main.temp_min ?? 0}
  airPressure={`${d?.main.pressure} hPa`}
  humidity={`${d?.main.humidity}%`}
  sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "h:mm a")}
  sunset={format(fromUnixTime(data?.city.sunset ?? 0), "h:mm a")}
  visibility={convertMetresToKilometres(d?.visibility ?? 10000)}
  windSpeed={convertWindSpeed(d?.wind.speed ?? 0)}
/>
))}
      </section>
    </main>
   </div>
  );
}
