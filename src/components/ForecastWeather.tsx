import React from 'react'
import Container from './Container'
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails'
import WeatherIcon from './WeatherIcon';
import convertKelvinToCelsius from '@/utils/convertKelvintoCelsius';
import { ForecastWeatherProps } from '../../types/types';

export default function ForecastWeather(props : ForecastWeatherProps) {
  return (
    <Container className="gap-4">
        <section 
        className="flex gap-4 items-center px-4">
        <div className='flex flex-col items-center gap-1'>
            <WeatherIcon iconName={props.weatherIcon} />
            <p>{props.date}</p>
            <p className='text-sm'>{props.day}</p>
        </div>

    <div className="flex flex-col px-4">
    <span className="text-5xl">{convertKelvinToCelsius(props.temp ?? 0)}°</span>
    <p className='text-xs space-x-1 whitespace-nowrap'>
        <span>Feels like</span>
        <span>{convertKelvinToCelsius(props.feelsLike ?? 0)}°</span>
    </p>
    <p className='capitalize'>{props.description}</p>
    </div>
    </section>
    <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails {...props}/>
    </section>
    </Container>
    

  )
}