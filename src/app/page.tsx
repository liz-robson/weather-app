'use client' 
import Navbar from "../components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import Container from '../components/Container';
import convertKelvinToCelsius from '../utils/convertKelvintoCelsius'


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


  const { isLoading, error, data } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=london,uk&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
    return data;
});

const firstData = data?.list[0];

    console.log("data", firstData);



  
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
        <h2 className="flex gap-1 text-2xl items-end">
        <p>{format(parseISO(firstData?.dt_txt ?? "" ), "EEEE")}</p>
        <p>{format(parseISO(firstData?.dt_txt ?? "" ), "dd/MM/yyyy")}</p>
        </h2>
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
              <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
        </div>
          ))}             
          </div>
      </Container>
      </section>
    </main>
   </div>
  );
}
