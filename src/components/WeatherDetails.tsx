import React from 'react';
import { FiDroplet } from 'react-icons/fi';
import { MdAir } from 'react-icons/md';
import { ImMeter } from 'react-icons/im';
import { LuSunrise, LuSunset, LuEye } from 'react-icons/lu';
import { WeatherDetailProps , SingleWeatherDetailProps } from '../../types/types';

export default function WeatherDetails(props: WeatherDetailProps) {
    return (
        <>
            <SingleWeatherDetail
                icon={<LuEye />}
                information="Visibility"
                value={props.visibility}
            />
            <SingleWeatherDetail
                icon={<FiDroplet />}
                information="Humidity"
                value={props.humidity}
            />
            <SingleWeatherDetail
                icon={<MdAir />}
                information="Wind Speed"
                value={props.windSpeed}
            />
            <SingleWeatherDetail
                icon={<ImMeter />}
                information="Air Pressure"
                value={props.airPressure}
            />
            <SingleWeatherDetail
                icon={<LuSunrise />}
                information="Sunrise"
                value={props.sunrise}
            />
            <SingleWeatherDetail
                icon={<LuSunset />}
                information="Sunset"
                value={props.sunset}
            />
        </>
    );
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    );
}
